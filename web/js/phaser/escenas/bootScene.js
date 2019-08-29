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
        //necesito conseguir la imagen del jugador y el enemigo
        //hago una llamada JSON a la base de datos para la imagen?

        this.load.spritesheet('player', '../../src/pjs/pj4.jpg', {frameWidth: 1200, frameHeight: 1400 });
        this.load.spritesheet('enemigo', '../../src/pjs/pj5.jpg', {frameWidth: 1200, frameHeight: 1400});
//
    },
 
    create: function ()
    {
        this.scene.start('BattleScene');
    }
});