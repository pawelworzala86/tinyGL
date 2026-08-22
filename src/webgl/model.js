import Scene from './scene.js'
import Mesh from './mesh.js'
import Shader from './shader.js'
import { get } from './../common.js'
import GLTFloader from './loaders/gltf.js'

const { mat4 } = glMatrix

export class Model extends Scene{
    static async create(gl,fileName){
        const model = new Model(gl)

        model.shader = await Shader.create(gl)

        if(fileName.endsWith('.json')){
            const modelData = await get('/models/'+fileName,'json')
            const mesh = await Mesh.create(gl,model.shader,modelData)
            model.childrens.push(mesh)
        }else if(fileName.endsWith('.gltf')){
            const modelData = await GLTFloader.load(gl,fileName)
            for(const meshD of modelData.meshes){
                const mesh = await Mesh.create(gl,model.shader,meshD)
                model.childrens.push(mesh)
            }
        }


        return model
    }
}

export default Model