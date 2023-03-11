let world;
let keyboard = new Keyboard();
let lastTime = performance.now();
let mouseTrigger = false;
let GAME_RUNNING = true;

function init() {
    showStartOverlay();
}

function startGame() {
    document.getElementById("startOverlay").classList.add('d-none');
    world = new World(keyboard);
    world.draw();
    generateCollectables();
    generateChickens();
    gameLoop();
}

function restartGame() {
    document.getElementById("gameoverOverlay").classList.add("d-none");
    document.getElementById("darkOverlay").classList.add("d-none");
    world.gameWonSound.pause();
    GAME_RUNNING = true;
    world = new World(keyboard);
    generateCollectables();
    generateChickens();
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

function showControlsOverlay() {
    let controlsOverlay = document.getElementById("showControlsOverlay");
    controlsOverlay.classList.remove('d-none');
}

function closeControlsOverlay() {
    let controlsOverlay = document.getElementById("showControlsOverlay");
    controlsOverlay.classList.add('d-none');
}

function showStartOverlay() {
    let startOverlay = document.getElementById("startOverlay");
    let startImg = document.getElementById("startImg");

    startImg.width = canvas.width;
    startImg.height = canvas.height;
    startOverlay.classList.remove('d-none');
}

function generateCollectables() {
    for (let i = 0; i < 23; i++) {
        world.collectableObjects.push(new Bottle(200 * i + 500, 250, true));
        world.collectableObjects.push(new Wrap(200 * i + 400, 150, true));
    }
}

function generateChickens() {
    for (let i = 0; i < 25; i++) {
        let randomNumbPos = Math.floor(Math.random() * 400 + 100);
        let randomNumbSpeed = Math.random() * 2 + 0.8;
        world.enemies.push(new Chicken(i * randomNumbPos + 1500, randomNumbSpeed));
    }
}

function mobileJumpBtn() {
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.JUMP = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.JUMP = false;
    });
};

function mobileThrowBtn() {
    document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.THROW = true;
    });
    document.getElementById('throwBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.THROW = false;
    });
};

function mobileRightBtn() {
    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
};

function mobileLeftBtn() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
};

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
        }, 1000)
    }
});

window.addEventListener("mouseup", (e) => {
    keyboard.THROW = false;
});