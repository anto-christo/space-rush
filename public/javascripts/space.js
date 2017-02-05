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
 var video;
 var w,s,a,d;
  
universe.state.add('gameState1',gameState1);
universe.state.add('gameState2', gameState2);
universe.state.add('gameOver',gameOver);
universe.state.add('leaderboard',leaderboard);
universe.state.add('howtoplay',howtoplay);
universe.state.start('gameState1');


function preload(){
         universe.load.image('button','images/button-start-game.png')
         universe.load.spritesheet('fullButton','images/fullButton.png', 125, 100);
        universe.load.video('video', 'images/video.mp4');
         universe.load.image('ship','images/ship.png');
         universe.load.image('lp','images/lp.png');
    

}
 function create(){
           
    
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
     //spc = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

     w = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.W);
     a = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.A);
     s = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
     d = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.D);

   
   
       
//fullscreen
    universe.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    universe.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


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
     universe.load.image('pausemenu','images/pausemenu.png');
     universe.load.spritesheet('blast', 'images/flame.png',64,64);
     universe.load.spritesheet('fullButton','images/fullButton.png', 125, 100);

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
     
	blast = universe.add.sprite(0,0,'blast');
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
     
//-------------------------------------------------------------------------------------------------------------------

    
     star = universe.add.group();
     star.enableBody = true;

     k= 0;

     for(var i=0;i<300;i++){
            console.log("in create2");
            randX = 1200+Math.floor(Math.random()*100);
            randY = 50+Math.floor(Math.random()*500);
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
        s = Math.random()*1+0.2;

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
         universe.time.events.loop(Phaser.Timer.SECOND*1, point, this);

//showing score
        scoreText = universe.add.text(30, 30, 'SCORE: ' + score, { fontSize: '15px', fill: '#FFFF00' });


 //fullscreen

        fullButton = universe.add.button(1250, 50, 'fullButton', goFull, this, 2, 1, 0);
        fullButton.input.priorityID = 0;
        fullButton.scale.setTo(fullButton_scale, fullButton_scale);
		
	//pause button

		pauseButton= universe.add.button(1300, 40, 'pause', pause_game, this, 2, 1, 0);
		pauseButton.scale.setTo(0.1, 0.1);


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

    if(cursors.left.isDown){
        rocket.body.velocity.x = -380; 
        rocket.angle = 180;  
        background.tilePosition.x -= 2;              
    }

    else if(cursors.right.isDown){
        rocket.body.velocity.x = 380;
        rocket.angle = 0;
        background.tilePosition.x -= 2;                 
    }

    else if(cursors.up.isDown){
        rocket.body.velocity.y = -380;
        rocket.body.velocity.x = 0;
        rocket.angle = 270; 
        background.tilePosition.x -= 2;                 
    }

    else if(cursors.down.isDown){
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

    if(cursors.left.isDown && cursors.up.isDown){
        rocket.body.velocity.x = -380;
        rocket.body.velocity.y = -380;
        rocket.angle = 225;   
        //background.tilePosition.x -= 2;               
    }

    if(cursors.left.isDown && cursors.down.isDown){
        rocket.body.velocity.x = -380;
        rocket.body.velocity.y = 380;
        rocket.angle = 135; 
        //background.tilePosition.x -= 2;                 
    }

    if(cursors.right.isDown && cursors.up.isDown){
        rocket.body.velocity.x = 380;
        rocket.body.velocity.y = -380;
        rocket.angle = 315; 
       // background.tilePosition.x -= 2;                 
    }

    if(cursors.right.isDown && cursors.down.isDown){
        rocket.body.velocity.x = 380;
        rocket.body.velocity.y = 380;
        rocket.angle = 45;
       // background.tilePosition.x -= 2;
    }

    if(  healthBar.width<0){
        alert.stop();
        fl = 1;
        universe.state.start('gameOver');
    }
	
	 universe.physics.arcade.overlap(rocket, planets, impact, null, this);
}
//--------------------------------------------------------------------------------------------------------------------------

function preload3(){

      universe.load.image('table','images/table.png');
      universe.load.image('bg','images/space_bg.png');
}

var scoreText;



function create3(){
    background = universe.add.tileSprite(0, 0, window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, 'bg');
    alert.stop();
    
    if(fl == 0)
    scoreText = universe.add.text(200, 200, 'Game Over! \n\nScore: '+score , { fontSize: '32px', fill: '#FFF'});
    
    if(fl == 1)
    scoreText = universe.add.text(200, 200, 'Out Of Fuel !! \n\nScore: '+score , { fontSize: '32px', fill: '#FFF'});

    scoreText.anchor.setTo(0.5,0.5);

    console.log("Game state 2 entered !!");
        console.log(score);
        $.ajax({
        type: 'POST',
        url: '/input_score',
        data: { score:score },
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                console.log('score sent from space.js');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
        });

        var table = universe.add.image(200,200,'table');
        var gap=0;

    table.anchor.setTo(0.5,0.5);

    table.x = universe.world.width/2;
    table.y = universe.world.height/2;

    $.ajax({
        type: 'GET',
        url: '/ret_score',
        dataType: 'json',
        success: function(response){
            
            for(var j=0;j<10;j++)
            {
                var lead = universe.add.text(845,168+gap,response[j].score,{fontSize: '15px', fill:'white'});
                lead.anchor.setTo(0.5,0.5);
                gap+=42;
            }
        }
        });
};

function update3(){

}

var arrows;


var oscIndex = 0;

function preload4(){
         universe.load.image('bg','images/space_bg.png');
         universe.load.image('arrow','images/arrows.png');
         universe.load.image('ship','images/ship.png');
         universe.load.image('star','images/fuel.png');
         universe.load.image('pn1','images/planet1a.png');
     

}
function create4(){
     
     background = universe.add.tileSprite(0, 0,window.innerWidth, window.innerHeight, 'bg');
           arrows = universe.add.image(50,120, 'arrow');
        arrows.scale.setTo(0.4,0.4);

    var style = { font: '18pt Hobo Std', fill: 'white', align: 'justified', wordWrap: true, wordWrapWidth: 1135 };
    
    var styleTitle = { font: '25pt Hobo Std', fill: 'white', align: 'justified', wordWrap: true, wordWrapWidth: 1135 };
    var styleline = {fill:'white'};

 
 rocket = universe.add.sprite(880,120, 'ship');
     rocket.scale.setTo(0.1,0.1);
     universe.physics.arcade.enable(rocket);
     rocket.body.collideWorldBounds = true;
     rocket.body.drag.set(1000);
     rocket.body.maxVelocity.set(300);
     rocket.anchor.set(0.5);
     
cursors = universe.input.keyboard.createCursorKeys();
     spc = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
     var graphics = universe.add.graphics(0, 0);

// rect
  //    graphics.lineStyle(2, 0x0000FF, 1);
 //  graphics.drawRect( window.innerWidth*0.5,window.innerHeight*0.2, window.innerWidth*0.55,window.innerHeight*0.4);
  //   graphics.drawRect(200,100,300,150);

universe.add.text(550,30,"How to play?",styleTitle);


universe.add.text(300,140,"use arrow keys for successfully moving the rocket",style);
universe.add.text(300,280,"keep collecting fuel to stay alive in the game",style);
universe.add.text(300,410,"make sure you never collide with an asteroid",style);


//universe.physics.enable(star, Phaser.Physics.ARCADE);

star = universe.add.image(820,250, 'star');
star.scale.setTo(0.45,0.45);




//star.body.velocity.x=150;





planets = universe.add.image(820,380, 'pn1');
planets.scale.setTo(0.25,0.25);

 // rect = new Phaser.Rectangle(880,100,850,200);
}




function update4(){
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

    oscillation();
}
//---------------------------------------------------------------------------------------------------------------------------

function lpreload(){

    universe.load.image('table','images/table.png');
    universe.load.image('bg','images/space_bg.png');

}

function lcreate(){
    
    background = universe.add.tileSprite(0, 0, window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, 'bg');
    var board = universe.add.text(585,40,"LEADERBOARD",{fontSize: '30px', fill:'white'});

    var table = universe.add.image(200,200,'table');
    var gap=0;

    table.anchor.setTo(0.5,0.5);

    table.x = universe.world.width/2;
    table.y = universe.world.height/2;

    $.ajax({
        type: 'GET',
        url: '/ret_score',
        dataType: 'json',
        success: function(response){
            
            for(var j=0;j<10;j++)
            {
                lead = universe.add.text(table.x+140,table.y-175+gap,response[j].score,{fontSize: '15px', fill:'white'});
                gap+=42;
            }
        }
    });

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
    healthBar.width-=4;

    if(healthBar.width<400 && flag==0)
        {
            alert.play();
            flag=1;
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

function pause_game() {
    universe.paused= true;
    universe.input.onDown.add(intermediate, self);
    
    thepausemenu= universe.add.sprite(80, 30, 'pausemenu');
    
    
    console.log("Inside pause game")
}

function intermediate(event)
{
    if (this.universe.input.mousePointer.isDown) 
    {   
        x = universe.input.mousePointer.x;
        y = universe.input.mousePointer.y;
        console.log(x);
        console.log(y);

        if((x>=494 && x<=750) && (y>=294 && y<=351))
        {
            console.log("in resume");
            unpause(x, y);
        }

        else if((x>=494 && x<=750) && (y>=370 && y<=415))
        {
            console.log("in restart");
            
            start_state(1);
        }

        else if((x>=494 && x<=750) && (y>=444 && y<=497))
        {
            console.log("in main menu");
            
            start_state(2);
        }

    }   

    else
        console.log("Out of Range");
}

function start_state(z){
    if(z==1)
        {
            console.log("z="+z);
            thepausemenu.kill();
            universe.paused= false;
            universe.state.start("gameState2",true,false);        }

    if(z==2)
    {
        console.log("z="+z);
        thepausemenu.kill();
        universe.paused= false;
        universe.state.start("gameState1",true,false);
    }
}

function unpause(x, y) {
    console.log("Inside unpause");
    thepausemenu.kill();
    universe.paused= false;
}


function over(){
    alert.stop();
    universe.state.start('gameOver');
}



function point(){
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
