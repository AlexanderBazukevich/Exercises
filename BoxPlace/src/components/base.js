import { layers, length } from "../data/data.js";
export class Base {
    constructor(params) {
        this.size = 50;
        Object.keys(params).forEach(key => {
            this[key] = params[key];
        });
    }
    canGoLeft(i) {
        return (!layers.walls[i - 1] && !layers.boxes[i - 1]);
    }
    canGoRight(i) {
        return (!layers.walls[i + 1] && !layers.boxes[i + 1]);
    }
    canGoUp(i) {
        return (!layers.walls[i - length] && !layers.boxes[i - length]);
    }
    canGoDown(i) {
        return (!layers.walls[i + length] && !layers.boxes[i + length]);
    }
}
