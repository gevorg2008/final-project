var matrix;
var socket = io()
var gr_btn = document.getElementById("grass_btn")

function setup() {
    let side = 30;

    socket.on("data", drawGame)

    function drawGame(data) {
        matrix = data.matrix
        createCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
        background("#8a8a8a")
        for (let i = 0; i < matrix.length; i++) {
            for (let m = 0; m < matrix.length; m++) {
                if (matrix[i][m] == 0) {
                    fill("white")
                }
                else if(matrix[i][m] == 1){
                    fill("green")
                }
                rect(m * side, i * side, side, side)
            }
        }
    }
}


function createGrass(){
    socket.emit("createGrass")
}

function kill(){
    socket.emit("kill")
}