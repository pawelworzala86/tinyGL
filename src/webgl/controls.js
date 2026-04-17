export class Controls{
    constructor(gl,canvas){
        this.gl = gl
        this.canvas = canvas

        this.AMORTIZATION = 0.95
        this.drag = false
        this.old_x = 0
        this.old_y = 0
        this.dX = 0 
        this.dY = 0

        this.THETA = 0
        this.PHI = 0

        var mouseDown = (e)=>{
            this.drag = true
            this.old_x = e.pageX
            this.old_y = e.pageY
            e.preventDefault();
            return false;
        }

        var mouseUp = (e)=>{
            this.drag = false
        }

        var mouseMove = (e)=>{
            if(!this.drag) return false
            this.dX = (e.pageX-this.old_x)*2*Math.PI/canvas.width
            this.dY = (e.pageY-this.old_y)*2*Math.PI/canvas.height
            this.THETA += this.dX
            this.PHI += this.dY
            this.old_x = e.pageX
            this.old_y = e.pageY
            e.preventDefault();
        };

        canvas.addEventListener("mousedown", mouseDown, false)
        canvas.addEventListener("mouseup", mouseUp, false)
        canvas.addEventListener("mouseout", mouseUp, false)
        canvas.addEventListener("mousemove", mouseMove, false)
    }
}