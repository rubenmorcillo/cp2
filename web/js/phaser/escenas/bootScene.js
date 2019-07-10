var BootScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload: function ()
    {
        // load resources
        this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 124, frameHeight: 170 });
//        this.load.image('dragonblue', 'assets/dude.png');
//        this.load.image('dragonorrange', 'assets/dude.png');
    },
 
    create: function ()
    {
        this.scene.start('BattleScene');
    }
});