$(function () {
    var playerPoints = 0;

    var tankAnimSmall = new engine.animation({
        url: "images/tank1.png",
        numberOfFrames: 2,
        rate: 200,
        width: 34,
    })

     var tankAnimBig = new engine.animation({
        url: "images/tank2.png",
        numberOfFrames: 2,
        rate: 200,
        width: 34,
    })

      var tankAnimBigger = new engine.animation({
        url: "images/tank3.png",
        numberOfFrames: 2,
        rate: 200,
        width: 34,
    })

    var bulletAnimation = new engine.animation({
        url: "images/button.png",
        numberOfFrames: 1,
        rate: 200,
        width: 10,
    })

    var playerAnimation = {
        move: new engine.animation({
            url: "images/player-tank.png",
            numberOfFrames: 2,
            rate: 200,
            width: 34,
        }),
        stand: new engine.animation({
            url: "images/player-tank.png",
            numberOfFrames: 1,
            rate: 200,
            width: 34,
        })
    };

    var standardTankOptions = {
        x: 334,
        y: 334,
        width: 34,
        height: 34,
    }

    var tiles = [
        new engine.animation({
            url: "images/tiles.png"
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 34
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 68
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 102
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 136
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 170
        }),
        new engine.animation({
            url: "images/tiles.png",
            offset: 204
        }),
    ];

    var level = [[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                 [6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                 [6, 0, 0, 1, 1, 1, 0, 0, 0, 6, 0, 0, 0, 2, 2, 2, 0, 0, 0, 6],
                 [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 6],
                 [6, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6],
                 [6, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 6],
                 [6, 0, 2, 0, 2, 0, 6, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 6],
                 [6, 0, 2, 0, 2, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6],
                 [6, 0, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6],
                 [6, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 6],
                 [6, 0, 1, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 6],
                 [6, 0, 1, 0, 0, 0, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6],
                 [6, 0, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                 [6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                 [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]];

    var container, tilemap;
    var player = new gameObjectsNS.PlayerTank("player-tank", playerAnimation, 50, { x: 600, y: 60 });

    $("#startButton").click(function () {
        engine.startGame(initialize);
    });

    var initialize = function () {
        $("#myGame").append("<div id='container' style='display: none; width: 680px; height: 480px; background-color: black;'>");

        container = $("#container");
        group = engine.addGroup(container, "group");
        tilemap = engine.addTilemap(group, "level", { tileWidth: 34, tileHeight: 34, width: 20, height: 15, map: level, animations: tiles });

        player.container = engine.addSprite(container, "player-tank", { x: 600, y: 60, width: 34, height: 34 });

        engine.setAnimation(player.container, playerAnimation.stand);

        engine.addCallback(gameLoop, 100);
        engine.addCallback(changeDirections, 600);
        engine.addCallback(addTanks, 2000);
        engine.addCallback(moveBullets, 60);
        engine.addCallback(shootTanks, 1303);

        $("#startButton").remove();
        container.css("display", "block");
    }

    var tanks = [];
    var bullets = [];
    var changeDirections = function () {
        for (var i = 0; i < tanks.length; i++) {
            tanks[i].changeDirection();
        }
    }

    var moveTanks = function () {
        for (var i = 0; i < tanks.length; i++) {
            var movements = tryMoveObject(tanks[i], tanks[i].direction);
            updateMovingObject(tanks[i], movements.horizontalMove, movements.verticalMove)
        }
    }

    var addTanks = function () {
        if (tanks.length < 10) {
            var newTank = new gameObjectsNS.EnemyTank("tank" + tanks.length, tankAnimSmall, 5, standardTankOptions);
            var randomNumber = (Math.random() * 3) | 0;
            switch (randomNumber) {
                case 0:
                    engine.setAnimation(newTank.container, tankAnimSmall);
                    break;
                case 1:
                    engine.setAnimation(newTank.container, tankAnimBig);
                    break;
                case 2:
                    engine.setAnimation(newTank.container, tankAnimBigger);
                    break;
            }
            container.append(newTank.container);
            tanks.push(newTank);
        }
    }

    var shootTanks = function () {
        for (var i = 0; i < tanks.length; i++) {
            createBullet(tanks[i], true);
        }
    }

    var createBullet = function (shootingObject, isEnemy) {
        var posX;
        var posY;
        switch (shootingObject.direction) {
            case "left":
                posX = shootingObject.options.x;
                posY = shootingObject.options.y + 10;;
                break;
            case "right":
                posX = shootingObject.options.x + shootingObject.options.width;
                posY = shootingObject.options.y + 10;
                break;
            case "up":
                posX = shootingObject.options.x + 10;
                posY = shootingObject.options.y;
                break;
            default:
                posX = shootingObject.options.x + 10;
                posY = shootingObject.options.y + shootingObject.options.height;
                break;
        }

        var bulletOptions = {
            x: posX,
            y: posY,
            width: 5,
            height: 5,
        }

        newBullet = shootingObject.shoot("bullet" + shootingObject.id + bullets.length, bulletAnimation, 15,
            bulletOptions, shootingObject.direction, isEnemy);
        if (newBullet) {
            engine.setAnimation(newBullet.container, bulletAnimation);
            container.append(newBullet.container);
            bullets.push(newBullet);
        }
    }

    var moveBullets = function () {
        var removedBullets = [];
        var movements;
        var isMoved;
        for (var i = 0; i < bullets.length; i++) {
            movements = tryMoveObject(bullets[i], bullets[i].direction, bullets[i].speed);
            isMoved = updateBullet(bullets[i], movements.horizontalMove, movements.verticalMove);
            if (!isMoved) {
                removedBullets.push(bullets[i]);
            }
        }

        for (var j = 0; j < removedBullets.length; j++) {
            for (var i = 0; i < bullets.length; i++) {
                if (bullets[i] == removedBullets[j]) {
                    bullets.splice(i, 1);
                    break;
                }
            }
        }
    }

    var tryMoveObject = function (gameObject, direction, inputStep) {
        var step = 5;
        var horizontalMove = 0;
        var verticalMove = 0;

        if (inputStep) step = inputStep;
        switch (direction) {
            case "left":
                horizontalMove = -step;
                engine.transform(gameObject, { rotate: 0, flipH: true });
                break;
            case "right":
                horizontalMove = step;
                engine.transform(gameObject, { rotate: 0, flipH: false });
                break;
            case "up":
                verticalMove = -step;
                engine.transform(gameObject, { rotate: -90, flipH: false });
                break;
            default:
                verticalMove = step;
                engine.transform(gameObject, { rotate: 90, flipH: false });
                break;
        }

        return {
            horizontalMove: horizontalMove,
            verticalMove: verticalMove
        }
    }

    var updateBullet = function (bullet, horizontalMove, verticalMove) {
        var newY = engine.y(bullet) + verticalMove;
        var newX = engine.x(bullet) + horizontalMove;
        var newW = engine.width(bullet);
        var newH = engine.height(bullet);

        var collisions = engine.tilemapCollide(tilemap, { x: newX, y: newY, width: newW, height: newH });
        if (collisions.length > 0) {
            bullet.remove();
            return false;
        }

        if (bullet.isEnemy) {
            if (engine.objectCollide(bullet, player)) {
                player.remove();
                bullet.remove();
                endGame();
                return false;
            }
        }
        else {
            for (var i = 0; i < tanks.length; i++) {
                if (engine.objectCollide(tanks[i], bullet)) {
                    tanks[i].remove();
                    bullet.remove();
                    tanks.splice(i, 1);

                    playerPoints += 10;
                    return false;
                }
            }
        }

        engine.x(bullet, newX);
        engine.y(bullet, newY);
        return true;
    }

    var updateMovingObject = function (gameObject, horizontalMove, verticalMove) {
        var newY = engine.y(gameObject) + verticalMove;
        var newX = engine.x(gameObject) + horizontalMove;
        var newW = engine.width(gameObject);
        var newH = engine.height(gameObject);

        var collisions = engine.tilemapCollide(tilemap, { x: newX, y: newY, width: newW, height: newH });
        var i = 0;
        while (i < collisions.length > 0) {
            var collision = collisions[i];
            collision.options = {
                x: collision.data("engine").x, y: collision.data("engine").y, width: collision.data("engine").width,
                height: collision.data("engine").height
            };
            i++;
            var collisionBox = {
                x1: engine.x(collision),
                y1: engine.y(collision),
                x2: engine.x(collision) + engine.width(collision),
                y2: engine.y(collision) + engine.height(collision)
            };

            var x = engine.intersect(newX, newX + newW, collisionBox.x1, collisionBox.x2);
            var y = engine.intersect(newY, newY + newH, collisionBox.y1, collisionBox.y2);

            var diffx = (x[0] === newX) ? x[0] - x[1] : x[1] - x[0];
            var diffy = (y[0] === newY) ? y[0] - y[1] : y[1] - y[0];
            if (Math.abs(diffx) > Math.abs(diffy)) {
                newY -= diffy;
            } else {
                newX -= diffx;
            }
        }

        for (var i = 0; i < tanks.length; i++) {
            if (tanks[i] !== gameObject) {
                var x = engine.intersect(newX, newX + newW, tanks[i].options.x, tanks[i].options.x + tanks[i].options.width);
                var y = engine.intersect(newY, newY + newH, tanks[i].options.y, tanks[i].options.y + tanks[i].options.height);

                var diffx = (x[0] === newX) ? x[0] - x[1] : x[1] - x[0];
                var diffy = (y[0] === newY) ? y[0] - y[1] : y[1] - y[0];
                if (Math.abs(diffx) > Math.abs(diffy)) {
                    newY -= diffy;
                } else {
                    newX -= diffx;
                }
            }
        }

        engine.x(gameObject, newX);
        engine.y(gameObject, newY);
    }

    var gameLoop = function () {
        moveTanks();

        var newPosition;
        if (engine.keyboard[37]) {
            player.direction = "left";
            newPosition = tryMoveObject(player, "left", player.speed);
        } else if (engine.keyboard[38]) {
            player.direction = "up";
            newPosition = tryMoveObject(player, "up", player.speed);
        } else if (engine.keyboard[39]) {
            player.direction = "right";
            newPosition = tryMoveObject(player, "right", player.speed);
        } else if (engine.keyboard[40]) {
            player.direction = "down";
            newPosition = tryMoveObject(player, "down", player.speed);
        }

        if (engine.keyboard[32]) {
            createBullet(player, false);
        }

        if (newPosition) {
            updateMovingObject(player, newPosition.horizontalMove, newPosition.verticalMove);
        }
    }

    var endGame = function () {
        player.canShoot = false;
        player.options.x = 680;

        var endGameContainer = $("#endGameContainer");
        endGameContainer.css("display", "block");

        addTwitterFunctionality(endGameContainer);
        addViewScoreBoardFunctionality(endGameContainer);
    }

    function addViewScoreBoardFunctionality(endGameContainer) {
        var scoreBoardContainer = $("<div></div>");
        var scoreBoardForm = $("<form></form>");
        scoreBoardForm.append("<label for='user-name'>Enter your name: </label>");
        scoreBoardForm.append("<input type='text' id='user-name'/>");
        scoreBoardForm.append(($("<input type='submit' value='Submit' />").click(function () {
            var playerName = $('#user-name').val();
            localStorage.setItem(playerName, playerPoints);
        })));

        scoreBoardContainer.append(scoreBoardForm);
        var topScoresContainer = $("<div></div>");
        var topScoresButton = $("<button id='scores-button'>View top scores</button>");
        topScoresButton.click(function () {
            topScoresContainer.html("");
            var scoreBoard = new scoresNS.ScoreBoard();
            for (var i = 0, scoresCount = localStorage.length; i < scoresCount; i++) {
                var key = localStorage.key(i);
                var newScore = new scoresNS.Score(key, localStorage.getItem(key));
                scoreBoard.add(newScore);
            }

            topScoresContainer.append(scoreBoard.getRendered());
            scoreBoardContainer.append(topScoresContainer);;
        });

        scoreBoardContainer.append(topScoresButton);
        endGameContainer.append(scoreBoardContainer);
    }

    function addTwitterFunctionality(endGameContainer) {
        var twitterContainer = $("<div></div>");
        twitterContainer.html('<iframe id="tweet-button" allowtransparency="true" frameborder="0" scrolling="no" \
        src="http://platform.twitter.com/widgets/tweet_button.html?via=DragonFruitTeam&amp;text=Tweet%20Your%20Score:&amp;count=horizontal"; \
        style="width: 110px; height: 20px;"></iframe>');
        endGameContainer.append(twitterContainer);

        function tweet(message) {
            var tweetButton = $('#tweet-button');
            var account = 'DragonFruitTeam';
            var text = message.replace(/ /g, "%20");
            var tButtonSrc = 'http://platform.twitter.com/widgets/tweet_button.html?via=' + account + '&text=' + text + '&count=horizontal';
            tweetButton.attr("src", tButtonSrc);
        };

        tweet("Great game! My points are: " + playerPoints);
    }
})