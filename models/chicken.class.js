class Chicken extends MovableObject {
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 100 + Math.random() * (canvas.width - 100);
        this.y = canvas.height - this.height / 8;
        this.width = 248 / scale / 2;
        this.height = 243 / scale / 2;
    }
}