var universe = new Phaser.Game(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.CANVAS);

var game1 = function(){

}

game1.prototype = {
    preload:preload,
    create:create,
    update:update
};

var game2 = function(){

}

game2.prototype = {
    preload:preload2,
    create:create2,
    update:update2
};

universe.state.add('game1',game1);
universe.state.add('game2',game2);
universe.state.start('game1');

var pl = [];
var st = [];
var randX, randY, l=150, h=60;
var rocket, life=100;
var fuel,bmd,background, k = 0;
var score, expl;

//-------------------------------------------------------------------------------------------------------------------------------------------
function preload(){
     universe.load.image('pn1','images/planet1a.png');
     // universe.load.image('pn2','../public/images/planet2.png');
     // universe.load.image('pn3','../public/images/planet3.png');
     universe.load.image('pn4','images/planet4.png');
     // universe.load.image('pn5','../public/images/planet5.png');
      universe.load.image('pn6','images/planet6.png');
     // universe.load.image('pn7','../public/images/planet7.png');
     // universe.load.image('pn8','../public/images/planet10.png');
      universe.load.image('pn9','images/planet11.png');
     // universe.load.image('pn10','../public/images/planet12.png');
      universe.load.image('pn11','images/planet13.png');
    //universe.load.image('pn12','../public/images/planet14.png');
     // universe.load.image('pn13','../public/images/planet15.png');
      universe.load.image('pn14','images/planet16.png');
     // universe.load.image('pn15','../public/images/planet17.png');
     // universe.load.image('pn16','../public/images/planet18.png');
    universe.load.image('pn17','images/planet19.png');
     universe.load.image('pn18','images/planet20.png');
     universe.load.image('star','images/fuel.png');
     universe.load.image('bg','images/space_bg.jpg');
     universe.load.image('ship','images/ship.png');
     universe.load.image('blast','images/blast.png');
}


//-------------------------------------------------------------------------------------------------------------------------------
function create(){
     background = universe.add.tileSprite(0, 0, 1365, 625, 'bg');
     
     universe.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
     universe.scale.setResizeCallback(this.gameResized, this);

     universe.physics.startSystem(Phaser.Physics.ARCADE);
     
     expl = universe.add.sprite(0,0,'blast');
     expl.visible=false;
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

        
        pl[i] = planets.create(1000 , 300 , 'pn1');

        // else if(i%5==0)
        // pl[i] = planets.create(1000 , 300, 'pn4');

        // else if(i%7==0)
        // pl[i] = planets.create(1000 , 300, 'pn6');

        // else if(i%11==0)
        // pl[i] = planets.create(1000 , 300, 'pn11');

        // else if(i%13==0)
        // pl[i] = planets.create(1000 + Math.cos(0), 300 + Math.sin(0), 'pn14');

        // else if(i%17==0)
        // pl[i] = planets.create(1000 + Math.cos(0), 300 + Math.sin(0), 'pn17');

        // else
        // pl[i] = planets.create(1000 + Math.cos(0), 300 + Math.sin(0), 'pn18');


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
        pl[i].body.setSize(100, 72);
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
function update(){

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
        background.tilePosition.x -= 2;              
    }

    else if(cursors.right.isDown){
        rocket.body.velocity.x = 300;
        rocket.angle = 0;
        background.tilePosition.x -= 2;                 
    }

    else if(cursors.up.isDown){
        rocket.body.velocity.y = -300;
        rocket.body.velocity.x = 0;
        rocket.angle = 270; 
        background.tilePosition.x -= 2;                 
    }

    else if(cursors.down.isDown){
        rocket.body.velocity.y = 300;
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
        rocket.body.velocity.x = -300;
        rocket.body.velocity.y = -300;
        rocket.angle = 225;   
        //background.tilePosition.x -= 2;               
    }

    if(cursors.left.isDown && cursors.down.isDown){
        rocket.body.velocity.x = -300;
        rocket.body.velocity.y = 300;
        rocket.angle = 135; 
        //background.tilePosition.x -= 2;                 
    }

    if(cursors.right.isDown && cursors.up.isDown){
        rocket.body.velocity.x = 300;
        rocket.body.velocity.y = -300;
        rocket.angle = 315; 
       // background.tilePosition.x -= 2;                 
    }

    if(cursors.right.isDown && cursors.down.isDown){
        rocket.body.velocity.x = 300;
        rocket.body.velocity.y = 300;
        rocket.angle = 45;
       // background.tilePosition.x -= 2;
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

    universe.physics.arcade.collide(rocket, planets, impact, null, this);
}
//---------------------------------------------------------------------------------------------------------------------------

function impact(){
  
    expl.x = rocket.body.position.x;
    expl.y = rocket.body.position.y;

    expl.visible = true;

    rocket.kill();
    universe.state.start('game2');
}

function fuel(){
    healthBar.width-=5;
}


function collect(rocket,st){

    if(healthBar.width<universe.world.width && st.taken==0){
        st.taken++;
        healthBar.width+=350;
    }

    st.visible = false;
}

function preload2(){

}

function create2(){
        
        score = 5000;
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
}

function update2(){

}

