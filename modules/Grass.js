var LiveForm = require("./LivingForm");
var random = require("./random")

module.exports = class Grass extends LiveForm{
    mul(){
        this.multiply++;
        let emptyCell = super.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        console.log(newCell)


        if(newCell && this.multiply <= 8){
            let x = newCell[0]
            let y = newCell[1]
            matrix[y][x] = 1;
            let grass = new Grass(x, y)
            grassArr.push(grass)
            this.multiply = 0;
        }
    }
}