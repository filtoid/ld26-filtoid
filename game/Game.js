var MAX_TICK = 15;

function Game(){
	this.draw = GameDraw;
	this.update = GameUpdate;
	this.click = GameClick;
	this.mouseMove = GameMouseMove;
	this.curLevel = new Level3(this);
	
	this.tick = MAX_TICK;
	this.setLevel = GameSetLevel;
	
	this.addScore = GameUpdateScore;
	this.score = 0;
	this.scorePic = null;
}

function GameDraw(ctx){
	this.curLevel.draw(ctx);

	var oldAlpha = ctx.globalAlpha;

	ctx.globalAlpha = 0.5;

	ctx.fillStyle = "blue";
    	ctx.fillRect(0,0,50,50);

	
	//Draw the score pic if we need to
	if(this.scorePic!=null){
		if(this.scorePic.val >0)
			ctx.fillStyle="green";
		else if(this.scorePic.val<0)
			ctx.fillStyle="red";
		else
			ctx.fillStyle="white"; // Shouldn't have this really
		
		ctx.fontSize = "15px";
		ctx.globalAlpha = oldAlpha;
	
		ctx.fillText(this.scorePic.val,this.scorePic.loc.x,this.scorePic.loc.y);
	        ctx.globalAlpha=0.5;
	}

	ctx.fontSize = "10px";	
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + this.score, 50,20);
	
	ctx.globalAlpha = oldAlpha;	
}

function GameUpdate(){

	if(this.scorePic!=null){
		this.scorePic.timer-=1;
		if(this.scorePic.timer<0){
			this.scorePic = null;
		}else{
			this.scorePic.loc.y += 3;
		}
	}
	
	this.curLevel.update();
}

function GameClick(_x,_y){

	if(_x>0 && _x<50 && _y>0 && _y<50){
		this.curLevel.see();
		return;
	}

	// If we click on eye then do a see
	this.curLevel.click(_x,_y);
}

function GameMouseMove(_x,_y){
	this.curLevel.mouseMove(_x,_y);
}

function GameSetLevel(_name){
	if(_name == "FirstHurdle"){
		this.curLevel = new FirstHurdle(this);	
	}else if(_name=="Level1"){
		this.curLevel = new Level1(this);
	}else if(_name=="Level2"){
		this.curLevel = new Level2(this);
	}else if(_name=="Level3"){
		this.curLevel = new Level3(this);
	}
}

function GameUpdateScore(_val){
	this.score += _val;
	this.scorePic = new Object();
	this.scorePic.val = _val;
	this.scorePic.timer = 10;
	this.scorePic.loc = new Location(80,20);
}

