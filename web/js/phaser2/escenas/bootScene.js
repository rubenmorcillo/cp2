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
        this.load.spritesheet('player' , '../../../src/phaser2/player.png', {frameWidth: 16, frameHeight: 25});
        this.load.spritesheet('playerArriba' , '../../../src/phaser2/playerArriba.png', {frameWidth: 16, frameHeight: 22});
        this.load.spritesheet('playerAbajo' , '../../../src/phaser2/playerAbajo.png', {frameWidth: 16, frameHeight: 22});

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
        // //scale evenly
        this.player.scaleY = this.player.scaleX;

        //creando las animaciones
        this.anims.create({
            key: 'quieto',
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {start:0, end:0})
        });

        this.anims.create({
            key: 'derecha',
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3})

        });
        this.anims.create({
            key: 'arriba',
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNames('playerArriba', {start: 0, end: 3})
        });

        this.anims.create({
            key: 'abajo',
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNames('playerAbajo', {start: 0, end: 3})
         });

        this.player.anims.stop();


        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, obstacles);
        this.physics.add.collider(this.player, obstacles2);


        //creamos zonas en el grupo de fisicas q detecten colisiones, para ver cuando encuentra un enemigo
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);


    },
    onMeetEnemy: function(player, zone) {
        //movemos nuestra zona a otra localizacion
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        // efecto de agitar pa darle el toque dramático
        this.cameras.main.shake(300);

        // start battle

    },
    update: function (time, delta)
    {
        this.player.body.setVelocity(0);

        //movimiento
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);


        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);

        }

        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);


        //animaciones
        }
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('derecha', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('derecha', true);

        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('arriba', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('abajo', true);
        }
        else
        {
            this.player.anims.stop();
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
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};
var game = new Phaser.Game(config);