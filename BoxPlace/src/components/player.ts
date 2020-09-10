import { Base, iParams } from "./base.js"
import { ctx, length, KEY_MAP } from "../data/data.js"

export class Player extends Base {

    constructor(params: iParams) {
        super(params);
    }

    draw(): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }

    update(key: number): void {
        let i: number = +this.index;
        switch (key) {
            case KEY_MAP.LEFT:
                if (this.canGoLeft(i)) {
                    this.x--;
                    this.index = i - 1;
                }
                break;
            case KEY_MAP.RIGHT:
                if (this.canGoRight(i)) {
                    this.x++;
                    this.index = i + 1;
                }
                break;
            case KEY_MAP.UP:
                if (this.canGoUp(i)) {
                    this.y--;
                    this.index = i - length;
                }
                break;
            case KEY_MAP.DOWN:
                if (this.canGoDown(i)) {
                    this.y++;
                    this.index = i + length;
                }
                break;
            default:
                break;
        }
    }
}
