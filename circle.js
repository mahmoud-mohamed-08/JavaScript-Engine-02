import {Vec} from './vector.js';
import {Aabb} from './aabb.js';

export class Circle {
	constructor(pos, r, c, b) {
		this.position = pos
		this.radius = r;
        this.orientation = 0;
        this.aabb = new Aabb(new Vec(0,0),new Vec(0,0));

        this.fillCol=c;
        this.bordCol=b;
	}
    
    updateAabb() {
        this.aabb.min = this.position.clone().subtractX(this.radius).subtractY(this.radius);
        this.aabb.max = this.position.clone().addX(this.radius).addY(this.radius);
    }

    calculateMass(density) {
        const area = Math.PI * this.radius * this.radius;
        return area * density;
    }

    calculateInertia(mass) {
        const inertia = 0.5 * mass * this.radius * this.radius;      //formula: I = (1/2) * m * r^2
        return inertia;
    }

	draw(ctx, fillCol, bordCol) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        if (fillCol) {
            ctx.fillStyle = fillCol;
            ctx.fill();
        }
        ctx.strokeStyle = bordCol;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(
            this.position.x + this.radius * Math.cos(this.orientation),
            this.position.y + this.radius * Math.sin(this.orientation),
        );
        ctx.stroke();

    }
}	