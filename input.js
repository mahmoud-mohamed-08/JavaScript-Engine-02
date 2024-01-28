import {Vec} from './vector.js';

export class Input {
    constructor(canv, win) {
        this.canv = canv;
        this.window = win;

        this.inputs = {
            mouse: {
                position: new Vec(0, 0),
            },
            lclick: false,
            rclick: false
        };
    }

    addListeners() {
        this.canv.addEventListener("mousedown", this.mouseDown);    //listens for clicking a mouse button
        this.canv.addEventListener("mouseup", this.mouseUp);    //listens for releasing the mouse button
        this.canv.addEventListener('contextmenu', this.onContextMenu);  //right click gives us context menu
        this.canv.addEventListener('mousemove', this.mouseMove);    //listens for movement of the mouse cursor and stores the coordinates
        this.window.addEventListener('resize', this.resizeCanvas, false);
    }

    mouseDown(e) {
        if (e.button==0) {  //0 value means the left button was clicked
            this.inputs.lclick = true;
        } else if (e.button==2)	{   //2 value means right click
            this.inputs.rclick = true;
        }
    }

    mouseUp(e) {
        if (e.button==0) {
            this.inputs.lclick = false;
        } else if (e.button==2)	{
            this.inputs.rclick = false;
        }
    }

    onContextMenu(e) {
        e.preventDefault();
    }

    mouseMove(e) {
        const x = e.pageX - this.canv.offsetLeft;
        const y = e.pageY - this.canv.offsetTop;
        this.inputs.mouse.position.x = x;
        this.inputs.mouse.position.y = y;
    }

    resizeCanvas() {
        this.canv.width = this.window.innerWidth;
        this.canv.height = this.window.innerHeight;
    }
}