class MovableObject {
    x;
    y;
    width = 610 / scale;
    height = 1200 / scale;
    img;
    imageCache = {};
    currentImage = 0;

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
        console.log("<-");
    }

    moveRight() {
        console.log("->");
    }
}