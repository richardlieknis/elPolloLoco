class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/5_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/6_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/7_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/8_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.width = 100;
        this.height = 100;

        this.test = true;

        this.animation();
        this.throw(x, y);
    }

    animation() {
        setInterval(() => {
            if (this.test) {
                let path = this.IMAGES_THROW[this.currentImageB];
                this.img = this.imageCache[path];
                this.currentImageB++;
                if (this.currentImageB == this.IMAGES_THROW.length) {
                    this.currentImageB = 0;
                }
            }
        }, 1000 / 10);
    }

    throw (x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 40;

        this.addPhysics();
        setInterval(() => this.x += 10, 25);
    }

    update() {
        //
    }
}