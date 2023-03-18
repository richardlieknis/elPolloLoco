let world;
let keyboard = new Keyboard();
let lastTime = performance.now();
let mouseTrigger = false;
let soundTrigger = false;
let savedSoundOpt = true;
let GAME_RUNNING = false;

function init() {
    showStartOverlay();
}

function gameLoop() {
    if (GAME_RUNNING) {
        let currentTime = performance.now();
        let deltaTime = (currentTime - lastTime) / 20;
        clearCanvas();
        world.update(deltaTime, GAME_RUNNING);
        lastTime = currentTime;
        changeSoundForNewBottles();

    }
    requestAnimationFrame(gameLoop);
}

function startGame() {
    GAME_RUNNING = true;
    document.getElementById("startOverlay").classList.add('d-none');
    document.getElementById("volumeBtn").classList.remove('d-none');
    world = new World(keyboard);
    world.draw();
    generateCollectables();
    generateChickens();
    gameLoop();
}

function restartGame() {
    GAME_RUNNING = true;
    document.getElementById("restartBtn").classList.add("d-none");
    document.getElementById("gameoverOverlay").classList.add("d-none");
    document.getElementById("youLostImg").classList.add("d-none");
    document.getElementById("gameOverImg").classList.add("d-none");
    document.getElementById("darkOverlay").classList.add("d-none");
    world.gameWonSound.pause();
    world = new World(keyboard);
    generateCollectables();
    generateChickens();
    loadCurrentSoundOption();
}

function changeSound() {
    let volumeBtn = document.getElementById("volumeBtn");
    if (!soundTrigger) {
        setAllSounds(true);
        setAllEnemySounds(true);
        setAllCollectSounds(true);
        setAllTumbleweedSounds(true);
        setAllBottleSounds(true);
        soundTrigger = true;
        savedSoundOpt = false;
        volumeBtn.src = "img/10_overlay_icons/muteBtn.png";
    } else if (soundTrigger) {
        setAllSounds(false);
        setAllEnemySounds(false);
        setAllCollectSounds(false);
        setAllTumbleweedSounds(false);
        setAllBottleSounds(false);
        soundTrigger = false;
        savedSoundOpt = true;
        volumeBtn.src = "img/10_overlay_icons/volumeBtn.png";
    }
}

function loadCurrentSoundOption() {
    if (savedSoundOpt === true) {
        soundTrigger = true;
    } else if (savedSoundOpt === false) {
        soundTrigger = false;
    }
    changeSound();
}

function setAllSounds(boolean) {
    world.ambientSound.muted = boolean;
    world.gameWonSound.muted = boolean;
    world.gameLooseSound.muted = boolean;
    world.char.walkSound.muted = boolean;
    world.char.jumpSound.muted = boolean;
    world.char.hurtSound.muted = boolean;
    world.char.hurtSound2.muted = boolean;
    world.char.deadSound.muted = boolean;
    world.boss.bossMusic.muted = boolean;
}

function setAllEnemySounds(boolean) {
    world.enemies.forEach(element => {
        element.deadSound.muted = boolean;
    });
}

function setAllCollectSounds(boolean) {
    world.collectableObjects.forEach(element => {
        element.collectSound.muted = boolean;
    })
}

function setAllTumbleweedSounds(boolean) {
    world.tumbleweeds.forEach(element => {
        element.audio.muted = boolean;
    })
}

function setAllBottleSounds(boolean) {
    world.bottles.forEach(element => {
        element.breakSound.muted = boolean;
    })
}

function changeSoundForNewBottles() {
    if (savedSoundOpt === true) {
        setAllBottleSounds(false);
    }
    if (savedSoundOpt === false) {
        setAllBottleSounds(true);
    }
}

function setFullscreen() {
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    let docElm = document.getElementById('canvasContainer');
    if (!isInFullScreen) {
        openFullscreen(docElm);
    } else {
        exitFullscreen(docElm);
    }
}

function openFullscreen(docElm) {
    document.getElementById('canvas').classList.add('style-fullscreen');
    document.getElementById('startImg').style.width = "100%";
    document.getElementById('startImg').style.height = "auto";
    document.getElementById('gameOverImg').style.width = "100%";
    document.getElementById('gameOverImg').style.height = "auto";
    document.getElementById('youLostImg').style.width = "100%";
    document.getElementById('youLostImg').style.height = "auto";
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

function exitFullscreen() {
    document.getElementById('canvas').classList.remove('style-fullscreen');
    document.getElementById('startImg').style.height = null;
    document.getElementById('gameOverImg').style.height = null;
    document.getElementById('youLostImg').style.height = null;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
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
    for (let i = 0; i < 5; i++) {
        world.collectableObjects.push(new Wrap(5300, 150, true));
        world.collectableObjects.push(new Bottle(5300, 250, true));
    }
    for (let i = 0; i < 4; i++) {
        world.collectableObjects.push(new Wrap(i * 1000 + 1500, 50, true));
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
        keyboard.THROW = true;
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
        keyboard.THROW = false;
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