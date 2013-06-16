﻿var scoresNS = (function () {
    var Score = Class.create({
        initialize: function (name, points) {
            this.name = name;
            this.points = points;
        }
    });

    var ScoreBoard = Class.create({
        initialize: function (container, width, height) {
            this.container = container;
            this.width = width;
            this.height = height;
            this.scores = [];
        },
        add: function (newScore) {
            this.scores.push(newScore);
        },
        _getTopScores: function () {
            var topScores, i;
            this.scores.orderBy(this._orderScores);

            topScores = [];
            i = 0;
            while (i < 5 && i < this.scores.length) {
                topScores.push(this.scores[i]);
                i++;
            }

            return topScores;
        },
        getRendered: function () {
            var container, topScoresList, i, topScoresCount, topScores;
            container = $("<div></div>");
            container.attr("id", "top-scores");
            topScoresList = $("<ul></ul>");
            topScores = this._getTopScores;
            topScoresCount = topScores.length;
            for (i = 0; i < topScoresCount; i++) {
                topScoresList.append($("<li></li>").html(topScores[i]));
            }

            container.append(topScoresList);
            return container;
        },
        _orderScores: function (firstScore, secondScore) {
            return firstScore.points - secondScore.points;
        }
    });

    return {
        Score: Score,
        ScoreBoard: ScoreBoard
    }
})();