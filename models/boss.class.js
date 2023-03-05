class Boss extends MovableObject {
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];



    constructor(speed) {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.width = 1045 / scale / 2;
        this.height = 1217 / scale / 2;
        this.x = canvas.width * 5 - 200;
        this.y = canvas.height - this.height - 50;
        this.speed = speed;
        this.dead = false;
        this.trigger = false;

        this.alerted = false;
        this.isAttacking = false;
        this.isMoving = true;

        this.prevX = null;
        this.globalAlert = false;

        this.animation();

        this.bossMusic = new Audio('audio/bossfight.wav');
        this.bossMusic.volume = 0.15;

    }

    hasXChanged() {
        if (this.prevX === null) {
            this.prevX = this.x;
            return false;
        } else if (this.prevX !== this.x) {
            this.prevX = this.x;
            return true;
        } else {
            return false;
        }
    }

    //TODO Funktions Namen unbedingt ändern. Allgemein aufräumen
    //NOTE - Wenn der Char stehen bleibt während der Boss alerted ist, werden keine Animationen abgespielt (vermutlich 2 gleichzeitige intervals)

    update(deltaTime) {
        if (world.char.x > 4800 || this.trigger) {
            this.trigger = true;
            world.char.leftBounding = 4250;
            world.statusObjects[3].visible = true;
            this.bossMusic.play();
            this.bossMovement(deltaTime);
            this.checkPositionWithChar();
            this.checkIfMoves();
            this.alertBoss();
            this.attackIfNear();
            document.getElementById("darkOverlay").classList.remove('d-none');
        }
    }

    checkIfMoves() {
        if (this.isMoving) {
            this.isAttacking = false;
            return true;
        } else return false;
    }


    checkPositionWithChar() {
        let positionDif = this.x - world.char.x;
        if (positionDif > -20 && positionDif < 20) {
            return true;
        } else return false;
    }

    attackIfNear() {
        if (!this.alerted && this.globalAlert && !this.isMoving && !this.isAttacking) {
            console.log("Hallo");
            this.isAttacking = true;
            this.startInterval(this.IMAGES_ATTACK);
        }
    }

    deadAnimation() {
        this.startInterval(this.IMAGES_DEAD);
        this.width -= 1;
        this.height -= 1;
        this.y += 1;
    }

    alertBoss() {
        if (!this.globalAlert && this.checkPositionWithChar() || !this.globalAlert && this.x <= 5100) {
            this.startInterval(this.IMAGES_ALERT);
            this.alerted = true;
            this.globalAlert = true;
            setTimeout(() => {
                this.startInterval(this.IMAGES_WALK);
                this.alerted = false;
            }, 1600)
        }
    }

    bossMovement(deltaTime) {
        let positionDif = this.x - world.char.x + 80;
        if (positionDif > 0) {
            if (positionDif > 5 && !this.alerted) {
                this.moveLeft(this.speed * deltaTime);
                this.isMoving = true;
            } else this.isMoving = false;
            this.flipImage = false;
        } else if (positionDif < 0) {
            if (positionDif < -5 && !this.alerted) {
                this.moveRight(this.speed * deltaTime);
                this.isMoving = true; // NOTE Als letztes isMoving eingefügt. Noch keine Stelle für isMoving = false! Sollte fürs WALK dienen
                //NOTE Idee - HilfsFunktionen für Position Difference machen!
            } else this.isMoving = false;
            this.flipImage = true;
        }
    }

    positionDiference(a, b) {
        let positionDif;
        let pos1 = a;
        let pos2 = b;
    }

    animation() {
        this.startInterval(this.IMAGES_WALK);
    }

}