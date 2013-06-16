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
            this.container = this._getContainer();
        },
        _getContainer: function () {
            var container = $("<div></div>");
            container.attr("id", this.id);
            container.css("width", this.options.width);
            container.css("height", this.options.height);
            container.css("left", this.options.x);
            container.css("top", this.options.y);
            container.css("position", "absolute");
            container.css("overflow", "hidden");
            return container;
        },
        left: function (position) {
            if (position) {
                this.container.css("left", position);
                gameObject.options.x = position;
            } else {
                return this.options.x;
            }
        },
        top: function (position) {
            if (position) {
                this.container.css("top", position);
                gameObject.options.y = position;
            } else {
                return this.options.y;
            }
        },
        width: function (dimension) {
            if (dimension) {
                this.container.css("width", dimension);
                gameObject.options.width = dimension;
            } else {
                return this.options.width;
            }
        },
        height: function (dimension) {
            if (dimension) {
                this.container.css("height", dimension);
                gameObject.options.height = dimension;
            } else {
                return this.options.height;
            }
        }
    });

    var StaticObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, options) {
            $super(id, animation, options);
        }
    });

    var MovingObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, speed, options) {
            $super(id, animation, options);
            this.speed = speed;
        },
        move: function () {
            // this.topLeft.update(this.speed);
        },
        changeDirection: function () { }
    });

    // Static objects
    var BrickWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, options) {
            $super(id, animation, options);
            this.isDestroyed = false;
        }
    });

    var SteelWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, options) {
            $super(id, animation, options);
        }
    });

    // Moving objects
    var PlayerTank = Class.create(MovingObject, {
        initialize: function ($super, id, animation, speed, options) {
            $super(id, animation, speed, options);
            this.isAlive = true;
            this.isMoving = false;
        },
        move: function (direction) {
            // this.topLeft.update(direction);
        },
        shoot: function () {
            // TODO: Implement logic to shoot!!!  // this.shouldShoot = true;
        },
    });

    var EnemyTank = Class.create(MovingObject, {
        initialize: function ($super, id, animation, speed, options) {
            $super(id, animation, speed, options);
            this.isAlive = true;
            this.direction = "down";
        },
        changeDirection: function () {
            var randomNumber = (Math.random() * 4) | 0;
            switch (randomNumber) {
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

    var Bullet = Class.create(MovingObject, {
        initialize: function ($super, id, animation, speed, options, direction) {
            $super(id, animation, speed, options);
            this.isDestroyed = false;
            this.direction = direction;
            // TODO: Property for shot origin!!!
        },
        move: function () {
            //this.topLeft.update(this.direction); // TODO: Reconsider!!!
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