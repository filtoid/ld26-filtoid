function FirstHurdle(_owner){
	this.owner = _owner;
	this.draw = FHDraw;
	this.update = FHUpdate;
	this.see = FHSee;
	this.click = FHClick;
	this.mouseMove = FHMouseMove;

	this.curText = "";//"We have hit the big conundrum of the dream - if we have not lived to dream then have we truly lived at all?";
	this.see();
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
	
	this.showRestart = false;
}

function FHDraw(ctx){
	var oldColor = ctx.fillStyle;
	var oldFont = ctx.font;
	var oldAlpha = ctx.globalAlpha;

	ctx.fillStyle = "white";
  	ctx.font = "bold 16px Arial";

	// Have the next and old words be slightly faded
	ctx.globalAlpha = 0.5;

	var oldWidth = ctx.measureText(this.oldWord).width;
	var nextWidth = ctx.measureText(this.curWord).width;

	ctx.fillText(this.oldWord, 50, 150);
	ctx.fillText(this.nextWord, 60 + oldWidth + nextWidth + 10,150);

	ctx.globalAlpha = oldAlpha;
  	ctx.fillText(this.curWord, 60 + oldWidth, 150);

	if(this.showRestart){
		ctx.fillStyle="blue";
		ctx.fillRect(300,50,200,100);
		ctx.fillStyle = "white";
		ctx.fillText("Restart", 350,75);
		
	}
	
	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function FHUpdate(){
	
	if(this.owner.tick<=0){
		this.owner.tick=MAX_TICK;		
	}else{
		this.owner.tick-=1;
		return;	
	}

	this.oldWord = this.curWord;
	this.curWord = this.nextWord;
	
	this.nextWord = splitWordsGetFirst(this.curText);
	this.curText = splitWordsGetRest(this.curText);

}

function FHSee(){

	this.curText = "If we have not lived to dream then have we truly lived at all?";
	
}

function FHClick(_x,_y){
	this.showRestart = true;
	
	if(_x>300&& _x<500 &&  _y>50 && _y<150){
		this.owner.setLevel("Level1");
		return;
	}
	
}

function FHMouseMove(_x,_y){

}
