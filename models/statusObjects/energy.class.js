class Energy extends StatusObject {
    constructor(x) {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = x;
        this.amount = 100;

    }

    update() {
        this.amount = world.char.energy;
    }
}