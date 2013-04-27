function Game(){
	this.draw = GameDraw;
	this.update = GameUpdate;
	this.click = GameClick;
	this.mouseMove = GameMouseMove;
	this.curLevel = new Level1(this);
}

function GameDraw(ctx){
	this.curLevel.draw(ctx);
}

function GameUpdate(){
	this.curLevel.update();
}

function GameClick(_x,_y){
	this.curLevel.click(_x,_y);
}

function GameMouseMove(_x,_y){
	this.curLevel.mouseMove(_x,_y);
}

