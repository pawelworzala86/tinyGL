export class Buffer{
    static create(gl,array,type){
        const buffer = gl.createBuffer()
        gl.bindBuffer(type, buffer)
        gl.bufferData(type, array, gl.STATIC_DRAW);
        return buffer
    }
}