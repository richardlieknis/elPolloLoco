class World {
    char = new Character(3);
    enemies = [
        new Chicken(0.2),
        new Chicken(0.5),
        new Chicken(1),
    ];
    clouds = [
        new Cloud(0.2),
        new Cloud(0.4),
        new Cloud(0.6),
    ]
    bgObjects = [
        new backgroundObject('img/5_background/layers/air.png'),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png'),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png'),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png'),
    ];



    constructor(keyboard) {
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.world = this;

    }

    draw() {
        ctx.translate(this.camera_x, 0);
        this.addObjectsToWorld(this.bgObjects);
        this.addObjectsToWorld(this.clouds);
        this.addObjectToWorld(this.char);
        this.addObjectsToWorld(this.enemies);
        ctx.translate(-this.camera_x, 0);
    }

    update() {
        this.draw();
        this.char.update(this.keyboard);
        this.clouds.forEach(obj => {
            obj.update();
        });
        this.enemies.forEach(obj => {
            obj.update();
        })
    }

    addObjectsToWorld(objects) {
        objects.forEach(obj => {
            ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        });
    }

    addObjectToWorld(object) {
        if (object.flipImage) {
            ctx.save();
            ctx.translate(object.width, 0);
            ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.flipImage) {
            object.x = object.x * -1;
            ctx.restore();
        }
    }
}