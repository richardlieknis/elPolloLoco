class backgroundObject extends MovableObject {
    constructor() {
        super().loadImage('img/5_background/layers/1_first_layer/1.png');
        this.x = 0;
        this.y = 74;
        this.width = 1920 / scale * 1.88;
        this.height = 1080 / scale * 1.88;
    }
}