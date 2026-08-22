import Buffer from './buffer.js'
import Scene from './scene.js'
import Uniform from './uniform.js'

const { mat4 } = glMatrix

export class Mesh extends Scene{
    static async create(gl,shader,geometry){
        const mesh  = new Mesh(gl,shader)
        mesh.shader = shader

        mesh.uniformSetter = new Uniform(gl)

        mesh.geometry = geometry

        mesh.buffers = {}
        mesh.buffers.position = Buffer.create(gl,geometry.position.data.data,gl.ARRAY_BUFFER);
        mesh.buffers.normal = Buffer.create(gl,geometry.normal.data.data,gl.ARRAY_BUFFER);
        mesh.buffers.tangent = Buffer.create(gl,geometry.tangent.data.data,gl.ARRAY_BUFFER);
        mesh.buffers.texcoord_0 = Buffer.create(gl,geometry.texcoord_0.data.data,gl.ARRAY_BUFFER);
        mesh.buffers.indices = Buffer.create(gl,geometry.indices.data.data,gl.ELEMENT_ARRAY_BUFFER);

        return mesh
    }
    setAttribute(buffer,name,size){
        const {gl} = this
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const _position = gl.getAttribLocation(this.shader.program, name);
        if(_position>-1){
            gl.vertexAttribPointer(_position, size, gl.FLOAT, false,0,0);
            gl.enableVertexAttribArray(_position);
        }
    }
    render(uniforms,matrix){
        const {gl,shader} = this


        this.setAttribute(this.buffers.position,'position',3)
        this.setAttribute(this.buffers.normal,'normal', 4)
        this.setAttribute(this.buffers.tangent,'tangent', 3)
        this.setAttribute(this.buffers.texcoord_0,'texcoord_0',2)

        gl.useProgram(this.shader.program);


        const finalMatrix = mat4.create();
        mat4.multiply(finalMatrix, matrix, this.matrix);


        const meshUniforms = Object.assign(uniforms,{
            model: finalMatrix,
        })

        this.uniformSetter.set(shader,meshUniforms)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
        gl.drawElements(gl.TRIANGLES, this.geometry.indices.data.data.length, gl.UNSIGNED_SHORT, 0);
    }
}

export default Mesh