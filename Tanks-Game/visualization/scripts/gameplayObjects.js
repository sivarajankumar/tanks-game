var gameplayObjects = (function() {
	//Human player
    function HumanPlayer(moveAnim, standAnim){
        var status = "stand";
        //var standImage = 1;

        this.update = function () {
        	//TODO
        };
        
        this.left = function (){
        	startMoving();
        	moveObject(this, "left");
        };

        this.right = function (){
        	startMoving();
        	moveObject(this, "right");
        };

        this.up = function (){
        	startMoving();
        	moveObject(this, "up");
        };

        this.down = function (){
        	startMoving();
        	moveObject(this, "down");
        };
        
        this.shoot  = function (){
        	//TODO
        };
        
        this.idle  = function (){
			status = "stand";
			gf.setAnimation(this.div, standAnim, false);
			
        };

        function startMoving() {
        	if (status === "stand") {
        		status = "move";
        		gf.setAnimation(this.div, moveAnim, true);
        	}
        }
    };

    var moveObject = function (target, direction) {
		switch(direction) {
			case "left":
				gf.x(target.div, gf.x(target.div) - 5);
				gf.transform(target.div, { rotate: 0, flipH: true});
				break;
			case "right":
				gf.x(target.div, gf.x(target.div) + 5);
    			gf.transform(target.div, { rotate: 0, flipH: false});
    			break;
    		case "up":
    			gf.y(target.div, gf.y(target.div) - 5);
    			gf.transform(target.div, { rotate: -90, flipH: false});
    			break;
			default:
    			gf.y(target.div, gf.y(target.div) + 5);
    			gf.transform(target.div, { rotate: 90, flipH: false});
    			break;
		}
	}
	
    return {
	    createPlayer: function(playerAnimMove, playerAnimStand) {
	      return new HumanPlayer(playerAnimMove, playerAnimStand);
	    },
  	}
}());

