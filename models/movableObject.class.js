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

    // CHAT GPT Vorschlag // NOTE GRAD NICHT SICHER OB ES BENUTZT WIRD

    audio = new Audio("audio/tumbleweed3.mp3");
    audioRadius = 800;

    calculateDistance(character) {
        const dx = this.x - character.x;
        const dy = this.y - character.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // check if the object is within the audio radius of the character
    isWithinAudioRadius(character) {
        const distance = this.calculateDistance(character);
        return distance <= this.audioRadius;
    }

    // play the audio if the object is within the audio radius of the character
    playAudioIfNearby(character) {
        if (this.isWithinAudioRadius(character)) {

            this.audio.volume = 0.2;
            this.audio.play();
        }
    }

    // Oben CHAT GPT Vorschlag

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

    moveLeft(speed) {
        this.x -= speed;
    }

    moveRight(speed) {
        this.x += speed;
    }
}