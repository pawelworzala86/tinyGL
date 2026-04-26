import { get } from "./../common.js"

export class Shader{
    constructor(gl,program){
        this.gl = gl
        this.program = program
    }
    static async create(gl){
        const vertCode = await get('./shaders/default.vert')
        const fragCode = await get('./shaders/default.frag')

        const vertShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertShader, vertCode)
        gl.compileShader(vertShader)

        const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragShader, fragCode)
        gl.compileShader(fragShader)

        const program = gl.createProgram()
        gl.attachShader(program, vertShader)
        gl.attachShader(program, fragShader)
        gl.linkProgram(program)

        const shader = new Shader(gl,program)
        return shader
    }
}