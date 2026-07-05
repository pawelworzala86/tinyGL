import { Mesh } from './mesh.js'
import { Shader } from './shader.js'

export class Model{
    constructor(gl){
        this.gl = gl;
        this.meshes = [];
    }
    static async create(gl){
        const model = new Model(gl)

        model.shader = await Shader.create(gl)

        const mesh = await Mesh.create(gl,model.shader)

        model.meshes.push(mesh)

        return model
    }
    render(proj_matrix,view_matrix,mo_matrix){
        for(const mesh of this.meshes){
            mesh.render(proj_matrix,view_matrix,mo_matrix)
        }
    }
}