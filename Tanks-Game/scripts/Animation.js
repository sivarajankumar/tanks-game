﻿var Animation = Class.create({
    initialize: function (url, width, hFlip, vFlip, numberOfFrames, currentFrame, rate) {
        this.url = url;
        this.width = width;
        this.horizontalFlip = hFlip;
        this.verticalFlip = vFlip;
        this.numberOfFrames = numberOfFrames;
        this.currentFrame = currentFrame;
        this.rate = rate;
    }
});