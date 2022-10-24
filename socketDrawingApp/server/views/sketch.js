let socket;
const paths = [];
let currentPath = [];

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

function socketHandler(){
    socket = io.connect('http://localhost:3000');

    socket.on('mouse', (path) => {
        beginShape();
        for(const point of path){
            stroke(point.color);
            strokeWeight(point.xSize - point.ySize + 4);
            vertex(point.x, point.y);
        }
        endShape();
    })

    socket.on('clear', () =>{
        clearLocalCanvas();
    });
}

function setup() {
    generateCanvas();
    generateDefaultValuesDOM();
    socketHandler();
}

function mousePressed() {
    currentPath = [];
    paths.push(currentPath)
}

function draw() {
    noFill()
    if(mouseIsPressed){
        const userColor = document.getElementById('userColor').value;
        const xSize = document.getElementById('userPenSizeX').value;
        const ySize = document.getElementById('userPenSizeY').value;

        const elipsePoint = {
            x: mouseX,
            y: mouseY,
            xSize: xSize,
            ySize: ySize,
            color: userColor
        }
        currentPath.push(elipsePoint);
        socket.emit('mouse', currentPath)
    }
    for(const path of paths){
        beginShape();
        for(const point of path){
            stroke(point.color);
            strokeWeight(point.xSize - point.ySize + 4);
            vertex(point.x, point.y);
        }
        endShape();
    }
}

