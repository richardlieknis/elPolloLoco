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
        new backgroundObject('img/5_background/layers/air.png', 0),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/air.png', canvas.width - 1),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', canvas.width - 1),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', canvas.width - 1),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width - 1),
    ];



    constructor(keyboard) {
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.end = 1400;
        this.world = this;

        this.ambientSound = new Audio("audio/desert.wav");
        this.ambientSound.play();
        this.ambientSound.volume = 0.2;
        this.ambientSound.loop = true;
        this.ambientSound.autoplay = true;

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
            this.addObjectToWorld(obj);
        });
    }

    addObjectToWorld(object) {
        object.addCollisionRect();

        if (object.flipImage) {
            ctx.save();
            ctx.translate(object.width, 0);
            ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        object.draw();
        if (object.flipImage) {
            object.x = object.x * -1;
            ctx.restore();
        }
    }
}