class Wrap extends StatusObject {
    constructor(x, y, collectable) {
        super().loadImage('img/7_statusbars/3_icons/wrap.png');
        this.x = x;
        this.amount = 0;
        this.y = y || 30;

        this.collectable = collectable;
    }
}