class StatusObject {
    x;
    y = 30;
    width = 80;
    height = 80;
    img;
    amount;
    visible = true;
    collectable = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw() {
        ctx.save();
        if (this.visible) {
            const offsetY = Math.sin(Date.now() / 300) * 10; // Änderung des y-Offsets basierend auf der Zeit
            if (this.collectable) {
                ctx.drawImage(this.img, this.x, this.y + offsetY, this.width, this.height);
            } else if (!this.collectable) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                ctx.font = "48px boogaloo";
                ctx.fillStyle = "#fff";
                ctx.fillText(this.amount, this.x + 80, 90);
                ctx.strokeText(this.amount, this.x + 80, 90);
            }
        }
        ctx.restore();
    }

    update() {
        //this.amount = world.char.energy;
    }
}