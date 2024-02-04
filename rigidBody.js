import {Vec} from './vector.js';

export class RigidBody {    //any object with fixed shape and physics
    constructor(s) {
        this.shape = s;
        this.velocity = new Vec(0, 0);
    }

    updateShape(dt) {
        const ds = this.velocity.clone().multiply(dt);  //method chaining
        this.shape.position.add(ds);
    }
}