var universe = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);

var gameState1 = function(){
    console.log("gameState1");
}

gameState1.prototype = {
    preload:preload,
    create:create,
    update:update,
};

var gameState2 = function(){
    console.log("gameState2");
}

gameState2.prototype = {
        preload : preload2,
        create : create2,
        update : update2
};

var gameOver = function(){
    console.log("gameOver");
}


gameOver.prototype = {
    preload:preload3,
    create:create3,
    update:update3,
};

var leaderboard = function(){

}

leaderboard.prototype = {
    preload:lpreload,
    create:lcreate,
    update:lupdate,   
};

var howtoplay = function(){
    console.log("howtoplay");
}

howtoplay.prototype = {
    preload:preload4,
    create:create4,
    update:update4,
};


 var fullButton;
 var fullButton_scale = 0.3;
 var button;
 var username;
 

universe.state.add('gameState1',gameState1);
universe.state.add('gameState2', gameState2);
universe.state.add('gameOver',gameOver);
universe.state.add('leaderboard',leaderboard);
universe.state.add('howtoplay',howtoplay);
universe.state.start('gameState1');


function preload(){
         universe.load.image('button','images/button-start-game.png')
         universe.load.spritesheet('fullButton','images/fullButton.png', 125, 100);
         universe.load.audio('pop','audio/pop.wav');
         universe.load.audio('music','audio/lp.mp3');
         universe.load.image('ship','images/ship.png');
         universe.load.image('lp','images/lp.png');
         universe.load.image('play','images/play.png');
    

}
 function create(){
     universe.scale.stopFullScreen();  
    
     landing = universe.add.tileSprite(0, 0,1350,753, 'lp');
     lp_width = window.innerWidth/1350;
     lp_height = window.innerHeight/753;

     landing.scale.setTo(lp_width,lp_height);    

     rocket = universe.add.sprite(10, 10, 'ship');
     rocket.scale.setTo(0.1,0.1);
     universe.physics.arcade.enable(rocket);
     rocket.body.collideWorldBounds = true;
     rocket.body.drag.set(1000);
     rocket.body.maxVelocity.set(300);
     rocket.anchor.set(0.5);
     
     cursors = universe.input.keyboard.createCursorKeys();

     music = universe.add.audio('music');
     music.play();

     pop = universe.add.audio('pop');   
       
//fullscreen
    universe.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    universe.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


    $.ajax({
        type: 'GET',
        url: '/ygvtfcrdx',
        dataType: 'json',
        success: function(response){

            username=response.username;
       }
    });


    play= universe.add.button(window.innerWidth*0.49,window.innerHeight*0.57, 'play', actionOnPlay);
    play.anchor.setTo(0.5,0.5);
        play.scale.setTo(1,0.82);
         function actionOnPlay () {
            pop.play();
           universe.scale.startFullScreen(false);
            flag_sw=0;
        universe.state.start('gameState2');
               
  }


}

 function update(){

      if(cursors.left.isDown){
        rocket.body.velocity.x = -300; 
        rocket.angle = 180;  
        
    }

    else if(cursors.right.isDown){
        rocket.body.velocity.x = 300;
        rocket.angle = 0;
        }

    else if(cursors.up.isDown){
        rocket.body.velocity.y = -300;
        rocket.body.velocity.x = 0;
        rocket.angle = 270; 
    }

    else if(cursors.down.isDown){
        rocket.body.velocity.y = 300;
        rocket.body.velocity.x = 0;
        rocket.angle = 90;
     }

    else{
        rocket.body.velocity.x = 0;
        rocket.body.velocity.y = 0;
     }

    if(cursors.left.isDown && cursors.up.isDown){
        rocket.body.velocity.x = -300;
        rocket.body.velocity.y = -300;
        rocket.angle = 225;   
        //background.tilePosition.x -= 1;               
    }

    if(cursors.left.isDown && cursors.down.isDown){
        rocket.body.velocity.x = -300;
        rocket.body.velocity.y = 300;
        rocket.angle = 135; 
        //background.tilePosition.x -= 1;                 
    }

    if(cursors.right.isDown && cursors.up.isDown){
        rocket.body.velocity.x = 300;
        rocket.body.velocity.y = -300;
        rocket.angle = 315; 
       // background.tilePosition.x -= 1;                 
    }

    if(cursors.right.isDown && cursors.down.isDown){
        rocket.body.velocity.x = 300;
        rocket.body.velocity.y = 300;
        rocket.angle = 45;
       // background.tilePosition.x -= 1;
    }

//start game
 x = universe.input.mousePointer.x;
    y = universe.input.mousePointer.y;

if (universe.input.activePointer.isDown) 
    {
        if (x>window.innerWidth*0.35 &&x<window.innerWidth*0.63 && y>window.innerHeight*0.53 &&y<window.innerHeight*0.616) 
        {
            flag_sw=0;
            universe.state.start('gameState2'); //play button
        }

        else if (x>window.innerWidth*0.35 &&x<window.innerWidth*0.63 && y>window.innerHeight*0.65 &&y<window.innerHeight*0.724) 
        {
            universe.state.start('howtoplay');
        }
        
        else if (x>window.innerWidth*0.35 &&x<window.innerWidth*0.63 && y>window.innerHeight*0.72 &&y<window.innerHeight*0.832) 
        {
            universe.state.start('leaderboard');
        }
    }



}

