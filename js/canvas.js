const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 5;

canvas.width = 720;
canvas.height = 480;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}