
var database;
var gameState = 0;
var playerCount = 0;
var allPlayers
var good,bad;
var g ;
var b ;
var a ;
var player,form,game;
var player1,player2;
var players;
var basket;
var edges;
function setup() {
  createCanvas(1000,600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background("Blue");
 edges= createEdgeSprites()
 if (playerCount===2)
 {
   game.update(1);
 }
 if (gameState===1)
 {
   clear();
   game.play();
 }

 if (gameState === 2)
 {
   game.end();
 }
}