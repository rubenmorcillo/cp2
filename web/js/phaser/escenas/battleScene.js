var BattleScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function BattleScene ()
    {
        Phaser.Scene.call(this, { key: 'BattleScene' });
    },
    
    nextTurn: function() {
        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
            this.index = 0;
        }
        if(this.units[this.index]) {
            // if its player hero
            if(this.units[this.index] instanceof PlayerCharacter) {                
                this.events.emit('PlayerSelect', this.index);
            } else { // else if its enemy unit
                // pick random hero
                var r = Math.floor(Math.random() * this.heroes.length);
                // call the enemy's attack function 
                this.units[this.index].attack(this.heroes[r]);  
                // add timer for the next turn, so will have smooth gameplay
                this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
            }
        }
    },
     receivePlayerSelection: function(action, target) {
        if(action == 'attack') {            
            this.units[this.index].attack(this.enemies[target]);              
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    },
    create: function ()
    {
         // change the background to green
        this.cameras.main.setBackgroundColor('rgba(150, 180, 180, 0.5)');

        //aqui tendría q llamar a la base de datos para comprobar las estadisticas

        // player character - warrior
        var warrior = new PlayerCharacter(this, 300, 220, 'player', 1, 'Warrior', 100, 20);
        // warrior.setScale(0.5);
        this.add.existing(warrior);
        
        // player character - mage
        // var mage = new PlayerCharacter(this, 100, 250, 'player', 3, 'Mage', 80, 8);
        // this.add.existing(mage);
        
        var dragonblue = new Enemy(this, 1020, 220, 'enemigo', 3, 'Dragon', 50, 3);
        // dragonblue.setScale(0.05);
        this.add.existing(dragonblue);
        
        // var dragonOrange = new Enemy(this, 550, 250, 'player', 3,'Dragon2', 50, 3);
        // this.add.existing(dragonOrange);
        
        // array with heroes
        this.heroes = [ warrior ];
        // array with enemies
        this.enemies = [ dragonblue ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        
        // Run UI Scene at the same time
        this.scene.launch('UIScene');
        
        this.index = -1;
    }
});