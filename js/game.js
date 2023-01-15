let world;

function init() {
    world = new World();
    world.draw();
    gameLoop();
}

function gameLoop() {
    clearCanvas();
    world.update();
    requestAnimationFrame(gameLoop);
}