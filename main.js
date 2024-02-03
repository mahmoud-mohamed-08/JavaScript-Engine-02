import {Renderer} from './renderer.js';
import {Circle} from './circle.js';
import {Rect} from './rect.js';
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
//button variables
let shapeSelected = 'r';

//MAIN LOOP
function updateAndDraw() {
    //make objects
    if (inp.inputs.lclick && shapeBeingMade == null) {
        //lesson 03 - make rectangles with mouse
        if (shapeSelected == 'c') {
            shapeBeingMade = new Circle(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS, 0);
        } else if (shapeSelected == 'r') {
            shapeBeingMade = new Rect(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS*2, SMALLEST_RADIUS*2);
        }
        
    }
    //adjust radius
    if (inp.inputs.lclick && shapeBeingMade instanceof Circle) {
        const selectedRadius = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).magnitude();
        shapeBeingMade.radius = selectedRadius < SMALLEST_RADIUS ? shapeBeingMade.radius : selectedRadius;
    } 
    //lesson 03 - adjust rectangle
    else if (inp.inputs.lclick && shapeBeingMade instanceof Rect) {
        const selectionVector = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).absolute();
        shapeBeingMade.width = selectionVector.x > SMALLEST_RADIUS ? selectionVector.x * 2 : SMALLEST_RADIUS * 2;
        shapeBeingMade.height = selectionVector.y > SMALLEST_RADIUS ? selectionVector.y * 2 : SMALLEST_RADIUS * 2;
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
        renderer.drawCircle(shapeBeingMade, bordCol, null);
    }
}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);