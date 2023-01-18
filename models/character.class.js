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
        //'img/2_character_pepe/3_jump/J-31.png',
        //'img/2_character_pepe/3_jump/J-32.png',
        //'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        //'img/2_character_pepe/3_jump/J-37.png',
        //'img/2_character_pepe/3_jump/J-38.png',
        //'img/2_character_pepe/3_jump/J-39.png',
    ]

    constructor(speed) {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
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
        this.jumpSound.loop = false;
        this.hasPlayed = false;

        this.animation();
        this.addPhysics();

    }

    update(keyboard) {
        this.addControls(keyboard);
        if (this.isOnGround()) {
            this.jumping = false;
            this.hasPlayed = false;
            this.currentImageJ = 0;
            if (this.idle) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }

    }

    animation() {
        // WALKING Animation
        setInterval(() => {
            this.walkSound.pause();
            if (!this.idle && !this.jumping) {
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
            if (this.jumping) {
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

    }

    triggerJumpSound() {
        this.hasPlayed = true;
        this.jumpSound.play();
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