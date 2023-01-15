const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 1;

canvas.width = 1920 / scale;
canvas.height = 1080 / scale;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}