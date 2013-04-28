function FinalLevel(_owner){
	this.draw = FLDraw;
	this.update = FLUpdate;
	this.mouseMove = FLMouseMove;
	this.click = FLClick;
	this.owner = _owner;
	this.see = FLSee;
	this.TEXT = "You stir from your dream. Waking hours to complement the dreaming - a life to live.";
	
	this.curText = this.TEXT;
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
	
	this.finished = false;
	this.finishedTimer = 0;
	this.MAX_FINISH = 40;
	
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
	
}

function FLDraw(ctx){
		
		if(this.finished){
			var oldFont = ctx.font;
			ctx.font = "40px Times New Roman";
			ctx.fillStyle="white";
			ctx.globalAlpha = this.finishedTimer/this.MAX_FINISH;
			ctx.fillText("Fin",150,250);
			ctx.globalAlpha=1.0;
			ctx.font = oldFont;
			return;
		}
	
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
	
	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
	ctx.globalAlpha = oldAlpha;
}

function FLUpdate(){
	
	if(this.owner.tick<=0){
		this.owner.tick=MAX_TICK;		
	}else{
		this.owner.tick-=1;
		return;	
	}

	if(this.finished){
		this.finishedTimer+=1;	
		if(this.finishedTimer>this.MAX_FINISH)
			this.finishedTimer=this.MAX_FINISH;
	}
	
	this.oldWord = this.curWord;
	this.curWord = this.nextWord;
	
	this.nextWord = splitWordsGetFirst(this.curText);
	this.curText = splitWordsGetRest(this.curText);
	
	if(this.curText=="")
		this.curText = this.TEXT;
	
}

function FLActivateButtons(){
	this.showButtons = true;
}

function FLClick(_x,_y){
this.finished=true;
}

function FLMouseMove(_x,_y){
}

function FLSee(){


}
