class MovableObject {
    x;
    y;
    width;
    height;
    img;
    speed;
    speedY = 0;
    acceleration = 2.5;
    imageCache = {};
    currentImage = 0;
    currentImageJ = 0;
    currentImageH = 0;
    currentImageD = 0;
    currentImageB = 0;
    flipImage = false;
    jumping = false;
    offsetY = 0;
    energy = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageCache) {
        imageCache.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    addCollisionRect() {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 30, this.y, this.width - 70, this.height);
            ctx.stroke();
        }
    }

    checkCollision(obj) {
        return (this.x + 30 + this.width - 70) >= (obj.x + 30) &&
            (this.x + 30) <= (obj.x + 30 + obj.width - 70) &&
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height)
    }


    addPhysics() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        // if (this instanceof ThrowableObject) {
        //     return true;
        // } else {
        return this.y < canvas.height - this.height - 70;
        //}
    }

    isOnGround() {
        return (this.speedY <= -30)
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
}