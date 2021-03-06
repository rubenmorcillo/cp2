var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BattleScene ()
        {
            Phaser.Scene.call(this, { key: 'BattleScene' });
        },
    create: function ()
    {
        // set the background of the main scene green
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        // Run UI Scene at the same time
        this.scene.run('UIScene');
        var timeEvent = this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
        this.sys.events.on('wake', this.wake, this);

    },
    exitBattle: function() {
        this.scene.sleep('UIScene');
        this.scene.switch('WorldScene');
    },
    wake: function() {
        this.scene.run('UIScene');
        this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
    },
    checkEndBattle: function() {
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    },
    endBattle: function() {
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('WorldScene');
    },
    nextTurn: function() {
        // if we have victory or game over
        if(this.checkEndBattle()) {
            this.endBattle();
            return;
        }
        do {
            // currently active unit
            this.index++;
            // if there are no more units, we start again from the first one
            if(this.index >= this.units.length) {
                this.index = 0;
            }
        } while(!this.units[this.index].living);
        // if its player hero
        if(this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random living hero to be attacked
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while(!this.heroes[r].living)
            // call the enemy's attack function
            this.units[this.index].attack(this.heroes[r]);
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }
});

var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function UIScene ()
        {
            Phaser.Scene.call(this, { key: 'UIScene' });
        },

    create: function ()
    {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);
    }
});