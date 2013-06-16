﻿$(document).ready(function () {
    var delay = 5000;

    var startFrame = $('<div id="wrapper"></div>');
    $('<p id="inner-text">TANKS GAME</br>created by</br> DRAGON FRUIT</p>').appendTo(startFrame);
    startFrame.appendTo(document.body).fadeOut(delay - 35);

    var interval = setInterval(function () {
        clearInterval(interval); //style="opacity: 0"
        var btn = $('<button></button>');
        var img = $('<img src="images/start.png"/>');
        img.fadeIn(delay / 3);
        img.appendTo(btn);
        btn.appendTo(document.body);
    }, delay);
});