﻿var delay = 3000;
//$("#myGame").remove();
var startFrame = $('<div id="wrapper"></div>');
$('<p id="inner-text">TANKS GAME</br>created by</br> DRAGON FRUIT</p>').appendTo(startFrame);
startFrame.appendTo(document.body).fadeOut(delay - 3);
var interval = setInterval(function () {
    clearInterval(interval);
    var btn = $('<a href="#" id="startButton"></a>').fadeIn(delay / 3).appendTo(document.body);
}, delay + 3);