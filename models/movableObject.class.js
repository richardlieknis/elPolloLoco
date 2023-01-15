class MovableObject {
    x = 120;
    y = 120;
    width = 610 / 5;
    height = 1200 / 5;
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