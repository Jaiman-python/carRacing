var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var cars, car1, car2, car3, car4;
var track_img, ground_img, car1_img, car2_img, car3_img, car4_img;

function preload(){
  car1_img = loadImage("../sprites/car1.png");
  car2_img = loadImage("../sprites/car2.png");
  car3_img = loadImage("../sprites/car3.png");
  car4_img = loadImage("../sprites/car4.png");

  track_img = loadImage("../sprites/track.jpg");

  ground_img = loadImage("../sprites/ground.png");
}
function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-50);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
