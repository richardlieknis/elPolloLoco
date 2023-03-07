let world;
let keyboard = new Keyboard();
let lastTime = performance.now();
let mouseTrigger = false;
let GAME_RUNNING = true;

function init() {
    world = new World(keyboard);
    world.draw();
    generateCollectables();
    generateChickens();
    gameLoop();
}

function gameLoop() {
    if (GAME_RUNNING) {
        let currentTime = performance.now();
        let deltaTime = (currentTime - lastTime) / 20;

        clearCanvas();
        world.update(deltaTime);

        lastTime = currentTime;

    }
    requestAnimationFrame(gameLoop);
}

function generateCollectables() {
    for (let i = 0; i < 20; i++) {
        world.collectableObjects.push(new Bottle(200 * i + 500, 250, true));
        world.collectableObjects.push(new Wrap(200 * i + 400, 150, true));
    }
}

function generateChickens() {
    for (let i = 0; i < 20; i++) {
        let randomNumber = Math.floor(Math.random() * 400 + 100);
        world.enemies.push(new Chicken(i * randomNumber + 1500, 1));

    }
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

window.addEventListener("mousedown", (e) => {
    if (mouseTrigger === false) {
        mouseTrigger = true;
        keyboard.THROW = true;
        setTimeout(() => {
            keyboard.THROW = false;
        }, 6.5);
        setTimeout(() => {
            mouseTrigger = false;
        }, 500)
    }
});

window.addEventListener("mouseup", (e) => {
    keyboard.THROW = false;
});