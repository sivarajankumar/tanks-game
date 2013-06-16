﻿module("Test Score class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("When Score is initialized set correct values", function () {

    var test = new scoresNS.Score("pesho", 10);
    var name = "pesho";
    var points = 10;
    deepEqual(name, test.name, "Property name set successfully");
    deepEqual(points, test.points, "Property points set successfully");
});

module("Test ScoreBoard class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("When ScoreBoard is initialized set correct values", function () {

    var test = new scoresNS.ScoreBoard(1,2,3);
    var container = 1;
    var width = 2;
    var height = 3;
    deepEqual(container, test.container, "Container property set successully");
    deepEqual(width, test.width, "Width property set successully");
    deepEqual(height, test.height, "Height property set successully");
});
test("When ScoreBoard add method is used property field is updated correctly", function () {

    var test = new scoresNS.ScoreBoard(1, 2, 3);
    test.add(0);
    test.add(42);
    var newScore = [0,42];
    deepEqual(newScore,test.scores, "Score updated successfully");
});
test("Test ScoreBoard _orderScores method", function () {

    var firstPlayerScore = new scoresNS.Score("pesho", 2);
    var secondPlayerScore = new scoresNS.Score("mimi", 3);
    var scoreboard = new scoresNS.ScoreBoard(1, 1, 1);
    var expected = scoreboard._orderScores(firstPlayerScore, secondPlayerScore);
    deepEqual(expected,-1, "The two scores were successfully sorted");
});

