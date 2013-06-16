var gameObjectsNS = (function () {
    var GameObject = Class.create({
        initialize: function (id, animation, options) {
            var options = $.extend({
                x: 0,
                y: 0,
                width: 34,
                height: 34,
                flipH: false,
                flipV: false,
                rotate: 0,
                scale: 1
            }, options);

            this.id = id;
            this.animation = animation;
            this.options = options;

            this.direction = "down";

            this.container = this._getContainer();
        },
        _getContainer: function () {
            var container;
            container = $("<div></div>");
            container.attr("id", this.id);
            container.css("width", this.options.width);
            container.css("height", this.options.height);
            container.css("left", this.options.x);
            container.css("top", this.options.y);
            container.css("position", "absolute");
            container.css("overflow", "hidden");
            return container;
        },

        changeDirection : function () {
            var rndNum = Math.floor(Math.random() * 4);
            switch (rndNum) {
                case 0:
                    this.direction = "left";
                    break;
                case 1:
                    this.direction = "right";
                    break;
                case 2:
                    this.direction = "up";
                    break;
                case 3:
                    this.direction = "down";
                    break;
            }
        }
    });

    var StaticObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, topLeft, options) {
            $super(id, animation, topLeft, options);
        }
    });

    var MovingObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, topLeft, speed, options) {
            $super(id, animation, topLeft, options);
            this.speed = speed;
        },
        move: function () {
            this.topLeft.update(this.speed);
        }
    });

    // Static objects
    var BrickWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, topLeft, options) {
            $super(id, animation, topLeft, options);
            this.isDestroyed = false;
        }
    });

    var SteelWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, topLeft, options) {
            $super(id, animation, topLeft, options);
        }
    });

    // Moving objects
    var PlayerTank = Class.create(MovingObject, {
        initialize: function ($super, id, animation, topLeft, speed, options) {
            $super(id, animation, topLeft, speed, options);
        },
        move: function (direction) {
            this.topLeft.update(direction);
        },
        shoot: function () {
          // TODO: Implement logic to shoot!!!  // this.shouldShoot = true;
        },
    });

    var EnemyTank = Class.create(MovingObject, {
        initialize: function ($super, id, animation, topLeft, speed, options) {
            $super(id, animation, topLeft, speed, options);
            this.isAlive = true;
        },
        move: function () {
            // TODO: Override with logic for 50% guessing player's move!!!
        }
    });

    var Bullet = Class.create(MovingObject, {
        initialize: function ($super, id, animation, topLeft, speed, direction, options) {
            $super(id, animation, topLeft, speed, options);
            this.isDestroyed = false;
            this.direction = direction;
            // TODO: Property for shot origin!!!
        },
        move: function () {
            this.topLeft.update(this.direction); // TODO: Reconsider!!!
        }
    });

    return {
        GameObject: GameObject,
        StaticObject: StaticObject,
        MovingObject: MovingObject,
        BrickWall: BrickWall,
        SteelWall: SteelWall,
        PlayerTank: PlayerTank,
        EnemyTank: EnemyTank,
        Bullet: Bullet
    }
})();