var pl = [];
var st = [];
var randX, randY, l=150, h=60;
var rocket, life=100;
var fuel,bmd,background, k = 0;
var star;
var scoreText;
var score = 0;
var score_dynamic=0;
var scoreText;
var hit,take,alert;
var bmd; 
var fl = 0;
// var pmenu;
var uname;
var scr;
var nmb;
var w,a,ss,d;
var flag_sw=0;

//-------------------------------------------------------------------------------------------------------------------------------------------
 function preload2(){
     universe.load.image('pn1','images/planet1a.png');
     // universe.load.image('pn2','images/planet2.png');
     // universe.load.image('pn3','images/planet3.png');
     universe.load.image('pn4','images/planet4.png');
     // universe.load.image('pn5','images/planet5.png');
     universe.load.image('pn6','images/planet6.png');
     // universe.load.image('pn7','images/planet7.png');
     // universe.load.image('pn8','images/planet10.png');
     //universe.load.image('pn9','images/planet11.png');
     // universe.load.image('pn10','images/planet12.png');
     universe.load.image('pn11','images/planet13.png');
    universe.load.image('pn12','images/planet14.png');
     // universe.load.image('pn13','images/planet15.png');
     universe.load.image('pn14','images/planet16.png');
      //universe.load.image('pn15','images/planet17.png');
     // universe.load.image('pn16','images/planet18.png');
     universe.load.image('pn17','images/planet19.png');
     //universe.load.image('pn18','images/planet20.png');
     universe.load.image('star','images/fuel.png');
     universe.load.image('bg','images/space_bg.png');
     universe.load.image('ship','images/ship.png');
   universe.load.image('pause','images/pause.png');
   universe.load.image('play','images/play.png');
     //universe.load.image('pausemenu','images/pausemenu.png');
     universe.load.spritesheet('blast', 'images/flame.png',64,64);
     universe.load.image('fullButton','images/fullButton.png');

     universe.load.audio('hit','audio/hit.mp3');
     universe.load.audio('take','audio/take.mp3');
     universe.load.audio('alert','audio/alert.mp3');
}


