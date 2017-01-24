//(function() {
  //  'use strict';


var universe = new Phaser.Game(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.CANVAS);

var gameState1 = function(){
    console.log("gameState1");
}

gameState1.prototype = {
    preload:preload,
    create:create,
    update:update
};

var gameState2 = function(){
    console.log("gameState2");
}

gameState2.prototype = {
        preload : preload2,
        create : create2,
        update : update2
};

function preload(){
         universe.load.image('button','img/button-start-game.png');
}
var button;
function create(){
    button = universe.add.button(universe.world.centerX ,universe.world.centerY, 'button', actionOnClick,'Start'); 
        button.anchor.setTo(0.2,0.2);

     function actionOnClick () {

        universe.state.start('gameState2');

}

}

function update(){

}





universe.state.add('gameState1',gameState1);
universe.state.add('gameState2', gameState2);
universe.state.start('gameState1');

var pl = [];
var st = [];
var randX, randY, l=150, h=60;
var rocket, life=100;
var fuel,bmd,background, k = 0;

//-------------------------------------------------------------------------------------------------------------------------------------------
function preload2(){
     universe.load.image('pn1','img/planet1.png');
     // universe.load.image('pn2','img/planet2.png');
     // universe.load.image('pn3','img/planet3.png');
     // universe.load.image('pn4','img/planet4.png');
     // universe.load.image('pn5','img/planet5.png');
     // universe.load.image('pn6','img/planet6.png');
     // universe.load.image('pn7','img/planet7.png');
     // universe.load.image('pn8','img/planet10.png');
     // universe.load.image('pn9','img/planet11.png');
     // universe.load.image('pn10','img/planet12.png');
     // universe.load.image('pn11','img/planet13.png');
     // universe.load.image('pn12','img/planet14.png');
     // universe.load.image('pn13','img/planet15.png');
     // universe.load.image('pn14','img/planet16.png');
     // universe.load.image('pn15','img/planet17.png');
     // universe.load.image('pn16','img/planet18.png');
     // universe.load.image('pn17','img/planet19.png');
     // universe.load.image('pn18','img/planet20.png');
     universe.load.image('star','img/fuel.png');
     universe.load.image('bg','img/space_bg.jpg');
     universe.load.image('ship','img/ship.png');
}


//-------------------------------------------------------------------------------------------------------------------------------
function create2(){
     background = universe.add.tileSprite(0, 0, 1365, 625, 'bg');
     
     universe.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
     universe.scale.setResizeCallback(this.gameResized, this);

     universe.physics.startSystem(Phaser.Physics.ARCADE);
     

     rocket = universe.add.sprite(100, 100, 'ship');
     rocket.scale.setTo(0.1,0.1);
     universe.physics.arcade.enable(rocket);
     rocket.body.collideWorldBounds = true;
     rocket.body.drag.set(1000);
     rocket.body.maxVelocity.set(300);
     rocket.anchor.set(0.5);
     
//-------------------------------------------------------------------------------------------------------------------

    
     star = universe.add.group();
     star.enableBody = true;

     for(var i=0;i<100;i++){
            randX = 1200+Math.floor(Math.random()*100);
            randY = 100+Math.floor(Math.random()*400);
            st[i] = star.create(randX + k, randY, 'star');
            st[i].scale.setTo(0.4, 0.4);
            st[i].taken=0;
            k+=1000;
     }

      planets = universe.add.group();
     planets.enableBody = true;

     for(var i=0;i<400;i++){

        pl[i] = planets.create(1000 + Math.cos(0), 300 + Math.sin(0), 'pn1');

        if(i%4==0){
            l=150;
            h=60;
        }

        var r;
        r = Math.random()*h+l; 
        var s;
        s = Math.random()*1.3+0.5;

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
       // pl[i].body.setSize(100, 50, 50, 25);
        //pl[i].body.setSize(40, 20, 10, 10);
        pl[i].body.immovable = true;
        
     }

     cursors = universe.input.keyboard.createCursorKeys();
     spc = universe.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

     var bmd = universe.add.bitmapData(1400,40);
         bmd.ctx.beginPath();
         bmd.ctx.rect(0,0,1300,30);
         bmd.ctx.fillStyle = 'red';
         bmd.ctx.fill();
        
         healthBar = universe.add.sprite(0,0,bmd);
         healthBar.anchor.y = 0.5;

     universe.time.events.loop(Phaser.Timer.SECOND/60, fuel, this);

}


//--------------------------------------------------------------------------------------------------------------------
function update2(){

    var i,j,q=0;

    for(i=0;i<100;i++){
        for(j=q;j<q+4;j++){
            pl[j].x = st[i].position.x + Math.cos(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            pl[j].y = st[i].position.y + Math.sin(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            st[i].body.velocity.x = -450;
            universe.physics.arcade.overlap(rocket, st[i], collect, null , this);
        }

        q=j;
    }

    if(cursors.left.isDown){
        rocket.body.velocity.x = -300; 
        rocket.angle = 180;  
        background.tilePosition.x -= 1;              
    }

    else if(cursors.right.isDown){
        rocket.body.velocity.x = 300;
        rocket.angle = 0;
        background.tilePosition.x -= 1;                 
    }

    else if(cursors.up.isDown){
        rocket.body.velocity.y = -300;
        rocket.body.velocity.x = 0;
        rocket.angle = 270; 
        background.tilePosition.x -= 1;                 
    }

    else if(cursors.down.isDown){
        rocket.body.velocity.y = 300;
        rocket.body.velocity.x = 0;
        rocket.angle = 90;
        background.tilePosition.x -= 1;                  
    }

    else{
        rocket.body.velocity.x = 0;
        rocket.body.velocity.y = 0;
        background.tilePosition.x -= 1;
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

    // if (cursors.up.isDown)
    // {
    //     universe.physics.arcade.accelerationFromRotation(rocket.rotation, 300, rocket.body.acceleration);
    // }
    // else if(cursors.down.isDown)
    // {
    //     universe.physics.arcade.accelerationFromRotation(rocket.rotation, -300, rocket.body.acceleration);
    // }
    // else
    // {
    //     rocket.body.acceleration.set(0);
    // }

    // if (cursors.left.isDown)
    // {
    //     rocket.body.angularVelocity = -100;
    // }

    // else if (cursors.right.isDown)
    // { 
    //     rocket.body.angularVelocity = 100;
    // }

    // else
    // {
    //     rocket.body.angularVelocity = 0;
    // }
}
//---------------------------------------------------------------------------------------------------------------------------

function fuel(){
    healthBar.width-=3;
}


function collect(rocket,st){

    if(healthBar.width<universe.world.width && st.taken==0){
        st.taken++;
        healthBar.width+=350;
    }

    st.visible = false;
}

//})();
