class Tumbleweed extends MovableObject {

    constructor(x, speed) {
        super().loadImage('img/tumbleweed.png');
        // this.x = Math.random() * canvas.width * 4;
        this.x = x;
        this.y = canvas.height - 250;
        this.width = 952 / scale / 5;
        this.height = 839 / scale / 5;
        this.speed = speed;
        this.rotation = 1;
        this.groundY = canvas.height - this.height + 20;
        this.velocity = 0;
        this.gravity = 0.1;
        this.tumbleweed = true;
    }

    update(deltaTime) {

        this.x -= this.speed * deltaTime;
        this.checkOutOfLevel();
        this.addTumbleweedPhysics();
        this.rotation -= 0.03;
    }

    reset() {
        let randomTime = Math.floor(Math.random() * 5 + 1);

        setTimeout(() => {
            this.x = canvas.width * 6;
            this.y = canvas.height - 250;
            this.velocity = 0;
            this.rotation = 1;
            this.addTumbleweedPhysics();
            this.speed = Math.floor(Math.random() * 6 + 14);
        }, randomTime * 1000)


    }



    checkOutOfLevel() {
        if (this.x + this.width < 0) {
            this.reset();
        }
    }

    addTumbleweedPhysics() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y + this.height >= this.groundY) {
            this.velocity = -this.velocity * 1.03;
            this.y = this.groundY - this.height;
            this.playAudioIfNearby(world.char);
        }
    }
}