var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BootScene ()
        {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function ()
    {
        // load the resources here
        //mapa de tiles (la imagen con todos los tiles)
        this.load.image('tiles', '../../../src/phaser2/pokemapa1.png');

        //mapa en formato JSON
        this.load.tilemapTiledJSON('map', '../../../src/phaser2/colisiones2.json');

        //nuestros personajes
        // this.load.spritesheet('player' , '../../../src/phaser2/playersprites.jpg', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player' , '../../../src/phaser2/player.png', {frameWidth: 16, frameHeight: 22});
        this.load.spritesheet('playerArriba' , '../../../src/phaser2/playerArriba.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerAbajo' , '../../../src/phaser2/playerAbajo.png', {frameWidth: 16, frameHeight: 16});



    },

    create: function ()
    {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WorldScene ()
        {
            Phaser.Scene.call(this, { key: 'WorldScene' });
        },
    preload: function ()
    {

    },
    create: function ()
    {
        var map = this.make.tilemap({key: 'map'});

        var tiles = map.addTilesetImage('pokemapa1', 'tiles');

        var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        var obstacles2 = map.createStaticLayer('Extra', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        obstacles2.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(100,200,'player', 6);
        this.player.displayWidth = 35;
        //scale evenly
        this.player.scaleY = this.player.scaleX;

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, obstacles);
        this.physics.add.collider(this.player, obstacles2);


    },
    update: function (time, delta)
    {
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};
var game = new Phaser.Game(config);