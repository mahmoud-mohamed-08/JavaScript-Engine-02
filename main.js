import {Renderer} from './renderer.js';
import {Circle} from './circle.js';

const canv = document.getElementById("canvas"); //find canvas element on web page
const ctx = canv.getContext("2d");  //used for drawing shapes on canvas

const renderer = new Renderer(canv, ctx);   //object from imported class Renderer

//MAIN LOOP
function updateAndDraw() {
    //make objects
    const circle = new Circle({x: 50, y: 60}, 10);
    //draw objects
    renderer.clearFrame();  //first clear
    renderer.drawCircle(circle, "black");
    
}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);