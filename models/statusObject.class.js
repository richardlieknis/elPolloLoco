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
        ctx.font = "48px boogaloo";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.amount, this.x + 80, 90);
        ctx.strokeText(this.amount, this.x + 80, 90);
    }

    update() {
        //this.amount = world.char.energy;
    }
}