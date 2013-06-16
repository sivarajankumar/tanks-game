var engine = {
    baseRate: 30,
}

engine.initialize = function (options) {
    $.extend(engine, options);
}

engine.spriteFragment = $("<div class='engine_sprite' style='position: absolute; overflow: hidden;'></div>");
engine.addSprite = function (parent, divId, options) {
    var options = $.extend({
        x: 0,
        y: 0,
        width: 64,
        height: 64,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    var sprite = engine.spriteFragment.clone().css({
        left: options.x,
        top: options.y,
        width: options.width,
        height: options.height
    }).attr("id", divId).data("engine", options);
    parent.append(sprite);
    return sprite;
}

engine.groupFragment = $("<div class='engine_group' style='position: absolute; overflow: visible;'></div>");
engine.addGroup = function (parent, divId, options) {
    var options = $.extend({
        x: 0,
        y: 0,
        flipH: false,
        flipV: false,
        rotate: 0,
        scale: 1
    }, options);
    var group = engine.groupFragment.clone().css({
        left: options.x,
        top: options.y
    }).attr("id", divId).data("engine", options);
    parent.append(group);
    return group;
}

engine.setFrame = function (div, animation) {
    div.css("backgroundPosition", "-" + (animation.currentFrame * animation.width + animation.offset) + "px 0px");
}

engine.animation = function (options) {
    var defaultValues = {
        url: false,
        width: 64,
        numberOfFrames: 1,
        currentFrame: 0,
        rate: 1,
        offset: 0
    }

    $.extend(this, defaultValues, options);
    if (options.rate) {
        this.rate = Math.round(this.rate / engine.baseRate);
    }

    if (this.url) {
        engine.addImage(this.url);
    }
}

engine.animations = [];
engine.setAnimation = function (div, animation, loop) {
    var animate = {
        animation: $.extend({}, animation),
        div: div,
        loop: loop,
        counter: 0
    }

    if (animation.url) {
        div.css("backgroundImage", "url('" + animation.url + "')");
    }

    var divFound = false;
    for (var i = 0; i < engine.animations.length; i++) {
        if (engine.animations[i].div.is(div)) {
            divFound = true;
            engine.animations[i] = animate;
        }
    }

    if (!divFound) {
        engine.animations.push(animate);
    }
}

engine.imagesToPreload = [];
engine.addImage = function (url) {
    if ($.inArray(url, engine.imagesToPreload) < 0) {
        engine.imagesToPreload.push();
    }
    engine.imagesToPreload.push(url);
}

engine.intersect = function (a1, a2, b1, b2) {
    var i1 = Math.min(Math.max(a1, b1), a2);
    var i2 = Math.max(Math.min(a2, b2), a1);
    return [i1, i2];
}

engine.tilemapBox = function (tilemapOptions, boxOptions) {
    var tmX = tilemapOptions.x;
    var tmXW = tilemapOptions.x + tilemapOptions.width * tilemapOptions.tileWidth;
    var tmY = tilemapOptions.y;
    var tmYH = tilemapOptions.y + tilemapOptions.height * tilemapOptions.tileHeight;

    var bX = boxOptions.x;
    var bXW = boxOptions.x + boxOptions.width;
    var bY = boxOptions.y;
    var bYH = boxOptions.y + boxOptions.height;

    var x = engine.intersect(tmX, tmXW, bX, bXW);
    var y = engine.intersect(tmY, tmYH, bY, bYH);

    return {
        x1: Math.floor((x[0] - tilemapOptions.x) / tilemapOptions.tileWidth),
        y1: Math.floor((y[0] - tilemapOptions.y) / tilemapOptions.tileHeight),
        x2: Math.ceil((x[1] - tilemapOptions.x) / tilemapOptions.tileWidth),
        y2: Math.ceil((y[1] - tilemapOptions.y) / tilemapOptions.tileHeight)
    }
}

engine.tilemapFragment = $("<div class='engine_tilemap' style='position: absolute'></div>");
engine.addTilemap = function (parent, divId, options) {
    var options = $.extend({
        x: 0,
        y: 0,
        tileWidth: 64,
        tileHeight: 64,
        width: 0,
        height: 0,
        map: [],
        animations: []
    }, options);

    var tilemap = engine.tilemapFragment.clone().attr("id", divId).data("engine", options);
    for (var i = 0; i < options.height; i++) {
        for (var j = 0; j < options.width; j++) {
            var animationIndex = options.map[i][j];
            if (animationIndex > 0) {
                var tileOptions = {
                    x: options.x + j * options.tileWidth,
                    y: options.y + i * options.tileHeight,
                    width: options.tileWidth,
                    height: options.tileHeight
                }

                var tile = engine.spriteFragment.clone().css({
                    left: tileOptions.x,
                    top: tileOptions.y,
                    width: tileOptions.width,
                    height: tileOptions.height
                }).addClass("engine_line_" + i).addClass("engine_column_" + j).data("engine", tileOptions);

                engine.setAnimation(tile, options.animations[animationIndex - 1]);

                tilemap.append(tile);
            }
        }
    }
    parent.append(tilemap);
    return tilemap;
}

engine.tilemapCollide = function (tilemap, box) {
    var options = tilemap.data("engine");
    var collisionBox = engine.tilemapBox(options, box);
    var divs = []

    for (var i = collisionBox.y1; i < collisionBox.y2; i++) {
        for (var j = collisionBox.x1; j < collisionBox.x2; j++) {
            var index = options.map[i][j];
            if (index > 0) {
                divs.push(tilemap.find(".engine_line_" + i + ".engine_column_" + j));
            }
        }
    }

    return divs;
}

engine.objectCollide = function (gameObject1, gameObject2) {
    var option1 = gameObject1.options;
    var option2 = gameObject2.options;

    var x = engine.intersect(
        option1.x,
        option1.x + option1.width,
        option2.x,
        option2.x + option2.width);

    var y = engine.intersect(
        option1.y,
        option1.y + option1.height,
        option2.y,
        option2.y + option2.height);

    if (x[0] == x[1] || y[0] == y[1]) {
        return false;
    } else {
        return true;
    }
}

engine.x = function (gameObject, position) {
    if (position) {
        gameObject.container.css("left", position);
        gameObject.options.x = position;
    } else {
        return gameObject.options.x;
    }
}

engine.y = function (gameObject, position) {
    if (position) {
        gameObject.container.css("top", position);

        gameObject.options.y = position;
    } else {
        return gameObject.options.y;
    }
}

engine.transform = function (gameObject, newOptions) {
    if (newOptions.flipH !== undefined) {
        gameObject.options.flipH = newOptions.flipH;
    }
    if (newOptions.flipV !== undefined) {
        gameObject.options.flipV = newOptions.flipV;
    }
    if (newOptions.rotate !== undefined) {
        gameObject.options.rotate = newOptions.rotate;
    }
    if (newOptions.scale !== undefined) {
        gameObject.options.scale = newOptions.scale;
    }
    var factorH = gameObject.options.flipH ? -1 : 1;
    var factorV = gameObject.options.flipV ? -1 : 1;
    gameObject.container.css("transform", "rotate(" + gameObject.options.rotate +
        "deg) scale(" + (gameObject.options.scale * factorH)
        + "," + (gameObject.options.scale * factorV) + ")");
}

engine.width = function (gameObject, dimension) {
    if (dimension) {
        gameObject.container.css("width", position);
        gameObject.options.width = position;
    } else {
        return gameObject.options.width;
    }
}

engine.height = function (gameObject, dimension) {
    if (dimension) {
        gameObject.container.css("height", position);
        gameObject.options.height = position;
    } else {
        return gameObject.options.height;
    }
}

engine.startGame = function (endCallback, progressCallback) {
    var images = [];
    var total = engine.imagesToPreload.length;
    for (var i = 0; i < total; i++) {
        var image = new Image();
        images.push(image);
        image.src = engine.imagesToPreload[i];
    }

    var preloadingPoller = setInterval(function () {
        var counter = 0;
        var total = engine.imagesToPreload.length;
        for (var i = 0; i < total; i++) {
            if (images[i].complete) {
                counter++;
            }
        }

        if (counter == total) {
            clearInterval(preloadingPoller);
            endCallback();
            setInterval(engine.refreshGame, engine.baseRate);
        } else {
            if (progressCallback) {
                count++;
                progressCallback((count / total) * 100);
            }
        }
    }, 100);
};

engine.callbacks = [];
engine.addCallback = function (callback, rate) {
    engine.callbacks.push({
        callback: callback,
        rate: Math.round(rate / engine.baseRate),
        counter: 0
    })
}

engine.removeCallback = function () {
    engine.callbacks.remove(callback);
}

engine.refreshGame = function () {
    var finishedAnimations = [];
    for (var i = 0; i < engine.animations.length; i++) {
        var animate = engine.animations[i];
        animate.counter++;
        if (animate.counter == animate.animation.rate) {
            animate.counter = 0;
            animate.animation.currentFrame++;
            if (!animate.loop && animate.animation.currentFrame > animate.animation.numberOfFrame) {
                finishedAnimations.push(i);
            } else {
                animate.animation.currentFrame %= animate.animation.numberOfFrames;
                engine.setFrame(animate.div, animate.animation);
            }
        }
    }

    for (var i = 0; i < finishedAnimations.length; i++) {
        engine.animations.splice(finishedAnimations[i], 1);
    }

    for (var i = 0; i < engine.callbacks.length; i++) {
        var call = engine.callbacks[i];
        call.counter++;
        if (call.counter == call.rate) {
            call.counter = 0;
            call.callback();
        }
    }
}

engine.keyboard = [];
$(document).keydown(function (event) {
    engine.keyboard[event.keyCode] = true;
});

$(document).keyup(function (event) {
    engine.keyboard[event.keyCode] = false;
})