class World {
    char = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
    ]
    bgObjects = [
        new backgroundObject(),
    ]

    draw() {
        // Draw first Background Layer
        this.bgObjects.forEach(e => {
            ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        });

        ctx.drawImage(this.char.img, this.char.x, this.char.y, this.char.width, this.char.height);

        // Draw all Clouds
        this.clouds.forEach(e => {
            ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        })

        // Draw all Enemies
        this.enemies.forEach(e => {
            ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        });


    }

    update() {
        this.draw();
    }
}