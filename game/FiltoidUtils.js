/* Filtoid's Helpful Javascript Functions - FiltoidUtils.js

This is hopefully some helpful javascript functions for misc purposes.

Please feel free to do whatever the hell you like with this code. It is free as in beer
and free as in speech. If you use this code you do so at your own risk and I accept no responsibility
whatsoever for it. 

Thanks and have fun at LD26 :)
*/

/*
A FiltoidDrawable has a var called rotation and a Location() called loc.
*/
function FiltoidDrawable(ctx){
	// We need to move the drawing context so the center of the image will be 0,0
	ctx.translate(this.loc.x,this.loc.y);
	// Do the rotation
	ctx.rotate(this.rotation);
	// We need to draw the image center at  0,0
	ctx.drawImage(this.img,-this.img.width/2,-this.img.height/2);
	
	// Undo the transformations we have applied so the next thing will draw in the right place
	ctx.rotate((Math.PI*2)-this.rotation);
	ctx.translate(-this.loc.x,-this.loc.y);
	
	if(this.health!=null){
		var ratioOfOne = this.health/this.MAX_HEALTH;
		
		ctx.fillStyle="green";
		ctx.fillRect(this.loc.x+(-this.img.width/2),this.loc.y+(-this.img.height/2)-5,this.img.width*ratioOfOne,5);
		ctx.fillStyle="red";
		ctx.fillRect(this.loc.x+(this.img.width*ratioOfOne)+(-this.img.width/2),this.loc.y+(-this.img.height/2)-5,this.img.width*(1-ratioOfOne),5);
		
		ctx.restore();
	}
}

function FiltoidCollisionCheck(A,B){
	// If the two objects are less the sum of their collision radii apart then they have collided
	// Note that one obj is A (with a loc and a size) and the other is B.
	// Returns true if the objects are touching
	var dist = B.size + A.size; // The distance they must be apart to be not touching
	if(A.loc.x-B.loc.x>dist || A.loc.x-B.loc.x<-dist)
		return false; // Too far apart in x plane
	if(A.loc.y-B.loc.y>dist || A.loc.y-B.loc.y<-dist)
		return false; // Too far apart in y plane
	
	var xDist = Math.abs(A.loc.x-B.loc.x);
	var yDist = Math.abs(A.loc.y-B.loc.y);
	
	var hyp = Math.sqrt((xDist*xDist)+(yDist*yDist));

	if(hyp<dist)
		return true;

	return false;
	
}

// If you pass in isForMovement then it means you are not hitting the object
// else you are hitting the object and it will sustain damage
function FiltoidHitTest(point, isForMovement, obj){
	// Pass in a location return true if it hit return false if not
	// this must have a size which is also a location
	var _startX = this.loc.x;
	var _startY = this.loc.y;
	var _endX = this.loc.x + this.size.x;
	var _endY = this.loc.y + this.size.y;
	var didHit = false;
	
	if(point.x>_startX-this.buffer && point.x<_endX+this.buffer){
		if(point.y > _startY-this.buffer && point.y< _endY+this.buffer)
			didHit=true;
	}
	
	if(!isForMovement && didHit){
		var damage = _player.getDamageCaused();
		
		if(obj.health!=null)
			obj.health-=damage;
		
		if(obj.health<=0)
			obj.kill();
		
	}
	
	return didHit;
}

function splitWordsGetFirst(_str){
	if(_str=="")
		return "";
	var allWords = _str.split(" ");
		_str = "";
	for( var i=1;i<allWords.length; i++){
		_str += allWords[i];	
		if(i!=allWords.length-1)
			_str += " ";
	}

	return allWords[0];
}

function splitWordsGetRest(_str){
	if(_str=="")
		return "";
	var allWords = _str.split(" ");
		_str = "";
	for( var i=1;i<allWords.length; i++){
		_str += allWords[i];	
		if(i!=allWords.length-1)
			_str += " ";
	}
	return _str;
}

