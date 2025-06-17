let trator;

let cidadeX;

let obstaculos = [];

function setup() {

  createCanvas(800, 400);

  trator = new Trator();

  cidadeX = width - 100;

  // Criar obstáculos aleatórios

  for (let i = 0; i < 5; i++) {

    obstaculos.push(new Obstaculo(random(200, cidadeX - 50), random(50, height - 50)));

  }

}

function draw() {

  background(135, 206, 235); // céu

  // Campo e cidade

  fill(34, 139, 34);

  rect(0, 0, width / 3, height); // campo

  fill(169, 169, 169);

  rect((2 * width) / 3, 0, width / 3, height); // cidade

  fill(255);

  textSize(20);

  text("CAMPO", 20, 30);

  text("CIDADE", cidadeX, 30);

  trator.mostrar();

  trator.mover();

  for (let obs of obstaculos) {

    obs.mostrar();

    if (trator.colidiu(obs)) {

      trator.resetar();

    }

  }

  if (trator.pos.x > cidadeX) {

    fill(0);

    textSize(32);

    text("Entrega feita!", width / 2 - 100, height / 2);

    noLoop();

  }

}

function keyPressed() {

  if (keyCode === LEFT_ARROW) trator.direcao(-1, 0);

  else if (keyCode === RIGHT_ARROW) trator.direcao(1, 0);

  else if (keyCode === UP_ARROW) trator.direcao(0, -1);

  else if (keyCode === DOWN_ARROW) trator.direcao(0, 1);

}

class Trator {

  constructor() {

    this.pos = createVector(50, height / 2);

    this.vel = createVector(0, 0);

    this.tam = 30;

  }

  mostrar() {

    fill(255, 0, 0);

    rect(this.pos.x, this.pos.y, this.tam, this.tam);

  }

  mover() {

    this.pos.add(this.vel);

    this.vel.mult(0.9); // desaceleração

    this.pos.x = constrain(this.pos.x, 0, width - this.tam);

    this.pos.y = constrain(this.pos.y, 0, height - this.tam);

  }

  direcao(x, y) {

    this.vel.x = x * 5;

    this.vel.y = y * 5;

  }

  colidiu(obs) {

    return (

      this.pos.x < obs.x + obs.size &&

      this.pos.x + this.tam > obs.x &&

      this.pos.y < obs.y + obs.size &&

      this.pos.y + this.tam > obs.y

    );

  }

  resetar() {

    this.pos = createVector(50, height / 2);

    this.vel = createVector(0, 0);

  }

}

class Obstaculo {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.size = 30;

  }

  mostrar() {

    fill(80);

    rect(this.x, this.y, this.size, this.size);

  }

}

  