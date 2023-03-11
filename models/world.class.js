class World {
    char = new Character(3);
    boss = new Boss(1);
    enemies = [];
    collectableObjects = [];
    bottles = [];
    clouds = [
        new Cloud(0.08),
        new Cloud(0.1),
        new Cloud(0.3),
        new Cloud(0.5),
        new Cloud(0.2),
    ]

    tumbleweeds = [
        new Tumbleweed(1400, 10),
        new Tumbleweed(2500, 8),
    ]

    bgObjDesert = [
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', canvas.width * 2 - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width * 3 - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', canvas.width * 4 - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width * 5 - 1, 0),
    ]

    bgObjParallax = [
        new backgroundObject('img/5_background/layers/air.png', 0, -1),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0, -0.3),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0, -0.15),
    ]

    bgObjParallax2 = [
        new backgroundObject('img/5_background/layers/air.png', 0, -1),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 0, -0.3),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 0, -0.15),
    ]

    statusObjects = [
        new Energy(30),
        new Wrap(200),
        new Bottle(350),
        new BossEnergy(),
    ];

    constructor(keyboard) {
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.end = canvas.width * 4;
        this.world = this;

        this.ambientSound = new Audio("audio/desert.mp3");
        this.ambientSound.play();
        this.ambientSound.volume = 0.2;
        this.ambientSound.loop = true;
        this.ambientSound.autoplay = true;

        this.gameWonSound = new Audio("audio/win.mp3");
        this.gameWonSound.volume = 0.3;

        this.gameover = false;

    }

    draw() {
        ctx.translate(this.camera_x, 0);

        this.drawParallaxBg(this.bgObjParallax, 0);
        this.drawParallaxBg(this.bgObjParallax2, canvas.width - 1);
        this.drawParallaxBg(this.bgObjParallax, canvas.width * 2 - 1);
        this.drawParallaxBg(this.bgObjParallax2, canvas.width * 3 - 1);
        this.drawParallaxBg(this.bgObjParallax, canvas.width * 4 - 1);
        this.drawParallaxBg(this.bgObjParallax2, canvas.width * 5 - 1);

        this.addObjectsToWorld(this.bgObjDesert);
        this.addObjectsToWorld(this.clouds);
        this.addObjectToWorld(this.boss);
        this.addObjectToWorld(this.char);
        this.addObjectsToWorld(this.tumbleweeds);
        this.addObjectsToWorld(this.enemies);
        this.addObjectsToWorld(this.bottles);
        this.addObjectsToWorld(this.collectableObjects);

        ctx.translate(-this.camera_x, 0);
    }

    drawStatus() {
        this.addObjectsToWorld(this.statusObjects);
    }

    drawParallaxBg(objects, offset) {
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            let speed = obj.parallaxSpeed;
            obj.x = (this.camera_x * speed) + offset;
            this.addObjectToWorld(obj);
        }
    }

    update(deltaTime) {
        this.checkIfBossIsDead();
        this.draw();
        this.drawStatus();
        this.char.update(this.keyboard, deltaTime);
        this.boss.update(deltaTime);
        this.clouds.forEach(obj => {
            obj.update(deltaTime);
        });
        this.tumbleweeds.forEach(obj => {
            obj.update(deltaTime);
        });
        this.enemies.forEach(obj => {
            obj.update(deltaTime);
        });
        this.statusObjects.forEach(obj => {
            obj.update(deltaTime);
        });
        this.bottles.forEach(obj => {
            obj.update(deltaTime);
        });

        this.checkThrowObjects();
    }

    checkIfBossIsDead() {
        if (this.boss.isDead || this.char.isDead) {
            this.gameover = true;
            this.boss.bossMusic.pause();
            this.gameWonSound.play();
            this.showGameoverOverlay();
            return true;
        }
    }

    showGameoverOverlay() {
        let gameOver = document.getElementById("gameoverOverlay");
        let gameOverImg = document.getElementById("gameOverImg");
        setTimeout(() => {
            GAME_RUNNING = false;
            this.char.clearAllIntervals();
            this.char.walkSound.pause();
            gameOverImg.width = canvas.width;
            gameOverImg.height = canvas.height;
            gameOver.classList.remove('d-none');
        }, 2500);
    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.char.x + 90, this.char.y + 180);
            this.bottles.push(bottle);
        }
    }

    addObjectsToWorld(objects) {
        objects.forEach(obj => {
            this.addObjectToWorld(obj);
        });
    }

    addObjectToWorld(object) {
        //object.addCollisionRect();
        if (object.flipImage) {
            ctx.save();
            ctx.translate(object.width, 0);
            ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        object.draw();
        if (object.flipImage) {
            object.x = object.x * -1;
            ctx.restore();
        }
    }
}