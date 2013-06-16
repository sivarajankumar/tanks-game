var gameObjectsNS = (function () {
    var GameObject = Class.create({
        initialize: function (id, animation, imageOptions) {
            var imageOptions = $.extend({
                x: 0,
                y: 0,
                width: 34,
                height: 34,
                flipH: false,
                flipV: false,
                rotate: 0,
                scale: 1
            }, imageOptions);

            this.id = id;
            this.animation = animation;
            this.imageOptions = imageOptions;
            this.container = this._getContainer();
        },
        _getContainer: function () {
            var container = $("<div></div>");
            container.attr("id", this.id);
            container.css("width", this.imageOptions.width);
            container.css("height", this.imageOptions.height);
            container.css("left", this.imageOptions.x);
            container.css("top", this.imageOptions.y);
            container.css("position", "absolute");
            container.css("overflow", "hidden");
            return container;
        },
        left: function (position) {
            if (position) {
                this.container.css("left", position);
                gameObject.imageOptions.x = position;
            } else {
                return this.imageOptions.x;
            }
        },
        top: function (position) {
            if (position) {
                this.container.css("top", position);
                gameObject.imageOptions.y = position;
            } else {
                return this.imageOptions.y;
            }
        },
        width: function (dimension) {
            if (dimension) {
                this.container.css("width", dimension);
                gameObject.imageOptions.width = dimension;
            } else {
                return this.imageOptions.width;
            }
        },
        height: function (dimension) {
            if (dimension) {
                this.container.css("height", dimension);
                gameObject.imageOptions.height = dimension;
            } else {
                return this.imageOptions.height;
            }
        }
    });

    var StaticObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, imageOptions) {
            $super(id, animation, imageOptions);
        }
    });

    var MovingObject = Class.create(GameObject, {
        initialize: function ($super, id, animation, speed, imageOptions) {
            $super(id, animation, imageOptions);
            this.speed = speed;
        },
        move: function () {
            // this.topLeft.update(this.speed);
        },
        changeDirection: function () { }
    });

    // Static objects
    var BrickWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, imageOptions) {
            $super(id, animation, imageOptions);
            this.isDestroyed = false;
        }
    });

    var SteelWall = Class.create(StaticObject, {
        initialize: function ($super, id, animation, imageOptions) {
            $super(id, animation, imageOptions);
        }
    });

    // Moving objects
    var PlayerTank = Class.create(MovingObject, {
        initialize: function ($super, id, animation, speed, imageOptions) {
            $super(id, animation, speed, imageOptions);
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
        initialize: function ($super, id, animation, speed, imageOptions) {
            $super(id, animation, speed, imageOptions);
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
        initialize: function ($super, id, animation, speed, imageOptions, direction) {
            $super(id, animation, speed, imageOptions);
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