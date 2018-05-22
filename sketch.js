// CODERDOJO - QWERTY warriors [MINI = 48 lines of code]
// 
var heroImg, ninjaImg, enemies, words, word = '';

function preload() {
  heroImg = loadImage('assets/samurai.png');
  ninjaImg = loadImage('assets/ninja.png');
  words = loadStrings('assets/3letter.txt');
  //words = ['a','b','c'];
}

function Ninja(word) {
  this.pos = p5.Vector.random2D().setMag(random(width/2,width));
  this.vel = p5.Vector.sub(createVector(0,0),this.pos).setMag(random(0.05,0.2));
  this.word = word;
  this.move  = function() {
    this.pos.add(this.vel);
    image(ninjaImg,this.pos.x,this.pos.y,40,40);
    text(this.word,this.pos.x - textWidth(this.word)/2,this.pos.y - 20);
    return this;
  };
}

function keyPressed(event) {
  word = event.key == "Enter" ? '' : word += event.key;
}

function setup() {
  createCanvas(600,600);
  enemies = new Array(10).fill().map(x => new Ninja(random(words)));
  imageMode(CENTER);
  noStroke();
}

function draw() {
  background(203);
  translate(width/2,height/2);
  var new_enemies = enemies.filter(x => x.word !== word).map(x => x.move());
  word = new_enemies.length != enemies.length ? '' : word; 
  enemies = new_enemies;
  if (enemies.reduce((tot,cur) => {return min(dist(0,0,cur.pos.x,cur.pos.y),tot);},10) < 10) {
    noLoop();
    text('You loose!',-textWidth('You loose!')/2,-50);
  } else if (enemies.length === 0) {
    noLoop();
    text('You win!',-textWidth('You win!')/2,-50);
  }
  image(heroImg,0,0,50,50);
  text(word,-textWidth(word)/2,25);
  text(enemies.length,-width/2,-height/2+10);
}
