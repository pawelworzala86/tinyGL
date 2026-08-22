//import { Controls } from './controls.js'
import { Model } from './model.js'

const { mat4 } = glMatrix


export class Engine{
    constructor(){
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth / 2.0
        this.canvas.height = window.innerHeight / 2.0
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
            model.rotateX = Math.random()
            model.rotateY = Math.random()
            model.position = [(Math.random()-0.5)*30,(Math.random()-0.5)*30,(Math.random()-0.5)*30,]
            models.push(model)
        }
        
        


        var perspectiveMatrix = mat4.create()
        mat4.perspectiveNO(perspectiveMatrix, 45*Math.PI/180, canvas.width/canvas.height, 0.01, 1000)
        //get_projection(40, canvas.width/canvas.height, 1, 100);

        var cameraMatrix = mat4.create()
        mat4.translate(cameraMatrix,cameraMatrix,[0,0,-50])

        
        //const controls = new Controls(gl,canvas)

        var time_old = 0;

        var animate = function(time) {
            var dt = time-time_old;

            /*if (!controls.drag) {
                controls.dX *= controls.AMORTIZATION
                controls.dY*=controls.AMORTIZATION
                controls.THETA+=controls.dX
                controls.PHI+=controls.dY
            }*/

            //set model matrix to I4

            //mat4.identity(model.mo_matrix)
            //mat4.rotateY(model.mo_matrix,model.mo_matrix,controls.THETA)
            //mat4.rotateX(model.mo_matrix,model.mo_matrix,controls.PHI)


            time_old = time; 

            


            gl.enable(gl.DEPTH_TEST);

            // gl.depthFunc(gl.LEQUAL);

            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clearDepth(1.0);
            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


            for(const model of models){
                model.rotateX += model.rotateXm*dt
                model.rotateY += model.rotateYm*dt
                mat4.identity(model.modelMatrix)
                mat4.translate(model.modelMatrix, model.modelMatrix, model.position)
                mat4.rotateY(model.modelMatrix,model.modelMatrix,model.rotateX)
                mat4.rotateX(model.modelMatrix,model.modelMatrix,model.rotateY)

                model.render(perspectiveMatrix,cameraMatrix)
            }

            window.requestAnimationFrame(animate);
        }
        animate(0);
    }
}