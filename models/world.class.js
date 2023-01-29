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
        new Cloud(0.3),
        new Cloud(0.5),
    ]

    bgObjDesert = [
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', canvas.width * 2 - 1, 0),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width * 3 - 1, 0),
    ]

    bgObjParallax = [
        new backgroundObject('img/5_background/layers/air.png', 0, -1),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0, -0.3),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0, -0.15),
    ]

    bgObjParallax2 = [
        new backgroundObject('img/5_background/layers/air.png', 0, -1),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 0, -0.3),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 0, -0.15),
    ]

    statusObjects = [
        new Energy(30),
        new Wrap(200),
        new Bottle(350),
        new BossEnergy(),
    ];

    bottles = [];



    constructor(keyboard) {
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.end = canvas.width * 3;
        this.world = this;

        this.ambientSound = new Audio("audio/desert.wav");
        this.ambientSound.play();
        this.ambientSound.volume = 0.2;
        this.ambientSound.loop = true;
        this.ambientSound.autoplay = true;

    }

    draw() {
        ctx.translate(this.camera_x, 0);
        this.drawParallaxBg(this.bgObjParallax, 0);
        this.drawParallaxBg(this.bgObjParallax2, canvas.width - 1);
        this.drawParallaxBg(this.bgObjParallax, canvas.width * 2 - 1);
        this.drawParallaxBg(this.bgObjParallax2, canvas.width * 3 - 1);
        this.addObjectsToWorld(this.bgObjDesert);
        this.addObjectsToWorld(this.clouds);
        this.addObjectToWorld(this.char);
        this.addObjectsToWorld(this.enemies);
        this.addObjectsToWorld(this.bottles);

        ctx.translate(-this.camera_x, 0);
    }

    drawStatus() {
        this.addObjectsToWorld(this.statusObjects);
    }

    drawParallaxBg(objects, offset) {
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            let speed = obj.parallaxSpeed;
            obj.x = (this.camera_x * speed) + offset;
            this.addObjectToWorld(obj);
        }
    }

    update() {
        this.draw();
        this.drawStatus();
        this.char.update(this.keyboard);
        this.clouds.forEach(obj => {
            obj.update();
        });
        this.enemies.forEach(obj => {
            obj.update();
        });
        this.statusObjects.forEach(obj => {
            obj.update();
        });

        this.checkThrowObjects();

    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.char.x + 90, this.char.y + 180);
            this.bottles.push(bottle);
        }
    }

    addObjectsToWorld(objects) {
        objects.forEach(obj => {
            this.addObjectToWorld(obj);
        });
    }

    addObjectToWorld(object) {
        //object.addCollisionRect();

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