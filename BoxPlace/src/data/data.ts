export const canvas: HTMLCanvasElement = document.querySelector("canvas");
export const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
export const startLevel: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 4, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
export const length: number = startLevel.length;

interface ILayer {
    [key: string]: any;
}

interface IMap {
    [key: string]: number;
}

export const layers: ILayer = {
    player: {},
    walls: [],
    boxes: [],
    places: [],
}

export const KEY_MAP: IMap = {
    'LEFT' : 37,
    'RIGHT' : 39,
    'UP': 38,
    'DOWN' : 40,
}

export const OBJ_MAP: IMap = {
    'EMPTY': 0,
    'WALL' : 1,
    'PLAYER' : 2,
    'BOX' : 3,
    'PLACE' : 4,
}
