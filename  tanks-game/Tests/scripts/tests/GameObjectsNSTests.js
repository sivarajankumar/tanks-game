﻿module("Test GameObject class ", {
    setup: function () {   
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        var animation = "animation"
       
        this.test = new gameObjectsNS.GameObject("testID",animation,options);
    }, teardown: function () {
        delete this.test;
    }
});
test("When GameObject  is initialized set correct values", function () {

    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    
    var animation = "animation"
    var id = "testID"
    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
});

module("Test StaticObject class ", {
    setup: function () {
        var animation = "animation"
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        this.test = new gameObjectsNS.StaticObject("testID", animation, options);
    }, teardown: function () {

    }
});
test("When Staticbject  is initialized set correct values", function () {

    var animation = "animation"
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    var id = "testID"
    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
});

module("Test MovingObject class ", {
    setup: function () {
        var animation = "animation"
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
         this.test = new gameObjectsNS.MovingObject("testID", animation,100,options); 
    }, teardown: function () {
        delete this.test;
    }
});
test("When MovingObject  is initialized set correct values", function () {

    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);

    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(speed, this.test.speed, "Property speed set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
});

module("Test BrickWall class ", {
    setup: function () {
        var animation = "animation";
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        this.test = new gameObjectsNS.BrickWall("testID", animation, options);
    }, teardown: function () {
        delete this.test;
    }
});
test("When BrickWall  is initialized set correct values", function () {

    var animation = "animation";
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    var isDestroyed = false;
    var id = "testID"
    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
    equal(isDestroyed, this.test.isDestroyed, "Property isDesroyed set correctly");
});

module("Test SteelWall class ", {
    setup: function () {
        var animation = "animation";
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        this.test = new gameObjectsNS.SteelWall("testID", animation, options);
    }, teardown: function () {

    }
});
test("When SteelWall  is initialized set correct values", function () {

    var animation = "animation";
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
  
    var id = "testID"
    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
});

module("Test PlayerTank class ", {
    setup: function () {
        var animation = "animation";
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        this.test = new gameObjectsNS.PlayerTank("testID", animation, 100, options);
    }, teardown: function () {
        delete this.test;
    }
});
test("When PlayerTank  is initialized set correct values", function () {
    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var isAlive = true;
    var isMoving = false;
    var canShoot = true;
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);

    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(speed, this.test.speed, "Property speed set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
    deepEqual(isAlive, this.test.isAlive, "Property isAlive set successfully");
    deepEqual(isMoving, this.test.isMoving, "Property isMoving set successfully");
    deepEqual(canShoot, this.test.canShoot, "Property canShoot set successfully");
});

test("When PlayerTank  shoot", function () {

    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var isAlive = true;
    var isMoving = false;
    var canShoot = true;
    var direction = "down";
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    var x = this.test.shoot(id, animation, speed, options, this.direction, false);
   //var t= x.shoot(id, animation, speed, options, direction, true);
    var bulet = new gameObjectsNS.Bullet(id, animation, speed, options,this.direction,false);
    deepEqual(bulet, x);
});

module("Test EnemyTank class ", {
    setup: function () {
        var animation = "animation"
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);
        this.test = new gameObjectsNS.PlayerTank("testID", animation, 100, options);
    }, teardown: function () {
        delete this.test;
    }
});
test("When EnemyTank  is initialized set correct values", function () {

    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var isAlive = true;
    var isMoving = false;
    var canShoot = true;
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);

    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(speed, this.test.speed, "Property speed set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
    deepEqual(isAlive, this.test.isAlive, "Property isAlive set successfully");
    deepEqual(isMoving, this.test.isMoving, "Property isMoving set successfully");
    deepEqual(canShoot, this.test.canShoot, "Property canShoot set successfully");
});

test("When EnemyTank  shoot", function () {

    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var isAlive = true;
    var isMoving = false;
    var canShoot = true;
    var direction = "down";
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);

    var x = this.test.shoot(id, animation, speed, options, this.direction, false);
    var bulet = new gameObjectsNS.Bullet(id, animation, speed, options, this.direction, false);
    deepEqual(bulet, x);
});

module("Test Bullet class ", {
    setup: function () {
        var animation = "animation";
        var options = $.extend({
            x: 0,
            y: 0,
            width: 34,
            height: 34,
            flipH: false,
            flipV: false,
            rotate: 0,
            scale: 1
        }, options);

        this.test = new gameObjectsNS.Bullet("testID", animation, 100, options);

    }, teardown: function () {
        delete this.test;
    }
});
test("When Bullet  is initialized set correct values", function () {
    var animation = "animation";
    var speed = 100;
    var id = "testID";
    var isDestroyed = false;
    var options = $.extend({
        x: 0,
        y: 0,
        width: 34,
        height: 34,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);

    deepEqual(id, this.test.id, "Property id set successfully");
    deepEqual(animation, this.test.animation, "Property animation set successfully");
    deepEqual(speed, this.test.speed, "Property speed set successfully");
    deepEqual(options, this.test.options, "Property options set successfully");
    deepEqual(isDestroyed, this.test.isDestroyed, "Property isDestroyed set successfully");

});