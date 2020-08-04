import { Base } from "./base.js"
import { level } from "../data/data.js"

export class Box extends Base {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)
    }

    go(key) {
        let i = this.getI();
        let j = this.getJ();
        if (level[i][j][0] !== 5) {
            this.clean();
            switch (key) {
                case 40:
                    if (level[i+1][j] !== 1 && level[i+1][j][0] !== 4 && level[i-1][j][0] === 2) {
                        this.y += this.height;
                    }
                    break;
                case 38:
                    if (level[i-1][j] !== 1 && level[i-1][j][0] !== 4 && level[i+1][j][0] === 2) {
                        this.y -= this.height;
                    }
                    break;
                case 39:
                    if (level[i][j+1] !== 1 && level[i][j+1][0] !== 4 && level[i][j-1][0] === 2) {
                        this.x += this.width;
                    }
                    break;
                case 37:
                    if (level[i][j-1] !== 1 && level[i][j-1][0] !== 4 && level[i][j+1][0] === 2) {
                        this.x -= this.width;
                    }
                    break;
                default:
                    break;
            }
            this.draw(4, 'filledRectangle');
        }
    }
}