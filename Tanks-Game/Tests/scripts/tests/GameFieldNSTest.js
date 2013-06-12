﻿module("Test Field class ", {
    setup: function () {
   
    }, teardown: function () {
     
    }
});
test("Test Field constructor", function () {
    
    var test =new gameFieldNS.Field(1, 1, 1);
    deepEqual(test.returnProperty(), { container: 1, height: 1, width: 1 }, "Object constructed successfully");
});


module("Test FieldPosition Class", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test FieldPosition Constructor  ", function () {

    var test = new gameFieldNS.FieldPosition(2, 2);
    deepEqual(test.returnProperty(), { xCoord: 2, yCoord: 2}, "Object constructed successfully");
});
test("Test FieldPosition update method  ", function () {

    var test = new gameFieldNS.FieldPosition(2, 2);
    var delta = new gameFieldNS.FieldPosition(2, 0);
    test.update(delta);
    deepEqual(test.returnProperty(), { xCoord: 4, yCoord: 2 }, "Object coordinates updated successfully");
});

