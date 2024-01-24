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

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    
        //erase all drawings in a rectangle with the size of the canvas 
        //(from top left corner 0,0, to bottom right corner (w,h))
    }
}