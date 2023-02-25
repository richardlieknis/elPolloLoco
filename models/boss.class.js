class Boss extends MovableObject {
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];



    constructor(speed) {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.width = 1045 / scale / 2;
        this.height = 1217 / scale / 2;
        this.x = 6600;
        this.y = canvas.height - this.height - 50;
        this.speed = speed;
        this.dead = false;
        this.trigger = false;

        this.intervalId;
        this.animation();
    }

    update(deltaTime) {
        if (world.char.x > 6000 || this.trigger) {
            this.trigger = true;
            this.bossMovement(deltaTime);
            this.checkPosition();
        }
    }

    checkPosition() {
        let positionDif = this.x - world.char.x;
        if (positionDif > -10 && positionDif < 10) {
            this.startInterval(this.IMAGES_ALERT);
        }
    }

    bossMovement(deltaTime) {
        let positionDif = this.x - world.char.x + 80;
        if (positionDif > 0) {
            if (positionDif > 10) {
                this.moveLeft(this.speed * deltaTime);
            }
            this.flipImage = false;
        } else if (positionDif < 0) {
            if (positionDif < -10) {
                this.moveRight(this.speed * deltaTime);
            }
            this.flipImage = true;
        }
    }

    animation() {
        this.startInterval(this.IMAGES_WALK);
        //this.startInterval(this.IMAGES_ALERT);
    }

    startInterval(images) {
        this.currentImage = 0;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == images.length) {
                this.currentImage = 0;
            }
        }, 1000 / 5)
    }

}