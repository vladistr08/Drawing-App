let socket;

function generateCanvas(){
    createCanvas(2125, 800);
    background(23, 32, 31);
}

function clearLocalCanvas(){
    clear();
    generateCanvas();
}

function clearGlobalCanvas(){
    socket.emit('clear');
    clearLocalCanvas();
}

function generateDefaultValuesDOM() {
    document.getElementById('userPenSizeX').value = 30;
    document.getElementById('userPenSizeY').value = 30;
    document.getElementById('userColor').value = "#e66465"
}

function setup() {
    generateCanvas();

    generateDefaultValuesDOM()

    socket = io.connect('http://localhost:3000');

    socket.on('mouse', ({x, y, xSize, ySize, color}) => {
        noStroke();
        fill(color);
        ellipse(x, y, xSize, ySize);
    })

    socket.on('clear', () =>{
            clearLocalCanvas();
    });
}

function mouseDragged() {
    const userColor = document.getElementById('userColor').value;
    const xSize = document.getElementById('userPenSizeX').value;
    const ySize = document.getElementById('userPenSizeY').value;

    const data = {
        x: mouseX,
        y: mouseY,
        xSize: xSize,
        ySize: ySize,
        color: userColor
    };

    socket.emit('mouse', data);

    noStroke();
    fill(userColor)
    ellipse(mouseX, mouseY, xSize, ySize)
}

function draw() {
}

