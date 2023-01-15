class World {
    char = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    draw() {
        ctx.drawImage(this.char.img, this.char.x, this.char.y, this.char.width, this.char.height);
    }

    update() {
        this.draw();
    }
}