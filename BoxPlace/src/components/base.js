import { ctx, level } from "../data/data.js"

export class Base {
    constructor (x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.height = width;
        this.width = height;
        this.color = color;
    }

    getJ() {
        return +this.x/this.width;
    };

    getI() {
        return +this.y/this.height;
    };

    draw(id, figure) {
        switch (figure) {
            case 'filledRectangle':
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case 'rectangle':
                ctx.strokeStyle = this.color;
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;     
            default:
                break;
        }
        level[this.getI()][this.getJ()] = [id, this.color];
    };

    clean() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        level[this.getI()][this.getJ()] = 0;
    };
}
