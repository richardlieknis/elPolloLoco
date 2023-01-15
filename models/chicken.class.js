class Chicken extends MovableObject {
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 100 + Math.random() * 500;
        this.y = 400;
        this.width = 248 / scale;
        this.height = 243 / scale;
    }
}