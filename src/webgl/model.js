import Scene from './scene.js'
import Mesh from './mesh.js'
import Shader from './shader.js'
import { get } from './../common.js'

const { mat4 } = glMatrix

export class Model extends Scene{
    static async create(gl){
        const model = new Model(gl)

        model.shader = await Shader.create(gl)

        const modelData = await get('/models/cube.json','json')

        const mesh = await Mesh.create(gl,model.shader,modelData)

        model.childrens.push(mesh)


        return model
    }
}