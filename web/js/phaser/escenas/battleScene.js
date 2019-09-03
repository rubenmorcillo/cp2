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
            if(this.units[this.index] instanceof Aliado) {
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

        //CREO LOS PERSONAJES
        //aqui tendría q llamar a la base de datos para comprobar las estadisticas

        var a_hp = 100;
        var a_atq = 12;
        var a_def = 4;
        var a_speed = 1;

        var soldadoAliado = new Aliado(this, 300, 200, 'player',1,'aliado', a_hp,a_atq,a_def, a_speed );
        this.add.existing(soldadoAliado);


        var e_hp = 60;
        var e_atq = 5;
        var e_def = 2;
        var e_speed = 1;

        var soldadoEnemigo = new Enemigo(this, 1020, 220, 'enemigo', 3, 'esbirro', e_hp,e_atq,e_def,e_speed);
        this.add.existing(soldadoEnemigo);

        
        // array con aliados (heroes)
        this.heroes = [ soldadoAliado ];
        // array con enemigos
        this.enemies = [ soldadoEnemigo ];
        // array todos soldados que atacarán
        this.units = this.heroes.concat(this.enemies);
        
        // Run UI Scene at the same time
        this.scene.launch('UIScene');
        
        this.index = -1;
    }
});