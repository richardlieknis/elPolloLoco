class Character extends MovableObject {
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor(speed, keyboard) {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.width = 610 / scale / 2;
        this.height = 1200 / scale / 2;
        this.x = 1;
        this.y = canvas.height - this.height / 0.85;
        this.speed = speed;
        this.keyboard = keyboard;
        this.idle = true;

        this.animation();

    }

    update(keyboard) {
        this.addControls(keyboard);

    }

    animation() {
        setInterval(() => {
            if (!this.idle) {

                let path = this.IMAGES_WALK[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
                if (this.currentImage == this.IMAGES_WALK.length) {
                    this.currentImage = 0;
                }

            }


        }, 1000 / 10)
    }

    jump() {

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
    }

    isInLevel(side) {
        switch (side) {
            case "left":
                if (this.x > -50) {
                    return true;
                } else return false;
            case "right":
                if (this.x < world.end) {
                    return true;
                } else return false;
            default:
                break;
        }
    }

    moveCamera() {
        if (this.x > 200) {
            world.camera_x = -this.x + 200;
        }
    }
}