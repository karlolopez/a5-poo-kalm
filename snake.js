function Snake(isSecond) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.direction = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (i = 1; i < this.tail.length-1; i++ ) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function(isMirror) {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i+1]
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scayle;
    this.y = this.y + this.yspeed*scayle;  
    this.x = constrain(this.x, 0, width-scayle);
    this.y = constrain(this.y, 0, height-scayle);
    
  }

  //La función original para cuando la víbora come, verifica que la distancia de la comida a la víbora
  //sea de cero, pero hace falta crear una función que FORCE la acción de comer para la segunda víbora

  this.forceEat = function(){
    this.total ++;
  }


  this.eat = function(pos) {
    var distance = dist(this.x, this.y, pos.x, pos.y);
    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    if(isSecond){
      fill(255, 204, 100);
    }else{
      fill('red');
    }
    
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scayle, scayle);
    }
    rect(this.x, this.y, scayle, scayle);
  }
}
