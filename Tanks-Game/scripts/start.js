﻿var delay = 3000;
var startButton = $("#startButton");
var startFrame = $('<div id="wrapper"></div>');
$('<p id="inner-text">TANKS GAME</br>created by</br> DRAGON FRUIT</p>').appendTo(startFrame);
startFrame.appendTo(startButton).fadeOut(delay - 3);
var interval = setInterval(function () {
    clearInterval(interval);
    $('<a href="#"></a>').fadeIn(delay / 3).appendTo(startButton);
}, delay + 3);