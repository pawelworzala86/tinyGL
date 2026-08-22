import { Buffer } from './buffer.js'

const { mat4 } = glMatrix

export class Mesh{
    constructor(gl,shader){
        this.gl = gl;
        this.shader = shader;
        this.meshMatrix = mat4.create()
    }
    static async create(gl,shader,modelData){
        const mesh  = new Mesh(gl,shader)

        mesh.geometry = modelData

        mesh.vertex_buffer = Buffer.create(gl,new Float32Array(mesh.geometry.vertices),gl.ARRAY_BUFFER);
        mesh.color_buffer = Buffer.create(gl,new Float32Array(mesh.geometry.colors),gl.ARRAY_BUFFER);
        mesh.index_buffer = Buffer.create(gl,new Uint16Array(mesh.geometry.indices),gl.ELEMENT_ARRAY_BUFFER);

        return mesh
    }
    render(perspectiveMatrix,cameraMatrix,modelMatrix){
        const {gl} = this
        /*======== Associating attributes to vertex shader =====*/
        var _Pmatrix = gl.getUniformLocation(this.shader.program, "Pmatrix");
        var _Vmatrix = gl.getUniformLocation(this.shader.program, "Vmatrix");
        var _Mmatrix = gl.getUniformLocation(this.shader.program, "Mmatrix");

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
        var _position = gl.getAttribLocation(this.shader.program, "position");
        gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,0,0);
        gl.enableVertexAttribArray(_position);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        var _color = gl.getAttribLocation(this.shader.program, "color");
        gl.vertexAttribPointer(_color, 3, gl.FLOAT, false,0,0) ;
        gl.enableVertexAttribArray(_color);
        gl.useProgram(this.shader.program);



        const finalMatrix = mat4.create();
        mat4.multiply(finalMatrix, modelMatrix, this.meshMatrix);



        gl.uniformMatrix4fv(_Pmatrix, false, perspectiveMatrix);
        gl.uniformMatrix4fv(_Vmatrix, false, cameraMatrix);
        gl.uniformMatrix4fv(_Mmatrix, false, finalMatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}