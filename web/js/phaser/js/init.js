var config = {
    type: Phaser.AUTO,
    parent: 'container',
    width: 1350,
    height: 600,
    zoom: 1,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ BootScene, BattleScene, UIScene ]
};
 
var game = new Phaser.Game(config);

function preload(){
    
}

function create(){

}

function update(time,delta){
  
}

