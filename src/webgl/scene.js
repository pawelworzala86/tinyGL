const { mat4 } = glMatrix

export class Scene{
    constructor(gl){
        this.gl = gl
        this.childrens = []
        this.matrix = mat4.create()
    }
    render(perspectiveMatrix,cameraMatrix,matrix=mat4.create()){
        const finalMatrix = mat4.create();
        mat4.multiply(finalMatrix, matrix, this.matrix);

        for(const child of this.childrens){
            child.render(perspectiveMatrix,cameraMatrix,finalMatrix)
        }
    }
}

export default Scene