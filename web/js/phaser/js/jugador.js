var PlayerCharacter = new Phaser.Class({
    Extends: Unit,
 
    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        this.setScale(0.1);
        // flip the image so I don't have to edit it manually
        
//        this.setScale(2);
    }
});