//-------------------------------------------------------------------------------------------------------------------------------
 function create2(){
    background = universe.add.tileSprite(0, 0, window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, 'bg');
     
    universe.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    universe.scale.setResizeCallback(this.gameResized, this);

    universe.physics.startSystem(Phaser.Physics.ARCADE);

    score=0;

    // var temp = Math.round(Math.random()*3);

    // if(temp==0)
    //     username = 'Haramrit';

    // else if(temp==1)
    //     username = 'Akash';

    // else
    //     username = 'Anto';
     
  blast = universe.add.sprite(0,0,'blast');
  // pmenu = universe.add.sprite(universe.world.width/2,universe.world.height/2,'pausemenu');
  // pmenu.anchor.setTo(0.5,0.5);
  // pmenu.kill();

    blast.visible=false;
    blast.animations.add('expl',[0,1,2,3,4,5,6,7,8],10,false);
    blast.scale.setTo(2,2)

    rocket = universe.add.sprite(100, 300, 'ship');
    rocket.scale.setTo(0.1,0.1);

    universe.physics.arcade.enable(rocket);
    rocket.body.collideWorldBounds = true;
    rocket.body.drag.set(1000);
    rocket.body.maxVelocity.set(300);
    rocket.anchor.set(0.5);
    rocket.body.setSize(1200,720,120,72);

    hit = universe.add.audio('hit');
    take = universe.add.audio('take');
    alert = universe.add.audio('alert');

    w= universe.input.keyboard.addKey(Phaser.Keyboard.W);
    a= universe.input.keyboard.addKey(Phaser.Keyboard.A);
    ss= universe.input.keyboard.addKey(Phaser.Keyboard.S);
    d= universe.input.keyboard.addKey(Phaser.Keyboard.D);
  
  cursors= universe.input.keyboard.createCursorKeys();
     
//-------------------------------------------------------------------------------------------------------------------

    
     star = universe.add.group();
     star.enableBody = true;

     k= 0;

     for(var i=0;i<300;i++){
            // console.log("in create2");
            randX = 1200+Math.floor(Math.random()*100);
            randY = universe.world.height*0.075+Math.floor(Math.random()*universe.world.height*0.755);
            st[i] = star.create(randX + k, randY, 'star');
            st[i].scale.setTo(0.4, 0.4);
            st[i].taken=0;
            k+=700;
     }

      planets = universe.add.group();
      planets.enableBody = true;

      for(var i=0;i<400;i++){

        if(i%3==0)
        pl[i] = planets.create(1000 , 300, 'pn1');

    else if(i%5==0)
        pl[i] = planets.create(1000 , 300, 'pn4');

        else if(i%7==0)
        pl[i] = planets.create(1000 , 300, 'pn6');

        else if(i%11==0)
        pl[i] = planets.create(1000 , 300, 'pn11');

        else if(i%13==0)
        pl[i] = planets.create(1000 , 300, 'pn14');

        else if(i%17==0)
        pl[i] = planets.create(1000 , 300, 'pn17');

        else
        pl[i] = planets.create(1000 , 300, 'pn12');
    
        if(i%4==0){
            l=150;
            h=60;
        }

        var r;
        r = Math.random()*h+l; 
        var s;
        s = Math.random()*0.6+0.2;

        var temp = Math.round(Math.random()*1);

        if(temp == 0)
            pl[i].dir = -1;

        else
            pl[i].dir = 1;

        pl[i].radius = r;

        l=l+h+20;

        pl[i].speed = s;
        pl[i].angle = 0;
        pl[i].scale.setTo(0.18,0.18);
        pl[i].body.setSize(34.2,34.2,155.8,155.8);
        pl[i].body.immovable = true;
        
     }

     cursors = universe.input.keyboard.createCursorKeys();

         bmd = universe.add.bitmapData(1400,40);

         bmd.ctx.beginPath();
         bmd.ctx.rect(0,0,1300,40);
         bmd.ctx.fillStyle = 'red';
         bmd.ctx.fill();

         healthBar = universe.add.sprite(0,0,bmd);
         healthBar.anchor.y = 0.5;

         universe.time.events.loop(Phaser.Timer.SECOND/60, fuel, this);
         universe.time.events.loop(Phaser.Timer.SECOND*1, inc_score, this);

//showing score
        scoreText = universe.add.text(30, 30, 'SCORE: ' + score, { fontSize: '15px', fill: '#FFFF00' });


 //fullscreen

        fullButton = universe.add.button(universe.world.width*0.9, universe.world.height*0.05, 'fullButton', goFull, this, 2, 1, 0);
        fullButton.input.priorityID = 0;
        fullButton.scale.setTo(0.015,0.015);
    
  //pause button

    pauseButton= universe.add.button(universe.world.width*0.95, universe.world.height*0.05, 'pause', pause_game, this, 2, 1, 0);
    pauseButton.scale.setTo(0.15, 0.15);




}


