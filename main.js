import {Renderer} from './renderer.js';
import {Circle} from './circle.js';
import {Rect} from './rect.js';
import {Input} from './input.js';
import {RigidBody} from './rigidBody.js';
import {Collisions} from './collisions.js';
import {Vec} from './vector.js';

const SMALLEST_RADIUS = 10;
const dt = 1/60;    //time per frame

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

const renderer = new Renderer(canv, ctx);
const fillCol = "darkGray";
const bordCol = "black";

const col = new Collisions();

//inputs
const inp = new Input(canv, window, dt);
inp.resizeCanvas();
inp.addListeners();

const objects = [];
let shapeBeingMade = null;
//button variables
let shapeSelected = 'r';
const circleButton = document.getElementById("c");
const rectButton = document.getElementById("r");
circleButton.onclick = function() {
    shapeSelected = 'c';
};
rectButton.onclick = function() {
    shapeSelected = 'r';
};

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

    //add objects - lesson 03
    if (shapeBeingMade && !inp.inputs.lclick) {
        addObject(shapeBeingMade);
        shapeBeingMade = null;
    }

    //move objects with mouse
    if(!inp.inputs.lclick && inp.inputs.rclick && !inp.inputs.mouse.movedObject) {
        const closestObject = findClosestObject(objects, inp.inputs.mouse.position);
        inp.inputs.mouse.movedObject = closestObject == null ? null : closestObject;
    }
    if(!inp.inputs.rclick || inp.inputs.lclick) {
        inp.inputs.mouse.movedObject = null;
    }
    if(inp.inputs.mouse.movedObject) {
        moveObjectWithMouse(inp.inputs.mouse.movedObject);
    }

    //Lesson 03 - update object positions with velocity
    for(let i=0; i<objects.length; i++) {
        objects[i].updateShape(dt);
    }

    //COLLISIONS
    col.clearCollisions();
    col.broadPhazeDetection(objects);
    col.narrowPhazeDetection(objects);  //detect all possible collisions
    col.resolveCollisions();    //push off

    //draw objects
    renderer.clearFrame();
    renderer.drawFrame(objects, fillCol, bordCol);
    //draw shape
    if (shapeBeingMade) {
        shapeBeingMade.draw(ctx, bordCol, null);
    }

}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);

function findClosestObject(objects, vector) {
    let closestObject = null;
    let distance;
    let lowestDistance = 30;
    for(let i=0; i<objects.length; i++) {
        distance = objects[i].shape.position.distanceTo(vector);
        if (distance < lowestDistance) {
            lowestDistance = distance;
            closestObject = objects[i];
        }
    }
    return closestObject;
}

function moveObjectWithMouse(object) {
    object.shape.position.copy(inp.inputs.mouse.position);
    object.velocity.copy(inp.inputs.mouse.velocity);
}

function addObject(shape) {
    const object = new RigidBody(shape);  
    objects.push(object);
} 

const grades = [99, 92, 93, 96, 89]; //array - list of values

//accessing elements of an array
//what is my first grade?
console.log(grades[0]);

//how many grades do I have in total?
console.log(grades.length); //shows how many elements in the array (5)

//let's see my last grade
console.log(grades[grades.length-1]);

//change my third grade, make it 100, then log it
console.log(grades[2]);
grades[2] = 100;
console.log("My new grade is " +grades[2]);

//check if my grades are an array - instanceof Array
console.log((grades instanceof Array)); //true - grades is an array

//looping array elements
for (let i = 0; i < grades.length; i++) {
    grades[i] = 100;
}
console.log("My grades are" +grades);

// for (let i = grades.length-1; i >= 0; i--) {
//     grades[i] = 100;
// }
// console.log("My grades are" +grades);

//lets make all grades 0, use forEach

grades.forEach(grade => {
    console.log(grade);
});

grades.push(90);    //push adds element to the end of the array
console.log("My new grades are" +grades);
grades.unshift(90); //adds an element to the beginning of the array
console.log("My newer grades are" +grades);

grades.splice(grades.length-1, 1);  //(i,n) starts at i, removes n elements
console.log("My newest grades are" +grades);