import { Player } from "../components/player.js"
import { Box } from "../components/box.js"
import { Place } from "../components/place.js"
import { canvas, ctx, level } from "../data/data.js"

const player = new Player(50, 50, 50, 50, "#ffffff");
const box1 = new Box(150, 150, 50, 50, "red");
const box2 = new Box(350, 350, 50, 50, "blue");
const place1 = new Place(200, 250, 50, 50, "red");
const place2 = new Place(100, 400, 50, 50, "blue");
let win = [false, false];

startGame();
document.addEventListener('keydown', (event) => {
    // debugger
    if (place1.isEmpty()) {
        place1.draw(3, 'rectangle');
    } else {
        place1.draw(5, 'filledRectangle');
        win[0] = true;
    }
    
    if (place2.isEmpty()) {
        place2.draw(3, 'rectangle');
    } else {
        place2.draw(5, 'filledRectangle');
        win[1] = true;
    };

    box1.go(event.keyCode);
    box2.go(event.keyCode);
    player.go(event.keyCode);
    endGame();
})

function startGame() {
    canvas.width = level.length*player.width;
    canvas.height = level.length*player.height;
    cleanCanvas();
    drawWalls();
    player.draw(2, 'filledRectangle');
    box1.draw(4, 'filledRectangle');
    box2.draw(4, 'filledRectangle');
    place1.draw(3, 'rectangle');
    place2.draw(3, 'rectangle');
}

function cleanCanvas() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawWalls() {
    ctx.fillStyle = "#cccccc"
    level.forEach( (row, i) => {
        row.forEach( (cell, j) => {
            if (cell === 1) {
                ctx.fillRect(player.width*j, player.height*i, player.width, player.height)
            }
        })
    })
}

function endGame() {
    if (win.every( el => {
        return el === true;
        })) {
        alert("Game Over");
        document.location.reload();
    }
}
