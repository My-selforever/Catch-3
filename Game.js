class Game
{
    constructor()
    {

    }

    getState()
    {
        var gameStateRef = database.ref('gamestate');
        gameStateRef.on("value",function (data)
        {
            gameState = data.val();
        })
    }

    update(state)
    {
        database.ref('/').update(
            {
                gameState: state
            });
    }

    async start()
    {
        if(gameState===0)
        {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        player1 = createSprite(200,500);
        player2 = createSprite(800,500);
    }

    play()
    {
        form.hide();
        
        Player.getPlayerInfo();
        var x =100;
        var y = 200;
        var index = 0;
        drawSprites();
        var v = 100;
        for(var plr in allPlayers)
        {
            index = index+1;
            x = 500-allplayers[plr].distance;
            y = 500;

            players[index -1].x = x;
            players[index -1].y = y;

            if(index === player.index)
            {
                fill("black");
                textSize(25);
                textFont("Comic Sans ms");
                text(allPlayers[plr].name + "="+ allPlayers[plr].score,100,v)
                v+=50;

                players[index-1].collide(edges);
            }


            if(keyIsDown(RIGHT_ARROW)  &&  player.index !== null)
            {
                player.distance -= 10
                player.update();
            }

            if(keyIsDown(LEFT_ARROW)  &&  player.index !==null)
            {
              player.distance += 10
              player.update();
            }
          
            if (frameCount%20 === 0)
            {
              var rand = Math.round(random(1,2))
              switch (rand)
              {
                  case 1: good = createSprite(random(100,900),-1,100,100);
                          g.add(good);
                          a.add(good);
                          break;
                  case 2: bad = createSprite(random(100,900),-1,100,100);
                          b.add(bad);
                          a.add(bad);
                          break;
              } 

              if(player.index !== null)
              {
                var i;
                for(i=0;i<=a;i+=1)
                {
                  if (a.get(i).isTouching(players))
                  {
                      a.get(i).destroy();
                      player.score+=1;
                      player.update();
                  }
                }
                    
                }
              
            }
         
        }
        end()
        {
            console.log("Game Ended")
        }

    }
}