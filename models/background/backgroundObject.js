class backgroundObject extends MovableObject {
    constructor(imagePath, x, parallaxSpeed) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = 1920 / scale;
        this.height = 1080 / scale;
        this.parallaxSpeed = parallaxSpeed;
    }


    update() {

    }
}