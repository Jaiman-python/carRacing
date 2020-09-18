class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("Car1", car1_img);

    car2 = createSprite(300,200);
    car2.addImage("Car2", car2_img);

    car3 = createSprite(500,200);
    car3.addImage("Car3", car3_img);

    car4 = createSprite(700,200);
    car4.addImage("Car4", car4_img);


    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    console.log(player.distance);

    if(allPlayers !== undefined){
      //var display_position = 130;
      image(track_img,0,-displayHeight*4, displayWidth, displayHeight*5);
      var index = 0;
      var x = 175;
      var y;

      for(var plr in allPlayers){
        index += 1;
        x += 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance > 4300){
      gameState = 2;
    }
    drawSprites();
  }

  end(){
    console.log(player.name + " YOU WIN!");
    game.update(0);
  }
}
