class Chicken extends MovableObject {
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];




    constructor(speed) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.width = 248 / scale / 2;
        this.height = 243 / scale / 2;
        this.x = 100 + Math.random() * (canvas.width * 4 - 100);
        this.y = canvas.height - this.height / 0.5;
        this.speed = speed;
        this.dead = false;

        this.testInv;

        this.IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        this.deadSound = new Audio('audio/chickenHurt2.mp3');
        this.deadSound.volume = 0.3;

        this.animation();
    }

    update(deltaTime) {
        this.moveLeft(this.speed * deltaTime);
    }

    animation() {
        this.testInv = setInterval(() => {
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 1000 / 10)
    }

    clearAllIntervals() {
        let allIntervals = [this.testInv];
        allIntervals.forEach(clearInterval);
    }

}