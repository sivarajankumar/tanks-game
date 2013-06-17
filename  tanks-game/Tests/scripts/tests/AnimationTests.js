﻿module("Test Animation class ", {
    setup: function () {
        this.test = new Animation("testurl.com", 10,10,5,1);
    }, teardown: function () {
        delete this.test;
    }
});
test("When Animation  is initialized set correct values", function () {

    var url =  "testurl.com";
    var width = 10;
    var numberOfFrames = 10;
    var currentFrame = 5;
    var rate = 1;
    deepEqual(url, this.test.url, "Property url set successfully ");
    deepEqual(width, this.test.width, "Property width set successfully");
    deepEqual(numberOfFrames, this.test.numberOfFrames, "Property numberOfFrames set successfully");
    deepEqual(currentFrame, this.test.currentFrame, "Property currentFrame set successfully");
    deepEqual(rate, this.test.rate, "Property rate set successfully");
});
