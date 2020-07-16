const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const level = [
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = width;
        this.width = height;
    }

    getJ() {
        return +this.x/this.width;
    };

    getI() {
        return +this.y/this.height;
    };

    draw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    clean() {    
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    go(key) {
        let i = this.getI();
        let j = this.getJ();

        this.clean();
        switch (key) {
            case 50:
                if (level[i+1][j] !== 1) {
                    this.y += this.height;
                }
                break;
            case 56:
                if (level[i-1][j] !== 1) {
                    this.y -= this.height;
                }
                break;
            case 54:
                if (level[i][j+1] !== 1) {
                    this.x += this.width;
                }
                break;
            case 52:
                if (level[i][j-1] !== 1) {
                    this.x -= this.width;
                }
                break;       
            default:
                break;
        }
        this.draw();
    }
}

let player = new Player(50, 50, 50, 50);
startGame();

document.addEventListener('keypress', (event) => {

    player.go(event.keyCode);

    if (player.getI() === level.length - 1 || player.getI() === 0 || player.getJ() === level.length - 1 || player.getJ() === 0) {
        alert('CONGRATULATIONS!!! YOU LUCKY BASTARD!');
        player = new Player(50, 50, 50, 50); //? how to enhance
        startGame();
    };
})

function startGame() {
    canvas.width = level.length*player.width;
    canvas.height = level.length*player.height;
    cleanCanvas();
    drawWalls();
    player.draw();    
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
