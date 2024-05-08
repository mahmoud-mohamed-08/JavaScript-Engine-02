import {Circle} from './circle.js';

export class Collisions {
    constructor() {
        this.collisions = [];
    }

    clearCollisions() {
        this.collisions = [];
    }

    narrowPhazeDetection(objects) {
        for (let i=0; i<objects.length; i++) {
            for (let j=0; j<objects.length; j++) {  //try j=i+1
                if(j > i) {
                    //detect collisions
                    if(objects[i].shape instanceof Circle && 
                        objects[j].shape instanceof Circle) {
                        this.detectCollisionCircleCircle(objects[i], objects[j]);
                            
                        if(objects[i].shape instanceof Rectangle && 
                            objects[j].shape instanceof Rectangle) {
                            this.detectCollisionRectangleRectangle(objects[i], objects[j]);
                        } 
                    } 
                }
            }
        }
    }

    detectCollisionCircleCircle(o1, o2) {   //o1 and o2 are rigidBodies from array objects in main
        const s1 = o1.shape;    //rigidBodies have shape circle or rectangle
        const s2 = o2.shape;    //shape has position and radius
        const dist = s1.position.distanceTo(s2.position);
        if (dist < s1.radius + s2.radius) {
            const overlap = s1.radius + s2.radius - dist;
            //unit vector from s1 to s2
            const normal = s2.position.clone().subtract(s1.position).normalize();   //unit vector(direction) normal(perpendicular) to contact surface
            }
        }
    }

    detectCollisionRectangleRectangle(o1, o2) ;   //o1 and o2 are rigidBodies from array objects in main
        const s1 = o1.shape;    //rigidBodies have shape circle or rectangle
        const s2 = o2.shape;    //shape has position and radius
        const dist = s1.position.distanceTo(s2.position);
        if (dist < s1.length + s2.length) {
            const overlap = s1.length + s2.length - dist;
            //unit vector from s1 to s2
            const normal = s2.position.clone().subtract(s1.position).normalize();   //unit vector(direction) normal(perpendicular) to contact surface
            }
            console.log(true) 
        

    //detect rectangles collisions



if (o1x + o1w >= o2x &&     // r1 right edge past r2 left
  o1x <= o2x + o2w &&       // r1 left edge past r2 right
  o1y + o1h >= o2y &&       // r1 top edge past r2 bottom
  o1y <= o2y + o2h) {       // r1 bottom edge past r2 top
    return true;
}
