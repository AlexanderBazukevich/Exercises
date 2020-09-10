import { Base, iParams } from "./base.js"
import { ctx } from "../data/data.js"

export class Place extends Base {
    constructor(params: iParams) {
        super(params);
    }

    draw(): void {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }
}