//--------------------------------------------------------------------------------------------------------------------
function update2(){

    var i,j,q=0;

    for(i=0;i<100;i++){
        for(j=q;j<q+4;j++){
            pl[j].x = st[i].position.x + Math.cos(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            pl[j].y = st[i].position.y + Math.sin(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            st[i].body.velocity.x = -425;
            universe.physics.arcade.overlap(rocket, st[i], collect, null , this);
        }

        q=j;
    }

    if(flag_sw==0){

        if(cursors.left.isDown || a.isDown){
            rocket.body.velocity.x = -430; 
            rocket.angle = 180;  
            background.tilePosition.x -= 2;              
        }

        else if(cursors.right.isDown || d.isDown){
            rocket.body.velocity.x = 380;
            rocket.angle = 0;
            background.tilePosition.x -= 2;                 
        }

        else if(cursors.up.isDown || w.isDown){
            rocket.body.velocity.y = -380;
            rocket.body.velocity.x = 0;
            rocket.angle = 270; 
            background.tilePosition.x -= 2;                 
        }

        else if(cursors.down.isDown || ss.isDown){
            rocket.body.velocity.y = 380;
            rocket.body.velocity.x = 0;
            rocket.angle = 90;
            background.tilePosition.x -= 2;                  
        }

        else{
            rocket.body.velocity.x = 0;
            rocket.body.velocity.y = 0;
            background.tilePosition.x -= 2;
        }

        if((cursors.left.isDown && cursors.up.isDown) || (a.isDown && w.isDown)){
            rocket.body.velocity.x = -430;
            rocket.body.velocity.y = -430;
            rocket.angle = 225;   
            //background.tilePosition.x -= 2;               
        }

        if((cursors.left.isDown && cursors.down.isDown) || (a.isDown && ss.isDown)){
            rocket.body.velocity.x = -430;
            rocket.body.velocity.y = 430;
            rocket.angle = 135; 
            //background.tilePosition.x -= 2;                 
        }

        if((cursors.right.isDown && cursors.up.isDown) || (d.isDown && w.isDown)){
            rocket.body.velocity.x = 380;
            rocket.body.velocity.y = -380;
            rocket.angle = 315; 
           // background.tilePosition.x -= 2;                 
        }

        if((cursors.right.isDown && cursors.down.isDown) || (d.isDown && ss.isDown)){
            rocket.body.velocity.x = 380;
            rocket.body.velocity.y = 380;
            rocket.angle = 45;
           // background.tilePosition.x -= 2;
        }

  } 


     if(  healthBar.width<0){
        alert.stop();
    
      rocket.body.allowGravity= true;
      rocket.body.velocity.y= 0;
      rocket.body.gravity.y+= 7000000;
    
      if(rocket.angle< 90);
      rocket.angle+= 3;
      // console.log("rocket gravity= "+rocket.body.gravity.y);
    
      fl = 1;

      flag_sw=1;
      
      if(rocket.body.position.y >= universe.world.height*0.85)
        universe.state.start('gameOver');
      }
  
   universe.physics.arcade.overlap(rocket, planets, impact, null, this);
}


function preload3(){

    universe.load.audio('pop','audio/pop.wav');
    universe.load.image('home','images/home.png');
    universe.load.image('play','images/play.png');
    universe.load.image('table','images/table.png');
    universe.load.image('bg','images/space_bg.png');
}

var scoreText;
var point;
var exist=0;
var counts;

function create3(){
    background = universe.add.tileSprite(0, 0, window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, 'bg');
    alert.stop();

    if(fl == 0)
    scoreText = universe.add.text(universe.world.width/2, 70, 'Game Over! \n\t\tScore: '+score, { fontSize: '32px', fill: '#FFF'});
    
    if(fl == 1)
    scoreText = universe.add.text(universe.world.width/2, 70, 'Out Of Fuel !! \n\t\tScore: '+score, { fontSize: '32px', fill: '#FFF'});

    scoreText.anchor.setTo(0.5,0.5);


       $.ajax({
        type: 'GET',
        url: '/qazwsxedc',
        dataType: 'json',
        success: function(response){

            var j=0;
            while(response[j]!==null)
            {
                if(username===response[j].username)
                {
                    exist=1;
                    counts=response[j].counts;
                    // console.log("response counts:"+counts);
                    
                    send_count();

                    break;
                }

                j++;
           }
       }
    });



        $.ajax({
        type: 'GET',
        url: '/qazwsxedc',
        dataType: 'json',
        success: function(response){

            var j=0;
            
            if(exist==1)
            {
                while(response[j]!==null)
                {
                    if(username===response[j].username)
                    {

                        if(score>response[j].score)
                            {
                                // console.log("High score sent!!");
                                send_score();
                                setTimeout(rec_score,500);
                                break;
                            }
  
                        else
                            {
                                // console.log("Score not sent!!");
                                setTimeout(rec_score,500);
                                break;
                            }
                    }

                    j++;
                }
            }

            else
            {
                send_score();
                send_count();
                setTimeout(rec_score,500);
            }

       }
    });


    pop = universe.add.audio('pop');

    play= universe.add.button(  universe.world.width*0.9, universe.world.height*0.9, 'play', actionOnPlay);
    play.anchor.setTo(0.5,0.5);

    play.scale.setTo(0.7,0.7);

         
    function actionOnPlay () {
            pop.play();
             playFull();
             flag_sw=0;
        universe.state.start('gameState2');
               
    }

        home= universe.add.button(10, 10, 'home', actionOnClick);
        home.scale.setTo(0.5, 0.5);

         function actionOnClick () {
        pop.play();
        universe.state.start('gameState1');
               
        }
            
    // console.log("Mega Point:"+point);
}

function update3(){

}

function send_count(){
        if(exist==0)
          counts=0;

        counts++;
        // console.log("counts++"+counts);

        if(score<75)
          point = 0;


        if(score>=75 && score<125)
          point = 50;

        else if(score>=125 && score<200)
          point = 75;

        else if(score>=200 && score<350)
          point = 150;

        else if(score>=350 && score<600)
          point = 250;

        else if(score>=600 && score<850)
          point = 350;

        else if(score>=850)
        {

          // console.log("send counts:"+counts);

          $.ajax({
        type: 'POST',
        url: '/edcrfvtgb',
        data: {username:username, counts:counts},
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                // console.log('count sent from space.js');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
        });

          if(counts==1)
            point = 475;

          else if(counts==2)
            point = 450;

          else if(counts==3)
            point = 425;
          
          else
            point = 400;
        }

        send_mega();
}


function send_score(){
    // console.log(score);
    //     console.log(username);
        $.ajax({
        type: 'POST',
        url: '/okmijnuhb',
        data: {username:username , score:score},
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                // console.log('score sent from space.js');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
        });



}

function rec_score(){
   
    var table = universe.add.image(200,200,'table');
        var gap=0;

    table.anchor.setTo(0.5,0.5);

    table.x = universe.world.width/2;
    table.y = universe.world.height/2+30;

    rank = universe.add.text(table.x-160,table.y-210+gap,"RANK",{fontSize: '15px', fill:'white'});
    uname = universe.add.text(table.x,table.y-210+gap,"USERNAME",{fontSize: '15px', fill:'white'});
    sc = universe.add.text(table.x+152,table.y-210+gap,"SCORE",{fontSize: '15px', fill:'white'});

    rank.anchor.setTo(0.5,0.5);
    uname.anchor.setTo(0.5,0.5);
    sc.anchor.setTo(0.5,0.5);
  

    $.ajax({
        type: 'GET',
        url: '/qazwsxedc',
        dataType: 'json',
        success: function(response){
            // console.log(response);
            var j=0;
            while(response[j]!==null && j<10)
            {
                    scr = universe.add.text(table.x+140,table.y-175+gap,response[j].score,{fontSize: '15px', fill:'white'});
                    nmb = universe.add.text(table.x-160,table.y-175+gap,j+1,{fontSize: '15px', fill:'white'});
        
                    uname = universe.add.text(table.x,table.y-165+gap,response[j].username,{fontSize: '15px', fill:'white'});
                    uname.anchor.setTo(0.5,0.5);
                    gap+=42;
                    j++;
            }
        }
    });
}


function send_mega(){

     $.ajax({
        type: 'POST',
        url: '/yhnujmik',
        data: {username:username , point:point},
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                // console.log('point sent from space.js');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
        });
}

var arrows;


var oscIndex = 0;

function preload4(){
         universe.load.image('bg','images/space_bg.png');
         universe.load.image('arrow','images/arrows.png');
         universe.load.image('ship','images/ship.png');
         universe.load.image('star','images/fuel.png');
         universe.load.image('pn1','images/planet1a.png');
            universe.load.image('play','images/play.png'); 
            universe.load.image('fullButton','images/fullButton.png');
          universe.load.audio('pop','audio/pop.wav');
          universe.load.image('home','images/home.png');
    

}
function create4(){
     
     background = universe.add.tileSprite(0, 0,window.innerWidth, window.innerHeight, 'bg');
           arrows = universe.add.image(60,100, 'arrow');
        arrows.scale.setTo(0.4,0.4);
         pop = universe.add.audio('pop');
    var style = { font: '18pt Hobo Std', fill: 'white', align: 'justified', wordWrap: true, wordWrapWidth: 1135 };
    
    var styleTitle = { font: '25pt Hobo Std', fill: 'white', align: 'justified', wordWrap: true, wordWrapWidth: 1135 };
    var styleline = {fill:'white'};

//var bounds = new Phaser.Rectangle(800,50,390,180);

 rocket = universe.add.sprite(850, 95, 'ship');
      rocket.scale.setTo(0.1,0.1);
     // universe.physics.arcade.enable(rocket);
     // rocket.body.collideWorldBounds = true;
     // rocket.body.drag.set(1000);
     // rocket.body.maxVelocity.set(300);
     // rocket.anchor.set(0.5);
     
cursors = universe.input.keyboard.createCursorKeys();
     spc = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    //  var graphics = universe.add.graphics(0, 0);

    //     var graphics = universe.add.graphics(bounds.x, bounds.y);
    // graphics.lineStyle(4, 0xffffff, 1);
    // graphics.drawRect(0, 0, bounds.width, bounds.height);


// rect
  //    graphics.lineStyle(2, 0x0000FF, 1);
 //  graphics.drawRect( window.innerWidth*0.5,window.innerHeight*0.2, window.innerWidth*0.55,window.innerHeight*0.4);
  //   graphics.drawRect(200,100,300,150);

universe.add.text(550,30,"How to play?",styleTitle);


universe.add.text(300,140,"Use arrow keys or W,A,S,D for moving the rocket",style);
universe.add.text(300,280,"Keep collecting fuel to continue your adventure",style);
universe.add.text(300,410,"Make sure you never collide with a planet",style);


//universe.physics.enable(star, Phaser.Physics.ARCADE);

star = universe.add.image(820,250, 'star');
star.scale.setTo(0.45,0.45);




//star.body.velocity.x=150;





planets = universe.add.image(820,380, 'pn1');
planets.scale.setTo(0.25,0.25);
pop = universe.add.audio('pop');

    play= universe.add.button( universe.world.width*0.9, universe.world.height*0.9, 'play', actionOnPlay);
    play.anchor.setTo(0.5,0.5);

    play.scale.setTo(0.7,0.7);

         
    function actionOnPlay () {
            pop.play();
             playFull();
             flag_sw=0;
        universe.state.start('gameState2');
               
    }

        home= universe.add.button(10, 10, 'home', actionOnClick);
        home.scale.setTo(0.5, 0.5);

         function actionOnClick () {
        pop.play();
        universe.state.start('gameState1');
               
        }
        
}




function update4(){
//  if(rocket.body.position.x>800 || rocket.body.position.x<1190 || rocket.body.position.y>50 || rocket.body.position.y<230){



// if(cursors.left.isDown){
//         rocket.body.velocity.x = -300; 
//         rocket.angle = 180;  
        
//     }

//     else if(cursors.right.isDown){
//         rocket.body.velocity.x = 300;
//         rocket.angle = 0;
//         }

//     else if(cursors.up.isDown){
//         rocket.body.velocity.y = -300;
//         rocket.body.velocity.x = 0;
//         rocket.angle = 270; 
//     }

//     else if(cursors.down.isDown){
//         rocket.body.velocity.y = 300;
//         rocket.body.velocity.x = 0;
//         rocket.angle = 90;
//      }

//     else{
//         rocket.body.velocity.x = 0;
//         rocket.body.velocity.y = 0;
//      }

//     if(cursors.left.isDown && cursors.up.isDown){
//         rocket.body.velocity.x = -300;
//         rocket.body.velocity.y = -300;
//         rocket.angle = 225;   
//         //background.tilePosition.x -= 1;               
//     }

//     if(cursors.left.isDown && cursors.down.isDown){
//         rocket.body.velocity.x = -300;
//         rocket.body.velocity.y = 300;
//         rocket.angle = 135; 
//         //background.tilePosition.x -= 1;                 
//     }

//     if(cursors.right.isDown && cursors.up.isDown){
//         rocket.body.velocity.x = 300;
//         rocket.body.velocity.y = -300;
//         rocket.angle = 315; 
//        // background.tilePosition.x -= 1;                 
//     }

//     if(cursors.right.isDown && cursors.down.isDown){
//         rocket.body.velocity.x = 300;
//         rocket.body.velocity.y = 300;
//         rocket.angle = 45;
//        // background.tilePosition.x -= 1;
//     }
// }
// else{
//         rocket.body.velocity.x = 0;
//         rocket.body.velocity.y = 0;
//      }



    oscillation();
}
//---------------------------------------------------------------------------------------------------------------------------

function lpreload(){
      universe.load.audio('pop','audio/pop.wav');
        universe.load.image('home','images/home.png');
    universe.load.image('play','images/play.png');
    universe.load.image('table','images/table.png');
    universe.load.image('bg','images/space_bg.png');

}

function lcreate(){
    
    background = universe.add.tileSprite(0, 0, window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, 'bg');
    var board = universe.add.text(universe.world.width/2,40,"LEADERBOARD",{fontSize: '30px', fill:'white'});
    board.anchor.setTo(0.5,0,5);

    pop = universe.add.audio('pop');

    play= universe.add.button(  universe.world.width-170, universe.world.height-70, 'play', actionOnPlay);
    play.anchor.setTo(0.5,0.5);

    play.scale.setTo(0.7,0.7);

         
    function actionOnPlay () {
            pop.play();
             playFull();
             flag_sw=0;
        universe.state.start('gameState2');
               
    }

        home= universe.add.button(10, 10, 'home', actionOnClick);
        home.scale.setTo(0.5, 0.5);

         function actionOnClick () {
        pop.play();
        universe.state.start('gameState1');
               
        }

   rec_score();

}

function lupdate(){

}

function impact(){
  
    blast.x = rocket.body.position.x;
    blast.y = rocket.body.position.y;

    blast.visible = true;
    blast.animations.play('expl');

    rocket.kill();
    universe.camera.shake(0.03, 1000);
    universe.camera.shake(0.02, 1000);

    alert.stop();
    hit.play();

    fl = 0;

    setTimeout(over,1000);
}

var flag=0;

function fuel(){
    healthBar.width-=3.7;

    if(healthBar.width<400 && flag==0)
        {
            alert.play();
            flag=1;

            healthBar.alpha = 0;

            universe.add.tween(healthBar).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }

    if(healthBar.width>=400 && flag==1)
        {
            alert.stop();
            flag=0;
        }  
}


function collect(rocket,st){

    if(healthBar.width<universe.world.width && st.taken==0){
        st.taken++;
        healthBar.width+=350;
        take.play();
    }

    st.visible = false;
}


function goFull() {
    if (universe.scale.isFullScreen){
        universe.scale.stopFullScreen();
    }
    else{
        universe.scale.startFullScreen(false);
    }
}

function playFull(){
  universe.scale.startFullScreen(false);
}


function pause_game() {

    universe.paused = true;
    pus = universe.add.text(universe.world.width/2,universe.world.height/2,"Click Anywhere To Resume",{fontSize: '25px', fill:'white'});
    pus.anchor.setTo(0.5, 0,5);
    
    //pmenu = universe.add.sprite(universe.world.width/2,universe.world.height/2,'pausemenu');
    //pmenu.anchor.setTo(0.5,0.5);

    universe.input.onDown.add(intermediate, self);
    
    // console.log("Inside pause game")
}

function intermediate(event)
{
    if (this.universe.input.mousePointer.isDown) 
    {   
        x = universe.input.mousePointer.x;
        y = universe.input.mousePointer.y;
        // console.log(x);
        // console.log(y);
        unpause(x, y);

/*
        if((x>=556 && x<=805) && (y>=238 && y<=286))
        {
            console.log("in resume");
            unpause(x, y);
        }

        else if((x>=557 && x<=800) && (y>=311 && y<=360))
        {
            console.log("in restart");
            
            start_state(1);
        }

        else if((x>=558 && x<=808) && (y>=386 && y<=435))
        {
            console.log("in main menu");
            
            start_state(2);
        }

    }   
*/
    }
}

// function start_state(z){
//     if(z==1)
//         {
//             // console.log("z="+z);
//             //pmenu.kill();
//             universe.paused= false;
//             flag_sw=0;
//             universe.state.start("gameState2",true,false);        }

//     if(z==2)
//     {
//         // console.log("z="+z);
//         //pmenu.kill();
//         universe.paused= false;
//         universe.state.start("gameState1",true,false);
//     }
// }

function unpause(x, y) {
    // console.log("Inside unpause");
    //pmenu.kill();
    pus.kill();
    universe.paused= false;
}


function over(){
    alert.stop();
    universe.state.start('gameOver');
}



function inc_score(){
    score += 10;
    scoreText.text = 'SCORE: ' + score;
}

var calcSin = function calcSin (amp, osc, sinD) {
        return amp * Math.sin(osc / sinD);
    };

    //Oscillation function defined separately to oscillate the particle
    var oscillation = function oscillation() {
        var y = star.y;
        startx = 900;
        if (oscIndex === 10000000000) oscIndex = 1;
        
        var sin = calcSin(100, oscIndex, 20);
        star.x = 900 + parseInt(sin);
        planets.x = 900 + parseInt(sin);
        rocket.x = 900 + parseInt(sin);
        y = y - 3;
        oscIndex++;
        // console.log(rocket.x);
    };


//-------------------BLOCK SCROLLING OF PAGE DUE TO SPACEBAR AND ARROW KEYS---------------------

var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; 
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);
