module("Test Score class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test Score constructor", function () {

    var test = new scoresNS.Score("pesho", 10);
    deepEqual(test.returnProperty(), { name: "pesho", points: 10}, "Object constructed successfully");
});

module("Test ScoreBoard class ", {
    setup: function () {

    }, teardown: function () {

    }
});
test("Test ScoreBoard constructor", function () {

    var test = new scoresNS.ScoreBoard(1,1,1);
    deepEqual(test.returnProperty(), { container: 1, width: 1,height:1, scores:[] }, "Object constructed successfully");
});
test("Test ScoreBoard add method", function () {

    var test = new scoresNS.ScoreBoard(1, 1, 1);
    test.add(10);
    deepEqual(test.returnProperty(), { container: 1, width: 1, height: 1, scores: [10] }, "Score added successfully");
});

