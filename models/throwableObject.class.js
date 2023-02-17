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

        this.test = true;

        this.animation();
        this.throw(x, y);
    }

    update() {
        this.checkCollisionWithEnemies();
    }

    animation() {
        setInterval(() => {
            if (this.test) {
                let path = this.IMAGES_THROW[this.currentImageB];
                this.img = this.imageCache[path];
                this.currentImageB++;
                if (this.currentImageB == this.IMAGES_THROW.length) {
                    this.currentImageB = 0;
                }
            }
        }, 1000 / 10);
    }

    checkCollisionWithEnemies() {
        world.enemies.map(obj => this.killEnemyWithBottle(obj));
    }

    killEnemyWithBottle(chicken) {
        if (this.checkCollision(chicken)) {
            chicken.clearAllIntervals();
            chicken.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
            chicken.speed = 0;
            setTimeout(() => {
                chicken.x = -300;
                chicken.y = -300;
            }, 500);
            this.speedY = 0;
            this.x = 10000;
        }
    }

    throw (x, y) {
        if (!world.char.isDead) {
            this.addPhysics();
            this.y = y;
            this.speedY = 30;
            if (!world.char.flipImage) {
                this.x = x;
                setInterval(() => this.x += 12, 25);
            } else {
                this.x = x - 70;
                setInterval(() => this.x += -12, 25);
            }
        }
    }
}