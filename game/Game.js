var MAX_TICK = 15;

function Game(){
	this.draw = GameDraw;
	this.update = GameUpdate;
	this.click = GameClick;
	this.mouseMove = GameMouseMove;
	this.curLevel = new Level1(this);
	
	this.tick = MAX_TICK;
	this.setLevel = GameSetLevel;

	this.score = 0;
}

function GameDraw(ctx){
	this.curLevel.draw(ctx);

	var oldAlpha = ctx.globalAlpha;

	ctx.globalAlpha = 0.5;

	ctx.fillStyle = "blue";
    	ctx.fillRect(0,0,50,50);

	ctx.fillStyle = "white";
	ctx.fontSize = "10px";
	ctx.fillText("Score: " + this.score, 50,20);
	
	ctx.globalAlpha = oldAlpha;	
}

function GameUpdate(){

	if(this.tick<=0){
		this.tick=MAX_TICK;		
	}else{
		this.tick-=1;
		return;	
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
	}
}

