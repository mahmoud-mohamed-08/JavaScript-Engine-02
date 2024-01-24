export class Renderer {
    constructor (canv, ctx) {
        this.canvas = canv;
        this.ctx = ctx;
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

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    
        //erase all drawings in a rectangle with the size of the canvas 
        //(from top left corner 0,0, to bottom right corner (w,h))
    }
}