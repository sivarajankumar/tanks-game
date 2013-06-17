﻿module("Test GridPosition Class", {
    setup: function () {
        this.test = new GridPosition(2, 2);
    }, teardown: function () {
        delete this.test;
    }
});

test("When GridPosition is initialized, should set the correct values", function () {

    var xCoord = 2
    var yCoord = 2 
   
    equal(xCoord, this.test.xCoord, "xCoord property set correctly");
    equal(yCoord, this.test.yCoord, "yCoord property set correctly");
});
test("When GridPosition is updated, should set the correct values", function () {

    var delta = new GridPosition(2, 0);
    var xCoord = 4
    var yCoord = 2
    this.test.update(delta);
    equal(xCoord, this.test.xCoord, "xCoord property updated correctly");
    equal(yCoord, this.test.yCoord, "yCoord property updated correctly");
   
});

