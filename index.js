var matrix;
var socket = io()

socket.on("data", function(data){
    matrix = data
})


function setup(){
    let side = 30;
    
    createCanvas(matrix[0].length * side, matrix.length * side)
    background("#8a8a8a")
}

function draw(){
    for(let i = 0; i < matrix.length; i++){
        for(let m = 0; m < matrix.length; m++){
            if(matrix[i][m] == 0){
                fill("white")
            }
            rect(m * side, i * side, side, side)
        }
    }
}
