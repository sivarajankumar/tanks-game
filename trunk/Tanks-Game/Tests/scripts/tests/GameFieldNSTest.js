﻿module("Test Field class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("When Field is initialized, should set the correct values", function () {
    var container = 1;
    var width = 2;
    var height = 3;
    var test = new gameFieldNS.Field(1, 2, 3);
    deepEqual(container, test.container, "Container property set successully");
    deepEqual(width, test.width, "Width property set successully");
    deepEqual(height, test.height, "Height property set successully");
});


module("Test FieldPosition Class", {
    setup: function () {

    }, teardown: function () {

    }
});

test("When FieldPosition is initialized, should set the correct values", function () {

   // var test = new gameFieldNS.FieldPosition(2, 2);
    var xCoord = 2
    var yCoord = 2 
    var test = new gameFieldNS.FieldPosition(2,2);
    equal(xCoord, test.xCoord, "xCoord property set correctly");
    equal(yCoord, test.yCoord, "yCoord property set correctly");
});
test("When FieldPosition is updated, should set the correct values", function () {

    var test = new gameFieldNS.FieldPosition(2, 2);
    var delta = new gameFieldNS.FieldPosition(2, 0);
    var xCoord = 4
    var yCoord = 2
    test.update(delta);
    equal(xCoord, test.xCoord, "xCoord property updated correctly");
    equal(yCoord, test.yCoord, "yCoord property updated correctly");
   
});

