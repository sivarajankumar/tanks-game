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
            this.isDestroyed = false;
        },
        getDestryedStatus: function () {
            return this.isDestroyed;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'PlayerBullet';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'PlayerBullet') {
                this.isDestroyed = true;
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
            this.isAlive = true;
            this.collisionGroupString = 'Player';
            this.shouldShoot = false;
            this.lastMoveDirection = new GridPosition(1, 0); // Used for bullet direction on shoot
        },
        getAliveStatus: function () {
            return this.isAlive;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Player';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'Player') {
                this.isAlive = false;
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
            this.isAlive = true;
            this.collisionGroupString = 'Enemy';
        },
        getAliveStatus: function () {
            return this.isAlive;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Enemy';
        },
        respondToCollision: function (otherCollisionGroupObjectString) {
            this.Direction = new GridPosition(0, 0);
            if (otherCollisionGroupObjectString == 'PlayerBullet') {
                this.isAlive = false;
            }
        },
        move: function () {
            // TODO: Override with logic for 50% guessing player's move.
        }
    });

    var PlayerBullet = Class.create(MovingObject, {
        initialize: function ($super, image, topLeft, speed, playerLastMoveDirection) {
            $super(image, topLeft, speed);
            this.isDestroyed = false;
            this.collisionGroupString = 'PlayerBullet';
            this.Direction = playerLastMoveDirection;
        },
        getDestryedStatus: function () {
            return this.isDestroyed;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Enemy';
        },
        respondToCollision: function () {
            this.Direction = new GridPosition(0, 0);
            this.isDestryed = true;

        },
        move: function () {
            this.topLeft.update(this.Direction);
        },
    });

    var EnemyBullet = Class.create(MovingObject, {
        initialize: function ($super, image, topLeft, speed, enemyLastMoveDirection) {
            $super(image, topLeft, speed);
            this.isDestroyed = false;
            this.collisionGroupString = 'PlayerBullet';
            this.Direction = playerLastMoveDirection;
        },
        getDestryedStatus: function () {
            return this.isDestroyed;
        },
        canCollideWith: function (otherCollisionGroupObjectString) {
            return otherCollisionGroupObjectString == 'BrickWall'
                || otherCollisionGroupObjectString == 'SteelWall'
                || otherCollisionGroupObjectString == 'Player';
        },
        respondToCollision: function () {
            this.Direction = new GridPosition(0, 0);
            this.isDestryed = true;

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
        PlayerBullet: PlayerBullet,
        EnemyBullet: EnemyBullet,
    }
})();