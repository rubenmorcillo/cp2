var UIScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function UIScene ()
    {
        Phaser.Scene.call(this, { key: 'UIScene' });
    },
    
    remapHeroes: function() {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    },
    remapEnemies: function() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowLeft" || event.code === "Shift") {
 
            } else if(event.code === "Enter" || event.code === "ArrowRight"){
                this.currentMenu.confirm();
            } 
        }
    },
    onPlayerSelect: function(id) {
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies: function() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    },
    //ESTO VA AQUI??
     onEnemy: function(index) {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    },
    
    create: function ()
    {    
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(230, 460, 200, 100);
        this.graphics.fillRect(230, 460, 200, 100);
        this.graphics.strokeRect(431, 480, 600, 80);
        this.graphics.fillRect(431, 480, 600, 80);
        this.graphics.strokeRect(932, 460, 200, 100);
        this.graphics.fillRect(932, 460, 200, 100);

         // basic container to hold all menus
        this.menus = this.add.container();
                
        this.heroesMenu = new HeroesMenu(230, 460, this);
        this.actionsMenu = new ActionsMenu(431, 480, this);
        this.enemiesMenu = new EnemiesMenu(932, 460, this);
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);
        
        this.battleScene = this.scene.get('BattleScene');
        
        this.remapHeroes();
        this.remapEnemies();

        //aqui le decimos q al pulsar una tecla haga nuestra funcion onKeyInput
        this.input.keyboard.on('keydown', this.onKeyInput, this);
        
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
        
        this.events.on("SelectEnemies", this.onSelectEnemies, this);
        
        this.events.on("Enemy", this.onEnemy, this);
        
        this.battleScene.nextTurn();
        
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

    }
    
    
});