class BossEnergy extends StatusObject {
    constructor(x) {
        super().loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.x = canvas.width - 200;
        this.amount = 100;
        this.visible = false;
    }
}