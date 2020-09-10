import { layers, length } from "../data/data.js"

export interface iParams {
    [key: string]: any;
}


export class Base {
    name: string;
    color?: string;
    x: number;
    y: number;
    index?: number;
    size: number = 50;

    constructor (params: iParams) {
        Object.keys(params).forEach(key => {
            this[key] = params[key];
        })
    }

    canGoLeft(i: number): boolean {
        return (!layers.walls[i - 1] && !layers.boxes[i - 1]);
    }

    canGoRight(i: number): boolean {
        return (!layers.walls[i + 1] && !layers.boxes[i + 1]);
    }

    canGoUp(i: number): boolean {
        return (!layers.walls[i - length] && !layers.boxes[i - length]);
    }

    canGoDown(i: number): boolean {
        return (!layers.walls[i + length] && !layers.boxes[i + length]);
    }
}
