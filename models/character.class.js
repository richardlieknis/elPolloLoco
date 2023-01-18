class Character extends MovableObject {
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    constructor(speed) {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.width = 610 / scale / 2;
        this.height = 1200 / scale / 2;
        this.x = 1;
        this.y = canvas.height - this.height / 0.85 - 300;
        this.speed = speed;

        this.idle = true;

        this.walkSound = new Audio('audio/walking.mp3');
        this.walkSound.volume = 0.8;
        this.jumpSound = new Audio('audio/jump2.mp3');
        this.jumpSound.volume = 0.5;
        this.hurtSound = new Audio('audio/hurt1.mp3');
        this.hurtSound.volume = 0.5;
        this.hasPlayed = false;

        this.animation();
        this.addPhysics();

    }

    update(keyboard) {
        //console.log(this.isHurt());
        this.addControls(keyboard);
        if (this.isOnGround()) {
            this.jumping = false;
            this.hasPlayed = false;
            this.currentImageJ = 0;
            if (this.idle && !this.isHurt()) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }

    }

    animation() {
        // WALKING Animation
        setInterval(() => {
            this.walkSound.pause();
            if (!this.idle && !this.jumping && !this.isHurt()) {
                this.walkSound.play();

                let path = this.IMAGES_WALK[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
                if (this.currentImage == this.IMAGES_WALK.length) {
                    this.currentImage = 0;
                }
            }
        }, 1000 / 10);

        // JUMPING Animation
        setInterval(() => {
            if (this.jumping && !this.isHurt()) {
                if (this.isOnGround()) {
                    this.currentImageJ = 0;
                }

                let path = this.IMAGES_JUMP[this.currentImageJ];
                this.img = this.imageCache[path];
                this.currentImageJ++;
                if (this.currentImageJ == this.IMAGES_JUMP.length) {
                    this.currentImageJ = 0;
                }
            }
        }, 1000 / 4);

        // HURT Animation

        setInterval(() => {
            if (this.isHurt()) {
                this.hurtSound.play();
                let path = this.IMAGES_HURT[this.currentImageH];
                this.img = this.imageCache[path];
                this.currentImageH++;
                if (this.currentImageH == this.IMAGES_HURT.length) {
                    this.currentImageH = 0;
                }
            }
        }, 1000 / 10);

    }

    triggerJumpSound() {
        this.hasPlayed = true;
    }

    jump() {
        if (!this.isAboveGround()) {
            if (this.hasPlayed === false) {
                this.triggerJumpSound();
            }
            this.speedY = 30;
            this.jumping = true;
        }
    }

    isHurt() {
        let results = world.enemies.map(obj => this.checkCollision(obj));
        return results.includes(true);
    }



    addControls(keyboard) {
        if (keyboard.RIGHT) {
            this.moveCamera();
            this.idle = false;
            this.flipImage = false;
            if (this.isInLevel("right")) {
                this.moveRight(this.speed);
            }
        }
        if (!keyboard.RIGHT) {
            this.idle = true;
        }

        if (keyboard.LEFT) {
            this.moveCamera();
            this.idle = false;
            this.flipImage = true;
            if (this.isInLevel("left")) {
                this.moveLeft(this.speed);
            }
        }

        if (keyboard.JUMP) {
            this.jump();

        }
    }

    isInLevel(side) {
        switch (side) {
            case "left":
                if (this.x > -50) {
                    return true;
                } else return false;
            case "right":
                if (this.x < world.end + 950) {
                    return true;
                } else return false;
            default:
                break;
        }
    }

    moveCamera() {
        if (this.x > 200 && this.x < world.end) {
            world.camera_x = -this.x + 200;
        }
    }
}