var Message = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Container,
 
    initialize:
    function Message(scene, events) {
        Phaser.GameObjects.Container.call(this, scene, 460, 60);
        var graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(15, 35, 400, 280);
        graphics.fillRect(15, 35, 400, 280);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, "message", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 400, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(-0.2, -5);
        events.on("Message", this.showMessage, this);
        this.visible = false;
    },
    showMessage: function(text) {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 1500, callback: this.hideMessage, callbackScope: this });
    },
    hideMessage: function() {
        this.hideEvent = null;
        this.visible = false;
    }
});