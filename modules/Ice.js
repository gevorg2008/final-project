module.exports = class Ice{
  constructor(x, y){
    this.x = x
    this.y = y
  }
  everyTime(){
    if(wheater != "winter"){
      this.die()
      matrix[this.y][this.x] = 5
      let wat = new Water(this.x, this.y)
      WaterArr.push(wat)
    }
  }
  die(){
    matrix[this.y][this.x] == 0
    for (let i in IceArr) {
      if (IceArr[i].x == this.x && IceArr[i].y == this.y) {
        IceArr.splice(i, 1);
      }
    }
  }
}
