var LiveForm = require("./LivingForm");

module.exports = class Grass extends LiveForm {
  mul() {
    this.multiply++;
    let emptyCell = super.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell && this.multiply >= 3) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let grass = new Grass(x, y);
      grassArr.push(grass);
      this.multiply = 0;
    }
  }
};
