var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

let PORT = process.env.PORT || 3000;

app.use(express.static("."));
app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000);

matrix = [];

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
WaterArr = [];
IceArr = [];

wheater = "winter";

function cheangeWheat() {
  if (wheater == "winter") {
    wheater = "spring";
  } else if (wheater == "spring") {
    wheater = "summer";
  } else if (wheater == "summer") {
    wheater = "autumn";
  } else if (wheater == "autumn") {
    wheater = "winter";
  }
  io.sockets.emit("wheater", wheater);
}

setInterval(cheangeWheat, 5000);

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
 Water = require("./modules/Water.js");

function createMatrix() {
  for (let i = 0; i < 30; i++) {
    matrix[i] = [];
    for (let m = 0; m < 30; m++) {
      matrix[i][m] = 0;
    }
  }
}

io.on("connection", function (socket) {
  socket.on("createGrass", createGrass);
  socket.on("createGrassEater", createGrassEater);
  socket.on("createPredator", createPredator);
  socket.on("createWater", createWater);
  socket.on("kill", kill);
});

createMatrix();

function createGrass() {
  let x = Math.floor(Math.random() * 30);
  let y = Math.floor(Math.random() * 30);
  if (matrix[x][y] == 0) {
    console.log(x, y);
    let gr = new Grass(x, y);
    grassArr.push(gr);
    matrix[y][x] = 1;
  } else {
    createGrass();
  }
}
function createWater() {
  let x = Math.floor(Math.random() * 30);
  let y = Math.floor(Math.random() * 30);
  if (matrix[x][y] == 0) {
    console.log(x, y);
    let gr = new Water(x, y);
    WaterArr.push(gr);
    matrix[y][x] = 5;
  } else {
    createWater();
  }
}
function createGrassEater() {
  let x = Math.floor(Math.random() * 30);
  let y = Math.floor(Math.random() * 30);
  if (matrix[x][y] == 0 || matrix[x][y] == 1) {
    console.log(x, y);
    let gr = new GrassEater(x, y);
    grassEaterArr.push(gr);
    matrix[y][x] = 2;
  } else {
    createGrassEater();
  }
}
function createPredator() {
  let x = Math.floor(Math.random() * 30);
  let y = Math.floor(Math.random() * 30);
  if (matrix[x][y] == 0 || matrix[x][y] == 1 || matrix[x][y] == 2) {
    console.log(x, y);
    let gr = new Predator(x, y);
    PredatorArr.push(gr);
    matrix[y][x] = 3;
  }
}

function kill() {
  grassArr = [];
  grassEaterArr = [];
  PredatorArr = [];
  createMatrix();
}

function game() {
  if (grassArr[0] != undefined) {
    for (let i in grassArr) {
      grassArr[i].mul();
    }
  }
  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (let i in WaterArr) {
    WaterArr[i].everyTime();
  }
  for (let i in IceArr) {
    IceArr[i].everyTime();
  }
  for (let i in PredatorArr) {
    PredatorArr[i].eat();
  }

  let sendData = {
    matrix: matrix,
  };

  io.sockets.emit("data", sendData);
}

var statistics = {};

setInterval(function () {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {});
}, 1000);

setInterval(game, 1000);
