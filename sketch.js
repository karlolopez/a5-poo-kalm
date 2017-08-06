var snake;
var scayle = 20;

var food;

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);

  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scayle);
  var rows = floor(height/scayle);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scayle);
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();
  if (snake.eat(food)) {
    pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, scayle, scayle);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  }
}
