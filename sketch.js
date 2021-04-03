
var PLAY = 1;
var END = 0;
var gameState =PLAY;
var gameStage = 1;

var score = 0;

var back_img;
var bg;

var player;
var playerLeft, playerRight, playerBack;

var gost,gostImage;
var gostGroup;

var g1, g2, g3;
var starImage, star,starGroup;



function preload(){
 
  back_img = loadImage("back.png");
  gameOverImage = loadImage("images/gameOver.png")
  playerLeft = loadAnimation("images/blueLeft1.png","images/blueLeft2.png","images/blueLeft3.png","images/blueLeft4.png");
  playerRight = loadAnimation("images/blueRight1.png","images/blueRight2.png","images/blueRight3.png","images/blueRight4.png");
  playerBack = loadAnimation("images/blueBack1.png","images/blueBack2.png","images/blueBack3.png","images/blueBack4.png");
  starImage = loadImage("images/star.png");
  groundImage = loadImage("images/ground.png");
  gostImage = loadImage("gost.png");

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg.addImage(back_img);
  bg.x = bg.width/2;
  bg.scale = 1;
  bg.velocityX = -5;

  player = createSprite(100,windowHeight-200,20,20);
  player.addAnimation("right",playerRight);
  player.scale = 0.6;

  iground = createSprite(windowHeight/2,windowHeight-80,3500,10);
  iground.visible = false;

  gostGroup = new Group();
  starGroup = new Group();

}

function draw() {

  background("white");

  if(gameState = PLAY){
    
    if(bg.x < 0 ){
      bg.x = bg.width/2;  
  }

  player.collide(iground);

  if(keyDown("space")){
    player.velocityY = -13;
  }
  player.velocityY = player.velocityY + 0.5;
  
  spawnGost()
  spawnStar();

 // player.collide(groundGroup);

  for (var k = 0; k < starGroup.length; k++) {
    if (starGroup.contains(starGroup.get(k))) {
      if (player.isTouching(starGroup.get(k))) {
            starGroup.get(k).destroy(); 
            score=score+1;         
      }
    }
  }
  player.collide(gostGroup);
  if(gostGroup.collide(player)){
      gameState = END;
  }
  if(player.x<80){
    gameState = END;
  }

  }else if(gameState = END){
    bg.addImage(gameOverImage);
    bg.velocityX = 0;
    ground.velocityX = 0;
    player.destroy();
    starGroup.velocityX = 0;
    
    stroke(3000);
    fill("red");
    textSize(40);
    text("GAME OVER",120,200);
  }
  drawSprites();

  textSize(30);
  fill("white");
  text("Score = "+score,windowWidth-200,windowHeight-500);

  if(gameState = END){
    fill("red");
    textSize(40);
    text("GAME OVER",120,200);
  }
}

function spawnGost(){

  if(frameCount%100===0){
    gost = createSprite(windowWidth+50,Math.round(random(100,700)));
    gost.velocityX = -7;
    gost.addImage(gostImage);
    gost.scale = 0.4;
    gostGroup.add(gost);
  }
}
function spawnStar(){
  if(frameCount%50===0){
    star = createSprite(windowWidth+50,Math.round(random(50,470)));
    star.velocityX = -5;
    star.addImage(starImage);
    star.lifeTime = 200;
    starGroup.add(star);
    star.scale = 0.2; 
  }
}