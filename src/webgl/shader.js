import { get } from "./../common.js"

export class Shader{
    constructor(gl,program){
        this.gl = gl
        this.program = program
    }
    static createShader(gl,type,code){
        const shader = gl.createShader(type)
        gl.shaderSource(shader, code)
        gl.compileShader(shader)
        return shader
    }
    static async create(gl){
        const vertCode = await get('./shaders/default.vert')
        const fragCode = await get('./shaders/default.frag')

        const vertShader = Shader.createShader(gl,gl.VERTEX_SHADER, vertCode)
        const fragShader = Shader.createShader(gl,gl.FRAGMENT_SHADER, fragCode)

        const program = gl.createProgram()
        gl.attachShader(program, vertShader)
        gl.attachShader(program, fragShader)
        gl.linkProgram(program)

        const shader = new Shader(gl,program)
        return shader
    }
}