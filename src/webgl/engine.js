//import { Controls } from './controls.js'
import { Model } from './model.js'

const { mat4 } = glMatrix


export class Engine{
    constructor(){
        this.canvas = document.createElement('canvas')
        const minimizeFactor = 1.75
        this.canvas.width = window.innerWidth / minimizeFactor
        this.canvas.height = window.innerHeight / minimizeFactor
        this.gl = this.canvas.getContext('webgl2')
        document.body.append(this.canvas)
    }
    async render(){
        const canvas = this.canvas
        const gl = this.gl


        

        const models = []

        for(let i=0;i<25;i++){
            const model = await Model.create(gl)
            model.rotateXm = Math.random()*0.0005
            model.rotateYm = Math.random()*0.0005
            model.rotateX = (Math.random()-0.5)*30
            model.rotateY = (Math.random()-0.5)*30
            model.position = [(Math.random()-0.5)*30,(Math.random()-0.5)*30,(Math.random()-0.5)*30,]

            model.animate = function(delta){
                model.rotateX += model.rotateXm*delta
                model.rotateY += model.rotateYm*delta
                mat4.identity(model.matrix)
                mat4.translate(model.matrix, model.matrix, model.position)
                mat4.rotateY(model.matrix,model.matrix,model.rotateX)
                mat4.rotateX(model.matrix,model.matrix,model.rotateY)
            }

            models.push(model)
        }
        
        


        var perspectiveMatrix = mat4.create()
        mat4.perspectiveNO(perspectiveMatrix, 45*Math.PI/180, canvas.width/canvas.height, 0.01, 1000)
        //get_projection(40, canvas.width/canvas.height, 1, 100);

        var cameraMatrix = mat4.create()
        mat4.translate(cameraMatrix,cameraMatrix,[0,0,-50])

        
        //const controls = new Controls(gl,canvas)

        var time_old = 0;

        const animate = function(time) {
            const delta = time-time_old;
            time_old = time; 

            


            gl.enable(gl.DEPTH_TEST);

            // gl.depthFunc(gl.LEQUAL);

            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clearDepth(1.0);
            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



            const globalUniforms = {
                perspective: perspectiveMatrix,
                camera: cameraMatrix,
            }


            for(const model of models){
                if(model.animate){
                    model.animate(delta)
                }

                model.render(globalUniforms)
            }

            window.requestAnimationFrame(animate);
        }
        animate(0);
    }
}