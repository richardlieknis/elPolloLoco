class StatusObject {
    x;
    y = 30;
    width = 80;
    height = 80;
    img;
    amount;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    update() {
        //TODO - Status aktualisieren
    }
}