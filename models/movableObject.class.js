class MovableObject {
    x = 120;
    y = 220;
    width = 610 / scale;
    height = 1200 / scale;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft() {
        console.log("<-");
    }

    moveRight() {
        console.log("->");
    }
}