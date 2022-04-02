let LiveForm = require("./LivingForm");

module.exports = class Predator extends LiveForm {
  constructor(x, y) {
    super(x, y);
    this.energy = 10;
    this.can = true;
    this.freezeTime = 0;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(ch) {
    this.getNewCoordinates();
    return super.chooseCell(ch);
  }
  mul() {
    let emptyCells = this.chooseCell(0);
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      let grassEater = new Predator(x, y);
      PredatorArr.push(grassEater);
      this.energy -= 5;
    }
  }
  eat() {
    let emptyCells3 = this.chooseCell(6);
    let newCell3 = emptyCells3[Math.floor(Math.random() * emptyCells3.length)];
    if (newCell3) {
      this.Freeze();
    }
    if (this.can == true) {
      let emptyCells = this.chooseCell(1);
      let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      let emptyCells2 = this.chooseCell(5);
      let newCell2 =
        emptyCells2[Math.floor(Math.random() * emptyCells2.length)];
      let emptyCells1 = this.chooseCell(2);
      let newCell1 =
        emptyCells1[Math.floor(Math.random() * emptyCells1.length)];
      let emptyCells4 = this.chooseCell(9);
      let newCell4 =
        emptyCells4[Math.floor(Math.random() * emptyCells4.length)];
      if (newCell4) {
        this.die()
        matrix[this.y][this.x] = 9
        let ice = new Virus(this.x, this.y)
        VirusArr.push(ice)
      }
      if (newCell2) {
        this.drinkWater();
      }

      if (newCell1) {
        this.energy++;
        let x = newCell1[0];
        let y = newCell1[1];

        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;

        for (let i in grassEaterArr) {
          if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
            grassArr.splice(i, 1);
          }
        }
        this.x = x;
        this.y = y;

        if (this.energy >= 15) {
          this.mul();
        }
      } else if (newCell) {
        this.energy++;
        let x = newCell[0];
        let y = newCell[1];

        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;

        for (let i in grassArr) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1);
          }
        }
        this.x = x;
        this.y = y;

        if (this.energy >= 15 && wheater != "winter") {
          this.mul();
        }
      } else {
        this.move();
      }
    } else {
      this.freezeTime--;
      if (this.freezeTime <= 0) {
        this.unFreeze();
      }
    }
  }
  move() {
    this.energy--;
    let emptyCells = this.chooseCell(0);
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    }
    if (this.energy < 0) {
      this.die();
    }
  }
  die() {
    matrix[this.y][this.x] = 0;

    for (let i in PredatorArr) {
      if (PredatorArr[i].x == this.x && PredatorArr[i].y == this.y) {
        PredatorArr.splice(i, 1);
      }
    }
  }
  drinkWater() {
    this.energy++;
    for (let i in WaterArr) {
      if (WaterArr[i].x == this.x && WaterArr[i].y == this.y) {
        WaterArr[i].energy--;
      }
    }
  }
  Freeze() {
    this.can = false;
    this.freezeTime = 4;
    matrix[this.y][this.x] = 7;
  }
  unFreeze() {
    this.can = true;
    matrix[this.y][this.x] = 3;
  }
};
