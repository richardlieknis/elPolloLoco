class Cloud extends MovableObject {
    constructor(speed) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2400;
        this.y = Math.random() * 100 - 120;
        this.width = 1920 / scale;
        this.height = 1080 / scale;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
        this.checkOutOfLevel();
    }

    checkOutOfLevel() {
        if (this.x + this.width < 0) {
            this.x = 2400;
        }
    }
}