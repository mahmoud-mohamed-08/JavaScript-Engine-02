import {Circle} from './circle.js';
import {Rect} from './rect.js';

export class Renderer {
    constructor (canv, ctx) {
        this.canvas = canv;
        this.ctx = ctx;
    }

    drawCircle(circle, strokeColor, fillColor){
        this.ctx.beginPath();
        this.ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI*2, true);
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();    //ctx colors the background of the circle
        }
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();  //ctx draws the border of the circle
    }

    drawRect(rect, strokeColor, fillColor) {
        this.ctx.save();
        this.ctx.translate(rect.position.x, rect.position.y);
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fillRect(
                - rect.width/2,
                - rect.height/2,
                rect.width,
                rect.height,
            );
        }
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
            - rect.width/2,
            - rect.height/2,
            rect.width,
            rect.height,
        );
        this.ctx.restore();
    }

    drawFrame(objects, fillCol, bordCol) {
        for (let i = 0; i<objects.length; i++) {    //for loop
            const rigidobj = objects[i];
            if (rigidobj.shape instanceof Circle) {
                this.drawCircle(rigidobj.shape, bordCol, fillCol);
            } 
            else if (rigidobj.shape instanceof Rect) {
                this.drawRect(rigidobj.shape, bordCol, fillCol);
            }
        } 
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    
        //erase all drawings in a rectangle with the size of the canvas 
        //(from top left corner 0,0, to bottom right corner (w,h))
    }
}