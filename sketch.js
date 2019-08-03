var snake;
var snake2;
var scayle = 20;

var food;

function setup() {
  
  /*
    Antes, canvas cuadrado, aburrido :(
    createCanvas(600, 600);

  */

  //Ahora, canvas del tamaño pantalla completa con un pequeño margen a los lados, arriba y abajo. Divertido :D
  createCanvas(window.innerWidth - (window.innerWidth * 0.01), window.innerHeight  - (window.innerHeight * 0.05));
  
  snake = new Snake(false);

  //Se instancia una segunda víbora, que se movera en sentido aleatorio de la original.
  snake2 = new Snake(true);

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
  //Cambiamos el color de fondo a uno más divertido
  background(255, 204, 100);
  snake.death();
  snake.update(false);
  //Lamamos la función con cambio de color
  snake.show();

  //Hace falta replicar las funciones de actualización del movimiento cada que se actualiza un frame 
  //de la animación para la segunda víbora.
  snake2.death();
  snake2.update(true);
  //Llamamos la función con cambio de color
  snake2.show();


  //Solo la primera víbora podrá comer, la que se mueve normal.
  if (snake.eat(food)) {
    pickLocation();
    //Lamamos la función creada en la otra clase para forzar a la segunda víbora a comer, y así replica el tamaño de la original 
    snake2.forceEat();
  }

  fill('#fae');
  rect(food.x, food.y, scayle, scayle);
}

//La segunda víbora se mueve en dirección aleatoria cuando el usuario teclea hacia arriba o hacia abajo
function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
    //Aleatorio de 0 a 1, si sale 0 se mueve -1 en vertical, si sale 1 se mueve 1 en vertical
    var aleatorio = Math.floor(Math.random() * 2);
    //Inline if para validar la acción de arriba
    snake2.direction(0, aleatorio != 0 ? -1 : 1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
    //Aleatorio de 0 a 1, si sale 0 se mueve 1 en vertical, si sale 1 se mueve -1 en vertical
    var aleatorio = Math.floor(Math.random() * 2);
    //Inline if para validar la acción de arriba
    snake2.direction(0, aleatorio != 0 ? 1 : -1);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
    //Aleatorio de 0 a 1, si sale 0 se mueve -1 en horizontal, si sale 1 se mueve 1 en horizontal
    var aleatorio = Math.floor(Math.random() * 2);
    //Inline if para validar la acción de arriba
    snake2.direction(aleatorio != 0 ? 1 : -1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
    //Aleatorio de 0 a 1, si sale 0 se mueve 1 en horizontal, si sale 1 se mueve -1 en horizontal
    var aleatorio = Math.floor(Math.random() * 2);
    //Inline if para validar la acción de arriba
    snake2.direction(aleatorio != 0 ? -1 : 1, 0);
  }
}
