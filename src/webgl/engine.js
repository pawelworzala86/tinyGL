import { Controls } from './controls.js'
import { Model } from './model.js'

const { mat4 } = glMatrix


export class Engine{
    constructor(){
        this.canvas = document.getElementById('canvas')
        this.gl = canvas.getContext('webgl2')
    }
    async render(){
        const canvas = this.canvas
        const gl = this.gl


        


        const model = await Model.create(gl)
        


        var proj_matrix = mat4.create()
        mat4.perspectiveNO(proj_matrix, 45*Math.PI/180, canvas.width/canvas.height, 0.01, 1000)
        //get_projection(40, canvas.width/canvas.height, 1, 100);

        var view_matrix = mat4.create()
        mat4.translate(view_matrix,view_matrix,[0,0,-6])

        
        const controls = new Controls(gl,canvas)

        var time_old = 0;

        var animate = function(time) {
        var dt = time-time_old;

        if (!controls.drag) {
            controls.dX *= controls.AMORTIZATION
            controls.dY*=controls.AMORTIZATION
            controls.THETA+=controls.dX
            controls.PHI+=controls.dY
        }

        //set model matrix to I4

        mat4.identity(model.mo_matrix)
        mat4.rotateY(model.mo_matrix,model.mo_matrix,controls.THETA)
        mat4.rotateX(model.mo_matrix,model.mo_matrix,controls.PHI)

        time_old = time; 
        gl.enable(gl.DEPTH_TEST);

        // gl.depthFunc(gl.LEQUAL);

        gl.clearColor(0.5, 0.5, 0.5, 0.9);
        gl.clearDepth(1.0);
        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        model.render(proj_matrix,view_matrix)

        window.requestAnimationFrame(animate);
        }
        animate(0);
    }
}