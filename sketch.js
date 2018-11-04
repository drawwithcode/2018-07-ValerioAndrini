var mic;
var happyMonster;
var angryMonster;
var monster;
var posX = 100;
var posY = 700;
var morto = false;

function preload() {
  // put preload code here
  happyMonster = loadImage("./assets/happy_monster.png");
  angryMonster = loadImage("./assets/angry_monster.png");
  player = loadImage("./assets/player.png");
  wall = loadImage("./assets/brick_wall.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background('SLATEGREY');

  imageMode(CENTER);
  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();


  text(vol, 50, 100);

  if (vol < 0.1 && morto == false) {
    monster = image(happyMonster, width / 2, height / 2, image.width, image.height);

  } else if (vol > 0.1 && vol < 0.4 && morto == false) {
    monster = image(happyMonster, width / 2, height / 2, image.width, image.height);
    posX += vol * 50;
  } else {
    monster = image(angryMonster, width / 2, height / 2 - 70, image.width, image.height);
    push();
    textSize(22);
    textAlign(CENTER);
    text("You LOST, refresh and try again!", width / 6 * 3, height / 6 * 5);
    pop();
    morte();
  }
  if (posX > 1200) {
    vittoria();
  }

  image(player, posX, posY, image.width, image.height);

  push();
  textSize(22);
  textAlign(CENTER);
  text("Escape from the monster, but don't get noticed!", width / 6 * 3, 150);
  pop();
}

function morte() {
  mic.stop();
  morto = true;
}

function vittoria() {
  mic.stop();
  push();
  textSize(22);
  textAlign(CENTER);
  text("You WON, congrats you escaped the monster!", width / 6 * 3, height / 6 * 5);
  pop();
  //text('you won', width / 2, height / 4 * 3);
}
