import { Base } from "./base.js";
import { ctx } from "../data/data.js";
export class Wall extends Base {
    constructor(params) {
        super(params);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
    update() { }
}
