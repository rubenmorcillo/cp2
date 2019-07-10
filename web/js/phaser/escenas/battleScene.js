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
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        
        // player character - warrior
        var warrior = new PlayerCharacter(this, 100, 100, 'player', 1, 'Warrior', 100, 20);        
        this.add.existing(warrior);
        
        // player character - mage
        var mage = new PlayerCharacter(this, 100, 250, 'player', 3, 'Mage', 80, 8);
        this.add.existing(mage);            
        
        var dragonblue = new Enemy(this, 550, 100, 'player', 3, 'Dragon', 50, 3);
        this.add.existing(dragonblue);
        
        var dragonOrange = new Enemy(this, 550, 250, 'player', 3,'Dragon2', 50, 3);
        this.add.existing(dragonOrange);
        
        // array with heroes
        this.heroes = [ warrior, mage ];
        // array with enemies
        this.enemies = [ dragonblue, dragonOrange ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        
        // Run UI Scene at the same time
        this.scene.launch('UIScene');
        
        this.index = -1;
    }
});