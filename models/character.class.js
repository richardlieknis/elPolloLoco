class Character extends MovableObject {
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.x = 0;
        this.y = canvas.height - this.height / 2;
        this.width = 610 / scale / 2;
        this.height = 1200 / scale / 2;


        this.update();
    }

    update() {
        setInterval(() => {
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 1000 / 10)


    }

    jump() {

    }
}