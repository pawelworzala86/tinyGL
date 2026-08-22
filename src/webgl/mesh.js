import Buffer from './buffer.js'
import Scene from './scene.js'
import Uniform from './uniform.js'

const { mat4 } = glMatrix

export class Mesh extends Scene{
    static async create(gl,shader,modelData){
        const mesh  = new Mesh(gl,shader)
        mesh.shader = shader

        mesh.uniformSetter = new Uniform(gl)

        mesh.geometry = modelData

        mesh.buffers = {}
        mesh.buffers.vertex = Buffer.create(gl,new Float32Array(mesh.geometry.vertices),gl.ARRAY_BUFFER);
        mesh.buffers.color = Buffer.create(gl,new Float32Array(mesh.geometry.colors),gl.ARRAY_BUFFER);
        mesh.buffers.index = Buffer.create(gl,new Uint16Array(mesh.geometry.indices),gl.ELEMENT_ARRAY_BUFFER);

        return mesh
    }
    setAttribute(buffer,name){
        const {gl} = this
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        var _position = gl.getAttribLocation(this.shader.program, name);
        gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,0,0);
        gl.enableVertexAttribArray(_position);
    }
    render(uniforms,matrix){
        const {gl,shader} = this

        
 
        //var uPerspective = gl.getUniformLocation(this.shader.program, "perspective");
        //var uCamera = gl.getUniformLocation(this.shader.program, "camera");
        //var uModel = gl.getUniformLocation(this.shader.program, "model");

        this.setAttribute(this.buffers.vertex,'position')
        this.setAttribute(this.buffers.color,'color')

        gl.useProgram(this.shader.program);


        const finalMatrix = mat4.create();
        mat4.multiply(finalMatrix, matrix, this.matrix);


        const meshUniforms = Object.assign(uniforms,{
            model: finalMatrix,
        })

        //gl.uniformMatrix4fv(uPerspective, false, perspectiveMatrix);
        //gl.uniformMatrix4fv(uCamera, false, cameraMatrix);
        //gl.uniformMatrix4fv(uModel, false, finalMatrix);

        this.uniformSetter.set(shader,meshUniforms)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
        gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}

export default Mesh