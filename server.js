var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

matrix = []

grassArr = [];
grassEaterArr = [];

var Grass = require("./modules/Grass.js")
var GrassEater = require("./modules/GrassEater.js")

function createMatrix(){
    for(let i = 0; i < 30; i++){
        matrix[i] = [] 
        for(let m = 0; m < 30; m++){
            matrix[i][m] = 0
        }
    }
}

io.on("connection", function(socket){
    socket.on("createGrass", createGrass)
    socket.on("kill", kill)
})

createMatrix()

function createGrass(){
    let x = Math.floor(Math.random() * 30)
    let y = Math.floor(Math.random() * 30)
    if(matrix[x][y] == 0){
        console.log(x, y)
        let gr = new Grass(x, y)
        grassArr.push(gr)
        matrix[y][x] = 1
    }
}

function kill(){
    grassArr = []
    grassEaterArr = []
    createMatrix()
}

function game(){
    if(grassArr[0] != undefined){
        console.log(grassArr)
        for(let i in grassArr){
            grassArr[i].mul()
        }
    }
    
    let sendData = {
        matrix: matrix
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)