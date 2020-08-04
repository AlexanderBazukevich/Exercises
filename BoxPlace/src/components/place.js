import { Base } from "./base.js"
import { level } from "../data/data.js"

export class Place extends Base {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)
    }

    isEmpty() {
        let i = this.getI();
        let j = this.getJ();
        if (level[i][j][0] === 4 && this.color === level[i][j][1] || level[i][j][0] === 5) {
            return false;
        } else return true;
    }
}
