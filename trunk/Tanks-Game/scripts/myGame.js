$(function () {
    //Initial loading of images
    var totalNumberOfFrame = 6;
    var frameNumber = 0;

    var firstAnim = new gf.animation({
        url: "images/spritesheet_example.png",
        numberOfFrames: 6,
        rate: 300,
        width: 23
    });

    var tankAnim = new gf.animation({
        url: "images/player-tank.png",
        numberOfFrames: 2,
        rate: 200,
        width: 34,
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
    $("#myGame").append("<img id='startButton' src='images/start.jpg' style='width: 40px; height: 40px;' />");
    //start button
    $("#startButton").click(function () {
        //Wait for the images to load then init the game elements
        gf.startGame(initialize);
    });

    //Container for the gameplay Objects;
    var container, tilemap;
    var player = new HumanPLayer();

    //Game init
    var initialize = function () {
        $("#myGame").append("<div id='container' style='display: none; width: 640px; height: 480px;'>");

        container = $("#container");
        group = gf.addGroup(container, "group");
        tilemap = gf.addTilemap(group, "level", { tileWidth: 34, tileHeight: 34, width: 20, height: 15, map: level, animations: tiles });

        //gf.addSprite(container,"spriteTest", {width: 23, height: 24});
        player.div = gf.addSprite(container, "player", { x: 630, y: 60, width: 34, height: 34 });

        //gf.setAnimation($("#spriteTest"), firstAnim);
        gf.setAnimation(player.div, playerAnim.stand);

        //Main game loop
        gf.addCallback(gameLoop, 100);

        //Changing directions of tanks
        gf.addCallback(changeDirections, 600);

        //Adding new tank
        gf.addCallback(addTanks, 2000);

        $("#startButton").remove();
        container.css("display", "block");
    }

    //Moving Game Objects
    var tanks = [];
    var changeDirections = function () {
        for (var i = 0; i < tanks.length; i++) {
            tanks[i].changeDirection();
        }
    }
    var moveTanks = function () {
        for (var i = 0; i < tanks.length; i++) {
            var movements = tryMoveObject(tanks[i], tanks[i].direction);
            updateMovingObject(tanks[i], movements.horizontalMove, movements.verticalMove)
            //tanks[i].move();
            //tanks[i].update();
        }
    }
    var addTanks = function () {
        if (tanks.length < 10) {
            var newTank = new gameObjectsNS.GameObject("tank" + tanks.length, tankAnim, { x: 160, y: 160 });
            //newTank.div = newTank.container;
            //console.log(newTank.container);
            gf.setAnimation(newTank.container, tankAnim);
            console.log(newTank.container);
            container.append(newTank.container);
            tanks.push(newTank);
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
            case "down":
                verticalMove = step;
                gf.transform(gameObject, { rotate: 90, flipH: false });
                break;
        }

        return {
            horizontalMove: horizontalMove,
            verticalMove: verticalMove
        };
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
                // displace along the y axis
                newY -= diffy;
            } else {
                // displace along the x axis
                newX -= diffx;
            }
            //collisions = gf.tilemapCollide(tilemap, {x: newX, y: newY, width: newW, height: newH});
        }
        //console.log("Mogin player to " + newX + " " + newY + " from " +  gf.x(target.div) + " " + gf.y(target.div));
        gf.x(gameObject, newX);
        gf.y(gameObject, newY);
    }

    function TankObject() {
        var direction = "down";
        var horizontalMove = 0;
        var verticalMove = 0;
        var nextMovements;
        this.move = function () {
            //console.log("moving " + direction);
            nextMovements = tryMoveObject(this, direction);
            horizontalMove = nextMovements.horizontalMove;
            verticalMove = nextMovements.verticalMove;
        }

        this.changeDirection = function () {
            var rndNum = Math.floor(Math.random() * 4);
            switch (rndNum) {
                case 0:
                    direction = "left";
                    break;
                case 1:
                    direction = "right";
                    break;
                case 2:
                    direction = "up";
                    break;
                case 3:
                    direction = "down";
                    break;
            }
        }

        this.update = function () {
            updateMovingObject(this, horizontalMove, verticalMove);
            horizontalMove = 0;
            verticalMove = 0;
        }
    };

    function HumanPLayer() {
        var status = "stand";
        var horizontalMove = 0;
        var verticalMove = 0;

        this.update = function () {
            updateMovingObject(this, horizontalMove, verticalMove);
            horizontalMove = 0;
            verticalMove = 0;
        };

        this.left = function () {
            this.startMoving();
            horizontalMove = tryMoveObject(this, "left").horizontalMove;
        };

        this.right = function () {
            this.startMoving();
            horizontalMove = tryMoveObject(this, "right").horizontalMove;
        };

        this.up = function () {
            this.startMoving();
            verticalMove = tryMoveObject(this, "up").verticalMove;
        };

        this.down = function () {
            this.startMoving();
            verticalMove = tryMoveObject(this, "down").verticalMove;
        };

        this.shoot = function () {
            //TODO
        };

        this.idle = function () {
            status = "stand";
            gf.setAnimation(this.div, playerAnim.stand, false);
        };

        this.startMoving = function () {
            if (status === "stand") {
                status = "move";
                gf.setAnimation(this.div, playerAnim.move, true);
            }
        }
    };

    //Main Game Loop
    var gameLoop = function () {

        moveTanks();

        /*
		var idle = true;
        if(gf.keyboard[37] && idle){ //left arrow
            player.left();
            idle = false;
        }
        if(gf.keyboard[38] && idle){ //up arrow
            player.up();
            idle = false;

        }
        if(gf.keyboard[39] && idle){ //right arrow
            player.right();
            idle = false;
        }
        if(gf.keyboard[40] && idle){ //down arrow
            player.down();
            idle = false;
        }
        if(idle){
            player.idle();
        }
        
        player.update();
        */

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

