export class Uniform{
    constructor(gl){
        this.gl = gl
    }
    set(shader,uniforms){
        const { gl } = this
        for(const key of Object.keys(uniforms)){
            const uniform = uniforms[key]

            const uniformLocation = gl.getUniformLocation(shader.program, key)

            if(uniform.length==16){
                gl.uniformMatrix4fv(uniformLocation, false, uniform)
            }else if(uniform.length==3){
                gl.uniform3fv(uniformLocation, uniform)
            }
        }
    }
}

export default Uniform