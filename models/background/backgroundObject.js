class backgroundObject extends MovableObject {
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
        this.width = 1920 / scale;
        this.height = 1080 / scale;
    }
}