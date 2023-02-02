class Tumbleweed extends MovableObject {

    constructor(speed) {
        super().loadImage('img/tumbleweed.png');
        this.x = Math.random() * canvas.width * 4;
        this.y = Math.random() * 100 - 120;
        this.width = 1920 / scale;
        this.height = 1080 / scale;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
        this.checkOutOfLevel();
        this.addPhysics();
    }

    checkOutOfLevel() {
        if (this.x + this.width < 0) {
            this.x = canvas.width * 4;
        }
    }
}