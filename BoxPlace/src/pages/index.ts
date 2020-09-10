import { Player } from "../components/player.js"
import { Box } from "../components/box.js"
import { Wall } from "../components/wall.js"
import { Place } from "../components/place.js"
import { canvas, ctx, startLevel, layers, OBJ_MAP } from "../data/data.js"

export class Game {
    placeIndexes: number[] = [];
    constructor() {
        
    }
    startGame(): void {
        canvas.width = startLevel.length*50;
        canvas.height = startLevel.length*50;
        this.loadLevel(startLevel);
        this.cleanCanvas();
        this.draw();
    }

    cleanCanvas(): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    loadLevel(level: number[][]): void {
        level.forEach ( (elY, y) => {
            elY.forEach ( (elX, x) => {
                switch (elX) {
                    case OBJ_MAP.WALL:
                        let wall = new Wall({
                            name: 'WALL',
                            color: 'grey',
                            x: x,
                            y: y,
                        });
                        layers.walls[10*y + x] = wall;
                        break;
                    case OBJ_MAP.PLAYER:
                        layers.player = new Player({
                            name: 'PLAYER',
                            color: 'white',
                            x: x,
                            y: y, 
                            index: 10*y + x,
                        });
                        break;
                    case OBJ_MAP.BOX:
                        let box = new Box({
                            name: 'BOX',
                            color: 'red',
                            x: x,
                            y: y, 
                            index: 10*y + x,
                        });
                        layers.boxes[10*y + x] = box;
                        break;
                    case OBJ_MAP.PLACE:
                        let place = new Place({
                            name: 'PLACE',
                            color: 'red',
                            x: x,
                            y: y, 
                            index: 10*y + x,
                        });
                        layers.places[10*y + x] = place;
                        this.placeIndexes.push(10*y + x);
                        break;
                    default:
                        break;
                }
            })
        })
    }

    draw(): void {
        layers.walls.forEach( wall => {
            wall.draw()
        })
        layers.boxes.forEach( box => {
            if (box) box.draw()
        })
        layers.places.forEach( place => {
            if (place) place.draw();
        })
        layers.player.draw();
    }

    update(key: number): void {
        layers.boxes.forEach( box => {
            if (box) box.update(key)
        })
        layers.player.update(key);
    }

    endGame(): void {
        let boxIndexes = [];
        layers.boxes.forEach( (box, i) => {
            if (box) {
                boxIndexes.push(i);
            }
        })
        if (JSON.stringify(boxIndexes) === JSON.stringify(this.placeIndexes))
        {
            setTimeout( () => alert('Victory!!!'), 10)
        }
    }
}

const game = new Game();
game.startGame();

document.addEventListener('keydown', (event) => {
    game.cleanCanvas();
    game.update(event.keyCode);
    game.draw();
    game.endGame();
})
