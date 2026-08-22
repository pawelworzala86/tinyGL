import { Mesh } from './mesh.js'
import { Shader } from './shader.js'
import { get } from './../common.js'

const { mat4 } = glMatrix

export class Model{
    constructor(gl){
        this.gl = gl
        this.meshes = []
        this.mo_matrix = mat4.create()
    }
    static async create(gl){
        const model = new Model(gl)

        model.shader = await Shader.create(gl)

        const modelData = await get('/models/cube.json','json')

        const mesh = await Mesh.create(gl,model.shader,modelData)

        model.meshes.push(mesh)


        return model
    }
    render(proj_matrix,view_matrix){
        for(const mesh of this.meshes){
            mesh.render(proj_matrix,view_matrix,this.mo_matrix)
        }
    }
}