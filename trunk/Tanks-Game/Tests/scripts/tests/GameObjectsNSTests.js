﻿module("Test GameObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("When GameObject  is initialized set correct values", function () {

    var test = new gameObjectsNS.GameObject(1, 10);
    var image = 1;
    var topLeft = 10;
    deepEqual(image, test.image, "Property image set successfully");
    deepEqual(topLeft, test.topLeft, "Property topLeft set successfully");
});

module("Test StaticObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("WhenStaticbject  is initialized set correct values", function () {

    var test = new gameObjectsNS.StaticObject(1, 10);
    var image = 1;
    var topLeft = 10;
    deepEqual(image, test.image, "Property image set successfully");
    deepEqual(topLeft, test.topLeft, "Property topLeft set successfully");
});


module("Test MovingObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("When MovingObject  is initialized set correct values", function () {

    var test = new gameObjectsNS.MovingObject(1, 10, 100);
    var image = 1;
    var topLeft = 10;
    var speed = 100;
    deepEqual(image, test.image, "Property image set successfully");
    deepEqual(topLeft, test.topLeft, "Property topLeft set successfully");
    deepEqual(speed, test.speed, "Property speed set successfully");
});
