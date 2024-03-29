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
    currentImageI = 0;
    currentImageIL = 0;
    flipImage = false;
    jumping = false;
    offsetY = 0;
    energy = 100;
    intervalId;

    audio = new Audio("audio/tumbleweed3.mp3");
    audioRadius = 800;
    breakSound = new Audio("audio/bottleBreak.mp3");

    calculateDistance(character) {
        const dx = this.x - character.x;
        const dy = this.y - character.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isWithinAudioRadius(character) {
        const distance = this.calculateDistance(character);
        return distance <= this.audioRadius;
    }

    playAudioIfNearby(character) {
        if (this.isWithinAudioRadius(character)) {
            this.audio.volume = 0.2;
            this.audio.play();
        }
    }

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

    startInterval(images) {
        this.currentImage = 0;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == images.length) {
                this.currentImage = 0;
            }
        }, 1000 / 5)
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();

    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    addCollisionRect() {
        if (this instanceof Character || this instanceof Chicken || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 30, this.y + 180, this.width - 70, this.height - 190);
            ctx.stroke();
        }
    }

    checkCollision(obj) {
        if (this instanceof Character) {
            return (this.x + 30 + this.width - 70) >= (obj.x + 30) &&
                (this.x + 30) <= (obj.x + 30 + obj.width - 70) &&
                (this.y + 180 + this.height - 190) >= obj.y &&
                (this.y + 180) <= (obj.y + obj.height)
        } else if (this instanceof ThrowableObject) {
            return (this.x + 30 + this.width - 70) >= (obj.x + 30) &&
                (this.x + 30) <= (obj.x + 30 + obj.width - 70) &&
                (this.y + this.height) >= obj.y &&
                (this.y) <= (obj.y + obj.height)
        }
    }

    addPhysics() {
        setInterval(() => {
            if ((this.isAboveGround() || this.speedY > 0) && !this.splashed) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < canvas.height - this.height - 70;
        }
    }

    isOnGround() {
        return (this.speedY <= -29)
    }

    moveLeft(speed) {
        if (this instanceof Chicken && world.char.x != 1) {
            this.x -= speed;
        }

        if (this instanceof Character || this instanceof Boss) {
            this.x -= speed
        }
    }

    moveRight(speed) {
        this.x += speed;
    }
}