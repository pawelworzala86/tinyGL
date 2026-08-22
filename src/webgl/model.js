import Scene from './scene.js'
import { Mesh } from './mesh.js'
import { Shader } from './shader.js'
import { get } from './../common.js'

const { mat4 } = glMatrix

export class Model extends Scene{
    /*constructor(gl){
        this.gl = gl
        this.meshes = []
        this.modelMatrix = mat4.create()
    }*/
    static async create(gl){
        const model = new Model(gl)

        model.shader = await Shader.create(gl)

        const modelData = await get('/models/cube.json','json')

        const mesh = await Mesh.create(gl,model.shader,modelData)

        model.childrens.push(mesh)


        return model
    }
    /*render(perspectiveMatrix,cameraMatrix){
        for(const mesh of this.childrens){
            mesh.render(perspectiveMatrix,cameraMatrix,this.matrix)
        }
    }*/
}