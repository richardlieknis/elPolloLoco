let world;
let keyboard = new Keyboard();
let lastTime = performance.now();

function init() {
    world = new World(keyboard);
    world.draw();
    gameLoop();
}

function gameLoop() {
    let currentTime = performance.now();
    let deltaTime = (currentTime - lastTime) / 20;

    clearCanvas();
    world.update(deltaTime);

    lastTime = currentTime;
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
    if (e.keyCode === 69) {
        keyboard.EXTRA = true;
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
    if (e.keyCode === 69) {
        keyboard.EXTRA = false;
    }
});

window.addEventListener("click", (e) => {
    keyboard.THROW = true;
    setTimeout(() => {
        keyboard.THROW = false;
    }, 10);

})