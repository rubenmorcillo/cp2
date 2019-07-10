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
            } else if(event.code === "ArrowRight" || event.code === "Shift") {
 
            } else if(event.code === "Space" || event.code === "ArrowLeft") {
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
        this.graphics.strokeRect(1, 379, 160, 100);
        this.graphics.fillRect(1, 379, 160, 100);
        this.graphics.strokeRect(160, 379, 320, 100);
        this.graphics.fillRect(160, 379, 320, 100);
        this.graphics.strokeRect(480, 379, 160, 100);
        this.graphics.fillRect(480, 379, 160, 100);
        
         // basic container to hold all menus
        this.menus = this.add.container();
                
        this.heroesMenu = new HeroesMenu(1, 379, this);           
        this.actionsMenu = new ActionsMenu(160, 379, this);            
        this.enemiesMenu = new EnemiesMenu(480, 379, this);   
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);
        
        this.battleScene = this.scene.get('BattleScene');
        
        this.remapHeroes();
        this.remapEnemies();
        
        this.input.keyboard.on('keydown', this.onKeyInput, this);
        
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
        
        this.events.on("SelectEnemies", this.onSelectEnemies, this);
        
        this.events.on("Enemy", this.onEnemy, this);
        
        this.battleScene.nextTurn();
        
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

    }
    
    
});