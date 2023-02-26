class Character extends MovableObject {
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        // 'img/2_character_pepe/1_idle/idle/I-7.png',
        // 'img/2_character_pepe/1_idle/idle/I-8.png',
        // 'img/2_character_pepe/1_idle/idle/I-9.png',
        // 'img/2_character_pepe/1_idle/idle/I-10.png',
        //TODO - Die Bilder müssen in playImages() so geladen, dass es immer bei 0 anfängt!
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor(speed) {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.width = 610 / scale / 2;
        this.height = 1200 / scale / 2;
        this.x = 1;
        this.y = canvas.height - this.height - 70;
        this.speed = speed;
        this.leftBounding = -50;

        this.walkInVal;
        this.jumpInVal;
        this.idleInVal;
        this.idleLongInVal;
        this.hurtInVal;
        this.deadInVal;

        this.enemyHitted = false;

        this.idle = true;
        this.isDead = false;

        this.walkSound = new Audio('audio/walking.mp3');
        this.walkSound.volume = 0.8;
        this.jumpSound = new Audio('audio/jump2.mp3');
        this.jumpSound.volume = 0.5;
        this.hurtSound = new Audio('audio/hurt1.mp3');
        this.hurtSound.volume = 0.5;
        this.hurtSound2 = new Audio('audio/hurt2.mp3');
        this.hurtSound2.volume = 0.5;
        this.deadSound = new Audio('audio/hurt4.mp3');
        this.deadSound.volume = 0.5;


        this.hasPlayed = false;

        this.animation();
        this.addPhysics();

    }

    update(keyboard, deltaTime) {
        this.checkAllChickens();
        if (!this.pepeDead()) {
            this.addControls(keyboard, deltaTime);
        }
        if (this.isOnGround()) {
            this.jumping = false;
            this.hasPlayed = false;
            this.currentImageJ = 0;
            this.y = canvas.height - this.height - 70;
        }

    }

    animation() {
        this.walkInVal = setInterval(() => this.walkingAnimation(), 1000 / 10);
        this.jumpInVal = setInterval(() => this.jumpingAnimation(), 1000 / 4);
        this.hurtInVal = setInterval(() => this.hurtAnimation(), 1000 / 10);
        this.idleInVal = setInterval(() => this.idleAnimation(), 1000 / 5);
        this.idleLongInVal = setInterval(() => this.deadAnimation(), 1000 / 6.3);
    }

    clearAllIntervals() {
        let allIntervals = [this.walkInVal, this.jumpInVal, this.hurtInVal, this.idleInVal, this.idleInVal];
        allIntervals.forEach(clearInterval);
    }

    playImages(images) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage == images.length) {
            this.currentImage = 0;
        }
    }

    idleAnimation() {
        if (!this.jumping && !this.isHurt() && !this.isHurtByTumbleweed() && !this.pepeDead() && this.idle) {
            this.playImages(this.IMAGES_IDLE);
        }
    }

    walkingAnimation() {
        this.walkSound.pause();
        if (!this.idle && !this.jumping && !this.isHurt() && !this.isHurtByTumbleweed() && !this.pepeDead()) {
            this.walkSound.play();
            this.playImages(this.IMAGES_WALK);
        }
    }

    jumpingAnimation() {
        if (this.jumping && !this.isHurt() && !this.isHurtByTumbleweed() && !this.pepeDead()) {
            if (this.isOnGround()) {
                this.currentImage = 0;
            }
            this.playImages(this.IMAGES_JUMP);
        }
    }

    hurtAnimation() {
        if ((this.isHurt() || this.isHurtByTumbleweed()) && !this.isDead) {
            this.currentImage = 0; //TODO - Sollte nur einmal ausgeführt werden
            this.playImages(this.IMAGES_HURT);
        }
    }

    deadAnimation() {
        if (this.pepeDead() && !this.isDead) {
            this.jump();

            let path = this.IMAGES_DEAD[this.currentImageD];
            this.img = this.imageCache[path];
            this.currentImageD++;
            if (this.currentImageD == this.IMAGES_DEAD.length) {
                this.currentImageD = 0;
                this.isDead = true;
                this.deadSound.play();
                this.clearAllIntervals();
                //TODO - DeadSound muss anfang des Intervals sein und ein einziges mal abspielen!
                //TODO - Andere stelle für clearInterval und Sound finden!
            }
        }
    }

    triggerJumpSound() {
        this.hasPlayed = true;
    }

    jump() {
        if (!this.isAboveGround()) {
            if (this.hasPlayed === false) {
                if (!this.pepeDead()) {
                    this.jumpSound.play()
                }
                this.triggerJumpSound();
            }
            this.speedY = 30;
            this.jumping = true;
        }
    }

    checkAllChickens() {
        let allChickens = world.enemies.map(obj => this.jumpOnChicken(obj));
    }

    isHurt() {
        let result = world.enemies.map(obj => this.checkCollision(obj));
        if (result.includes(true) && !this.jumping) {
            this.hit(5);
            this.randomizeHurtSound();
        }
        return result.includes(true);
    }

    isHurtByTumbleweed() {
        let result = world.tumbleweeds.map(obj => this.checkCollision(obj));
        if (result.includes(true)) {
            this.hit(2);
            this.randomizeHurtSound();
        }
        return result.includes(true);
    }

    randomizeHurtSound() {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            this.hurtSound.play();
        } else this.hurtSound2.play();
    }

    jumpOnChicken(chicken) {
        if (this.checkCollision(chicken) && this.jumping && this.speedY < 0 && !this.pepeDead()) {
            chicken.clearAllIntervals();
            chicken.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
            chicken.speed = 0;
            setTimeout(() => {
                chicken.x = -300;
                chicken.y = -300;
            }, 500);
            this.speedY = 25;
        }
    }

    pepeDead() {
        return this.energy <= 0;
    }

    addControls(keyboard, deltaTime) {
        if (keyboard.RIGHT) {
            this.moveCamera();
            this.idle = false;
            this.flipImage = false;
            if (this.isInLevel("right")) {
                this.moveRight(this.speed * deltaTime);
            }
        }
        if (!keyboard.RIGHT && !keyboard.LEFT && !keyboard.jump) {
            this.idle = true; //TODO - Sollte auch auf  true gesetzt werden, wenn nichts passiert
        }

        if (keyboard.LEFT) {
            this.moveCamera();
            this.idle = false;
            this.flipImage = true;
            if (this.isInLevel("left")) {
                this.moveLeft(this.speed * deltaTime);
            }
        }

        if (keyboard.JUMP) {
            this.jump();

        }
        if (keyboard.EXTRA) {
            this.x = 5500;

        }
    }

    isInLevel(side) {
        switch (side) {
            case "left":
                if (this.x > this.leftBounding) {
                    return true;
                } else return false;
            case "right":
                if (this.x < world.end + 800) {
                    return true;
                } else return false;
            default:
                break;
        }
    }

    moveCamera() {
        if (this.x > 200 && this.x < world.end && !world.boss.trigger) {
            world.camera_x = -this.x + 200;
        }
    }
}