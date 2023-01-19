let world;
let keyboard = new Keyboard();

function init() {
    world = new World(keyboard);
    world.draw();
    gameLoop();
}

function gameLoop() {
    clearCanvas();
    world.update();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode === 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode === 32) {
        keyboard.JUMP = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode === 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode === 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 32) {
        keyboard.JUMP = false;
    }
});

window.addEventListener("click", (e) => {
    keyboard.THROW = true;
    console.log(keyboard.THROW);
    setTimeout(() => {
        keyboard.THROW = false;
        console.log(keyboard.THROW);
    }, 15);

})