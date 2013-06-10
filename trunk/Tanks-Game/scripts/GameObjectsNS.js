var gameObjectsNS = (function () {
    var GameObject = Class.create({
        initialize: function (image, topLeft) {
            this.image = image;
            this.topLeft = topLeft;
        },
        render: function () {
            // TODO: Implement logic with[out] jQuery.
        }
    });

    var StaticObject = Class.create(GameObject, {
        initialize: function ($super, image, topLeft) {
            $super(image, topLeft);
        }
    });

    var MovingObject = Class.create(GameObject, {
        initialize: function ($super, image, topLeft, speed) {
            $super(image, topLeft);
            this.speed = speed;
        },
        move: function () {
            this.topLeft.update(this.speed);
        }
    });

    // Static objects
    var BrickWall = Class.create(StaticObject, {
        initialize: function ($super, image, topLeft) {
            $super(image, topLeft);
            this.collisionGroupString = 'BrickWall';
            this._isDestroyed = false;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'Bullet';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'Bullet') {
                this._isDestroyed = true;
            }
        },
    });

    var SteelWall = Class.create(StaticObject, {
        initialize: function ($super, image, topLeft) {
            $super(image, topLeft);
            this.collisionGroupString = 'SteelWall';
        }
    });

    // Moving objects
    var PlayerTank = Class.create(MovingObject, {
        initialize: function ($super, image, topLeft, speed) {
            $super(image, topLeft, speed);
            this._isAlive = true;
            this.collisionGroupString = 'Player';
            this.shouldShoot = false;
            this.lastMoveDirection = new GridPosition(1, 0); // Used for bullet direction on shoot
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Player';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'Player') {
                this._isAlive = false;
            }
        },
        move: function (direction) {
            this.topLeft.update(direction);
            this.lastMoveDirection = direction;
        },
        shoot: function () {
            this.shouldShoot = true;
        },
    });

    var EnemyTank = Class.create(MovingObject, {
        initialize: function ($super, image, topLeft, speed) {
            $super(image, topLeft, speed);
            this._isAlive = true;
            this.collisionGroupString = 'Player';
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'Bullet') {
                this._isAlive = false;
            }
        },
        move: function () {
            // TODO: Override with logic for 50% guessing player's move.
        }
    });

    var Bullet = Class.create(MovingObject, {
        initialize: function ($super, image, topLeft, speed, playerLastMoveDirection) {
            $super(image, topLeft, speed);
            this._isDestroyed = false;
            this.collisionGroupString = 'Bullet';
            this.Direction = playerLastMoveDirection;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Player';
        },
        respondToCollision: function () {
            this.Direction = new GridPosition(0, 0);
            this._isDestryed = true;

        },
        move: function () {
            this.topLeft.update(this.Direction);
        },
    });

    return {
        GameObject: GameObject,
        StaticObject: StaticObject,
        MovingObject: MovingObject,
        BrickWall: BrickWall,
        SteelWall: SteelWall,
        PlayerTank: PlayerTank,
        EnemyTank: EnemyTank,
        Bullet: Bullet,
    }
})();