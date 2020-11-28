var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,player_img,groundImage,player_dead;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup,obstacle,obstacleImg;

var score=0;

var gameOver, restart,gameOverImg,restartImg;


function preload(){

  player_img = loadAnimation("Images/Runner1.png","Images/Runner2.png","Images/Runner3.png","Images/Runner4.png","Images/Runner5.png","Images/Runner6.png","Images/Runner7.png","Images/Runner8.png","Images/Runner9.png","Images/Runner10.png");
  
  groundImage = loadImage("Images/ground.png");
  obstacleImg = loadImage("Images/Obstacle.png")
  
  gameOverImg = loadImage("Images/gameOver.png");
  restartImg = loadImage("Images/restart.png");

  cloudImage = loadImage("Images/cloud.png")

  player_dead= loadAnimation("Images/Runner_dead.png")
}


function setup() {

  createCanvas(displayWidth,displayHeight);
  
  player = createSprite(displayWidth/2.95384615385,displayHeight/1.6875)
  player.addAnimation("Hello",player_img)
  player.scale = (displayHeight/500);  
  
  
  ground = createSprite(displayWidth/2,displayWidth/2.3,displayWidth,20);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(10 + 4*score/100);
  
  gameOver = createSprite(displayWidth/2.03389830508,displayHeight/3.35403726708);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2.03389830508,displayHeight/2.4);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2,displayWidth/2.28,displayWidth,20);
  invisibleGround.visible = false;

  obstaclesGroup= createGroup();
  cloudsGroup= createGroup();
  
  
  
  score = 0;
}

function draw() {


  background(230,230,230);
  
  if (gameState===PLAY){
    player.visible = true;
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(10+ 4*score/100);
  
    if(keyDown("space") && player.y >= (displayHeight/1.54285714286)) {
      player.velocityY = -24;
    }
  
    player.velocityY = player.velocityY + 1
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX =0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    player.visible = false;
  }
  player.collide(invisibleGround)


  drawSprites();


  textSize(100)
  //text(mouseX+","+mouseY,1300,89)
  text("Score: "+ score, displayWidth/3,displayHeight/8.30769230769);
  
  console.log(invisibleGround.y)

}

function spawnClouds() {

  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var cloud = createSprite(1820,800,100,100);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 2;
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime = (displayWidth);
    
    //adjust the depth
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {

  if(frameCount % 120 === 0) {
    var obstacle = createSprite(displayWidth/1.05494505495,displayHeight/1.35,100,100);
    //obstacle.debug = true;
    obstacle.velocityX = -(10 + 4*score/100);
    
  obstacle.addImage(obstacleImg)

   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = (displayWidth);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  
  
  
  
  score = 0;
  
}
