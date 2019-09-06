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
        var imgAliado = '../../src/pjs/'+ leeAliado.imagen;
        console.log(imgAliado);
        this.load.spritesheet('player', imgAliado, {frameWidth: 1200, frameHeight: 1400 });
        this.load.spritesheet('enemigo', '../../src/pjs/pj5.jpg', {frameWidth: 1200, frameHeight: 1400});
//
    },
 
    create: function ()
    {
        this.scene.start('BattleScene');
    }
});