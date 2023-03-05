class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/5_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/6_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/7_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/8_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.width = 400 / 3 / scale;
        this.height = 400 / 3 / scale;

        this.throwInterval;
        this.splashed = false;

        this.startInterval(this.IMAGES_THROW);
        this.throw(x, y);

        this.breakSound = new Audio("audio/bottleBreak.mp3");
        this.breakSound.volume = 0.3;
    }

    update() {
        this.checkCollisionWithEnemies();
        this.collisionWithEndboss();
    }

    checkCollisionWithEnemies() {
        world.enemies.map(obj => this.killChicken(obj));
    }

    killEnemyWithBottle(chicken) {
        this.killChicken(chicken);
    }

    collisionWithEndboss() {
        if (this.checkCollision(world.boss)) {
            return true;
        } else return false;
    }

    killChicken(chicken) {
        if (this.checkCollision(chicken)) {
            chicken.clearAllIntervals();
            chicken.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
            chicken.speed = 0;
            setTimeout(() => {
                chicken.x = -300;
                chicken.y = -300;
            }, 500);
            clearInterval(this.throwInterval);
            if (this.splashed === false) {
                this.breakSound.play();
                this.startInterval(this.IMAGES_SPLASH);
                this.splashed = true;
            }
            // Place broken Bottle on x = 10000
            setTimeout(() => {
                this.x = 10000;
            }, 500)
        }
    }

    throw (x, y) {
        if (!world.char.isDead && world.statusObjects[2].amount > 0) {
            world.statusObjects[2].amount -= 1;
            this.addPhysics();
            this.y = y;
            this.speedY = 30;
            if (!world.char.flipImage) {
                this.x = x;
                this.throwInterval = setInterval(() => this.x += 10, 25);
            } else {
                this.x = x - 70;
                this.throwInterval = setInterval(() => this.x += -10, 25);
            }
        }
    }


    addCollisionRect() {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + 30, this.y, this.width - 70, this.height);
        ctx.stroke();
    }
}