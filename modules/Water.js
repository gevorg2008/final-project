let Ice = require("./Ice")

module.exports = class Water{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.energy = 4;
  }
  everyTime(){
    if(this.energy <= 0){
      this.die()
    }
    if(wheater == "winter"){
      this.die()
      matrix[this.y][this.x] = 6
      let ice = new Ice(this.x, this.y)
      IceArr.push(ice)
    }
  }
  die(){
    matrix[this.y][this.x] = 0
    for (let i in WaterArr) {
      if (WaterArr[i].x == this.x && WaterArr[i].y == this.y) {
        WaterArr.splice(i, 1);
      }
    }
  }
}
