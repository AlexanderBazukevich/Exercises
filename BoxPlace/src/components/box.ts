import { Base, iParams } from "./base.js"
import { ctx, length, layers, KEY_MAP } from "../data/data.js"

export class Box extends Base {
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
                if (this.canGoLeft(i) && layers.player.index === i + 1) {
                    this.x--;
                    this.index = i - 1;
                    layers.boxes.splice(i, 1, undefined);
                    let box = new Box({
                        color: 'red',
                        x: this.x,
                        y: this.y,
                        index: this.index,
                    });
                    layers.boxes[i - 1] = box;
                }
                break;
            case KEY_MAP.RIGHT:
                if (this.canGoRight(i) && layers.player.index === i - 1) {
                    this.x++;
                    this.index = i + 1;
                    layers.boxes.splice(i, 1, undefined);
                    let box = new Box({
                        color: 'red',
                        x: this.x,
                        y: this.y,
                        index: this.index,
                    });
                    layers.boxes[i + 1] = box;
                }
                break;
            case KEY_MAP.UP:
                if (this.canGoUp(i) && layers.player.index === i + length) {
                    this.y--;
                    this.index = i - length;
                    layers.boxes.splice(i, 1, undefined);
                    let box = new Box({
                        color: 'red',
                        x: this.x,
                        y: this.y,
                        index: this.index,
                    });
                    layers.boxes[i - length] = box;
                }
                break;
            case KEY_MAP.DOWN:
                if (this.canGoDown(i) && layers.player.index === i - length) {
                    this.y++;
                    this.index = i + length;
                    layers.boxes.splice(i, 1, undefined);
                    let box = new Box({
                        color: 'red',
                        x: this.x,
                        y: this.y,
                        index: this.index,
                    });
                    layers.boxes[i + length] = box;
                }
                break;
            default:
                break;
        }
    }
}
