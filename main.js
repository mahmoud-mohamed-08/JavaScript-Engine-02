import {Renderer} from './renderer.js';
import {Circle, Rectangle} from './circle.js';
import {Vec} from './vector.js';
import {Input} from './input.js';

//simulation constants
const SMALLEST_RADIUS = 10;


const canv = document.getElementById("canvas"); //find canvas element on web page
const ctx = canv.getContext("2d");  //used for drawing shapes on canvas

const inp = new Input(canv, window);
inp.resizeCanvas();
inp.addListeners();


const renderer = new Renderer(canv, ctx);   //object from imported class Renderer
const fillCol = "darkGray";
const bordCol = "black";

const objects = [];
let shapeBeingMade = null;

//MAIN LOOP
function updateAndDraw() {
    //make objects
    if (inp.inputs.lclick && shapeBeingMade == null) {  //make rectangle
        shapeBeingMade = new Rectangle(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS, 0);
    }
    if (inp.inputs.lclick && shapeBeingMade) {  //resize circle
        const selectedRadius = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).magnitude();
        shapeBeingMade.radius = selectedRadius < SMALLEST_RADIUS ? shapeBeingMade.radius : selectedRadius;
    }

    //add objects
    if (shapeBeingMade && !inp.inputs.lclick) { //store ready circle after releasing left click
        objects.push(shapeBeingMade);   //push means add object to array
        shapeBeingMade = null;
    }

    //draw objects
    renderer.clearFrame();  //first clear
    renderer.drawFrame(objects, fillCol, bordCol);
    //draw shape
    if (shapeBeingMade) {
        renderer.drawRect(shapeBeingMade, bordCol, null);
    }

}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);