var Soldado = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
 
    initialize:
 
    function Soldado(scene, x, y, texture, frame, type, hp, atq, def, speed) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame,type, hp, atq, def, speed)
        this.type = type;
        this.atq = atq;
        this.def = def;
        this.speed = speed;
        this.maxHp = this.hp = hp;
    },
    attack: function(target) {
        target.takeDamage(this.atq);
        this.scene.events.emit("Message", this.type + " ataca " + target.type + " con " + this.atq + " de ataque");
    },
    takeDamage: function(atq) {
        this.hp -= atq - this.def;
        this.scene.events.emit("Message", this.type + " = " + this.hp);
        console.log("a "+this.type +" le quedan "+this.hp+ " de vida");


    }
});