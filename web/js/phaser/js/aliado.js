var Aliado = new Phaser.Class({
    Extends: Soldado,
 
    initialize:
    function Aliado(scene, x, y, texture, frame, type, hp, atq, def, speed) {
        Soldado.call(this, scene, x, y, texture, frame, type, hp, atq, def, speed);
        this.setScale(0.1);
        // flip the image so I don't have to edit it manually
        
//        this.setScale(2);
    }
});