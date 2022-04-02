module.exports = class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 0;
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
  boom() {
    this.energy++;
    if (this.energy == 10) {
      for (let i in this.directions) {
        let x = this.directions[i][0];
        let y = this.directions[i][1];
        matrix[y][x] = 0;
        for (let i in grassArr) {
          if (x == grassArr[i].x && y == grassArr[i].y) {
            grassArr.splice(i, 1);
          }
        }
        for (let i in grassEaterArr) {
          if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
          }
        }
        for (let i in PredatorArr) {
          if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
            predatorArr.splice(i, 1);
          }
        }
      }
      this.die();
    }
  }
  die() {
    for (var i in bombArr) {
      if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
        matrix[this.y][this.x] = 0;
        bombArr.splice(i, 1);
        break;
      }
    }
  }
};
