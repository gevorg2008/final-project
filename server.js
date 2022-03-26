var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)
var random = require("./modules/random.js")

app.use(express.static('.'))

var matrix = []

app.get("/", function(req, res){
    res.redirect("index.html")
})

server.listen(3000)

function createMatrix(){
    for(let i = 0; i < 30; i++){
        matrix.push([])
        for(let m = 0; m < 30; m++){
            matrix[i].push(0)
        }
    }
}

createMatrix()

function game(){
    let sendData = {
        matrix: matrix
    }

    console.log(matrix)

    io.sockets.emit("data", matrix)
}

game()