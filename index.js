var matrix;
var socket = io();
var gr_btn = document.getElementById("grass_btn");
var wheater = "";

function setup() {
  let side = 30;

  socket.on("data", drawGame);

  socket.on("wheater", function (data) {
    wheater = data;
  });

  function drawGame(data) {
    console.log(data);
    matrix = data.matrix;
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background("#8a8a8a");
    for (let i = 0; i < matrix.length; i++) {
      for (let m = 0; m < matrix.length; m++) {
        if (matrix[i][m] == 0) {
          fill("#bababa");
        } else if (matrix[i][m] == 1) {
          if (wheater == "winter") {
            fill("white");
          } else if (wheater == "spring") {
            fill("#91ff00");
          } else if (wheater == "summer") {
            fill("green");
          } else if (wheater == "autumn") {
            fill("#def25c");
          }
        } else if (matrix[i][m] == 2) {
          fill("yellow");
        } else if (matrix[i][m] == 3) {
          fill("red");
        } else if (matrix[i][m] == 5) {
          fill("blue");
        } else if (matrix[i][m] == 6) {
          fill("#9dc7fa");
        } else if (matrix[i][m] == 7) {
          fill("#ff6666");
        } else if (matrix[i][m] == 4) {
          fill("black");
        }else if (matrix[i][m] == 8) {
          fill("#f8ff91")
        }
        else if (matrix[i][m] == 9) {
          fill("purple")
        }
        rect(m * side, i * side, side, side);
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let m = 0; m < matrix.length; m++) {
        if (matrix[i][m] == 8) {
          setTimeout(() => {
            matrix[i][m] = 0;
          }, 2000);
        }
      }
    }
  }
}

function createGrass() {
  socket.emit("createGrass");
}
function createVirus() {
  socket.emit("createVirus");
}
function createGrassEater() {
  socket.emit("createGrassEater");
}
function createPredator() {
  socket.emit("createPredator");
}
function createWater() {
  socket.emit("createWater");
}

function Lightning() {
  socket.emit("createLigthing");
}
function createBomb() {
  socket.emit("createBomb");
}

function kill() {
  socket.emit("kill");
}
