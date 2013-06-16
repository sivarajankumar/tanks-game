$(function () {
    var tankAnim = new gf.animation({
        url: "images/player-tank.png",
        numberOfFrames: 2,
        rate: 200,
        width: 34,
    })

    var bulletAnim = new gf.animation({
        url: "images/button.png",
        numberOfFrames: 1,
        rate: 200,
        width: 10,
    })

    var playerAnim = {
        move: new gf.animation({
            url: "images/player-tank.png",
            numberOfFrames: 2,
            rate: 200,
            width: 34,
        }),
        stand: new gf.animation({
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

    //Tiles
    var tiles = [
        new gf.animation({
            url: "images/tiles.png"
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 34
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 68
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 102
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 136
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 170
        }),
        new gf.animation({
            url: "images/tiles.png",
            offset: 204
        }),
    ];

    var level = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    			 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 3, 3, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 2, 0, 0, 0, 0, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    			 [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 2, 0, 0, 0, 0, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [5, 5, 5, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 5, 5, 5]];

    //Adding start button
    //start button
    $("#startButton").click(function () {
        //Wait for the images to load then init the game elements
        gf.startGame(initialize);
    });

    //Container for the gameplay Objects;
    var container, tilemap;
    var player = new gameObjectsNS.PlayerTank("player-tank", playerAnim, 5, { x: 600, y: 60 });

    //Game init
    var initialize = function () {
        $("#myGame").append("<div id='container' style='display: none; width: 640px; height: 480px; background-color: black;'>");

        container = $("#container");
        group = gf.addGroup(container, "group");
        tilemap = gf.addTilemap(group, "level", { tileWidth: 34, tileHeight: 34, width: 20, height: 15, map: level, animations: tiles });

        player.container = gf.addSprite(container, "player", { x: 600, y: 60, width: 34, height: 34 });

        gf.setAnimation(player.container, playerAnim.stand);

        gf.addCallback(gameLoop, 100);

        gf.addCallback(changeDirections, 600);

        gf.addCallback(addTanks, 2000);

        gf.addCallback(moveBullets, 60);
        gf.addCallback(shootTanks, 1303);

        $("#startButton").remove();
        container.css("display", "block");
    }

    //Moving Game Objects
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
        if (tanks.length < 9) {
            var newTank = new gameObjectsNS.EnemyTank("tank" + tanks.length, tankAnim, 5, standardTankOptions);
            gf.setAnimation(newTank.container, tankAnim);
            container.append(newTank.container);
            tanks.push(newTank);
        }
    }

    var shootTanks = function () {
        var newBullet;
        for (var i = 0; i < tanks.length; i++) {
            var posX;
            var posY;
            switch (tanks[i].direction) {
                case "left":
                    posX = tanks[i].options.x;
                    posY = tanks[i].options.y + 10;;
                    break;
                case "right":
                    posX = tanks[i].options.x + tanks[i].options.width;
                    posY = tanks[i].options.y + 10;
                    break;
                case "up":
                    posX = tanks[i].options.x + 10;
                    posY = tanks[i].options.y;
                    break;
                default:
                    posX = tanks[i].options.x + 10;
                    posY = tanks[i].options.y + tanks[i].options.height;
                    break;
            }

            var bulletOptions = {
                x: posX,
                y: posY,
                width: 5,
                height: 5,
            }
            newBullet = tanks[i].shoot("bullet" + tanks[i].id + bullets.length, bulletAnim, 15, bulletOptions, tanks[i].direction);
            gf.setAnimation(newBullet.container, bulletAnim);
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
                gf.transform(gameObject, { rotate: 0, flipH: true });
                break;
            case "right":
                horizontalMove = step;
                gf.transform(gameObject, { rotate: 0, flipH: false });
                break;
            case "up":
                verticalMove = -step;
                gf.transform(gameObject, { rotate: -90, flipH: false });
                break;
            default:
                verticalMove = step;
                gf.transform(gameObject, { rotate: 90, flipH: false });
                break;
        }

        return {
            horizontalMove: horizontalMove,
            verticalMove: verticalMove
        }
    }

    var updateBullet = function (bullet, horizontalMove, verticalMove) {
        var newY = gf.y(bullet) + verticalMove;
        var newX = gf.x(bullet) + horizontalMove;
        var newW = gf.width(bullet);
        var newH = gf.height(bullet);

        var collisions = gf.tilemapCollide(tilemap, { x: newX, y: newY, width: newW, height: newH });
        var i = 0;
        if (collisions.length > 0) {
            bullet.remove();
            return false;
        }

        gf.x(bullet, newX);
        gf.y(bullet, newY);
        return true;
    }

    var updateMovingObject = function (gameObject, horizontalMove, verticalMove) {
        var newY = gf.y(gameObject) + verticalMove;
        var newX = gf.x(gameObject) + horizontalMove;
        var newW = gf.width(gameObject);
        var newH = gf.height(gameObject);

        var collisions = gf.tilemapCollide(tilemap, { x: newX, y: newY, width: newW, height: newH });
        var i = 0;
        while (i < collisions.length > 0) {
            var collision = collisions[i];
            collision.options = {
                x: collision.data("gf").x, y: collision.data("gf").y, width: collision.data("gf").width,
                height: collision.data("gf").height
            };
            i++;
            var collisionBox = {
                x1: gf.x(collision),
                y1: gf.y(collision),
                x2: gf.x(collision) + gf.width(collision),
                y2: gf.y(collision) + gf.height(collision)
            };

            var x = gf.intersect(newX, newX + newW, collisionBox.x1, collisionBox.x2);
            var y = gf.intersect(newY, newY + newH, collisionBox.y1, collisionBox.y2);

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
                var x = gf.intersect(newX, newX + newW, tanks[i].options.x, tanks[i].options.x + tanks[i].options.width);
                var y = gf.intersect(newY, newY + newH, tanks[i].options.y, tanks[i].options.y + tanks[i].options.height);

                var diffx = (x[0] === newX) ? x[0] - x[1] : x[1] - x[0];
                var diffy = (y[0] === newY) ? y[0] - y[1] : y[1] - y[0];
                if (Math.abs(diffx) > Math.abs(diffy)) {
                    newY -= diffy;
                } else {
                    newX -= diffx;
                }
            }
        }

        gf.x(gameObject, newX);
        gf.y(gameObject, newY);
    }

    //Main Game Loop
    var gameLoop = function () {
        moveTanks();

        var newPosition;
        if (gf.keyboard[37]) {
            newPosition = tryMoveObject(player, "left", player.speed);
        } else if (gf.keyboard[38]) {
            newPosition = tryMoveObject(player, "up", player.speed);
        } else if (gf.keyboard[39]) {
            newPosition = tryMoveObject(player, "right", player.speed);
        } else if (gf.keyboard[40]) {
            newPosition = tryMoveObject(player, "down", player.speed);
        }

        if (newPosition) {
            updateMovingObject(player, newPosition.horizontalMove, newPosition.verticalMove);
        }
    }

    var endGame = function () {
        gf.removeCallback(gameLoop);

        $("#container").css('display', 'none');
    }

    //Killing he player on crash
    var kill = function () {
        endGame();
    }

    var detectCrash = function () {
        return false;
    }
    //Collision Detection
})

