﻿var gameFieldNS = (function () {
var Field = Class.create({
    initialize: function (container, width, height) {
        this.container = container;
        this.width = width;
        this.height = height;
    },
    //Used for testing
    returnProperty: function() {
    return { container:this.container, width:this.width, height:this.height};
}
});

var FieldPosition = Class.create({
    initialize: function (xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    },
    update: function (delta) {
        this.xCoord += delta.xCoord;
        this.yCoord += delta.yCoord;
    },
    equals: function (other) {
        return this.xCoord == other.xCoord && this.yCoord == other.yCoord;
    },
    //Used for testing
    returnProperty: function () {
        return { xCoord: this.xCoord, yCoord: this.yCoord };
    }
});
return {
    Field: Field,
    FieldPosition: FieldPosition
}
})();