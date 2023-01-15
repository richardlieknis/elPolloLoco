class Character extends MovableObject {
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.x = 0;
        this.y = canvas.height - this.height / 2;
        this.width = 610 / scale / 2;
        this.height = 1200 / scale / 2;
    }
    jump() {

    }
}