﻿module("Test GameObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test GameObject constructor", function () {

    var test = new gameObjectsNS.GameObject(1, 10);
    deepEqual(test.returnProperty(), { image:1, topLeft:10 }, "Object constructed successfully");
});

module("Test StaticObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test StaticObject constructor", function () {

    var test = new gameObjectsNS.StaticObject(1, 10);
    deepEqual(test.returnProperty(), { image: 1, topLeft: 10 }, "Object constructed successfully");
});

module("Test MovingObject class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test MovingObject constructor", function () {

    var test = new gameObjectsNS.MovingObject(1, 10, 100);
    deepEqual(test.returnProperty(), { image: 1, topLeft: 10, speed: 100 }, "Object constructed successfully");
});
/*
test("Test MovingObject move method", function () {

    var test = new gameObjectsNS.MovingObject(1, 10, 100);
    test.move();
    deepEqual(test.returnProperty(), { image: 1, topLeft: 10, speed: 100 }, "Object updated successfully");
});
*/