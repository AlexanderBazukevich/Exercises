export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
export const startLevel = [
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
];
export const length = startLevel.length;
export const layers = {
    player: {},
    walls: [],
    boxes: [],
    places: [],
};
export const KEY_MAP = {
    'LEFT': 37,
    'RIGHT': 39,
    'UP': 38,
    'DOWN': 40,
};
export const OBJ_MAP = {
    'EMPTY': 0,
    'WALL': 1,
    'PLAYER': 2,
    'BOX': 3,
    'PLACE': 4,
};
