class MovableObject {
    x;
    y;
    width = 610 / scale;
    height = 1200 / scale;
    img;
    speed;
    imageCache = {};
    currentImage = 0;
    flipImage = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageCache) {
        imageCache.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
}