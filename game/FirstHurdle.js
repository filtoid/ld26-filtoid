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

	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function FHUpdate(){
	this.oldWord = this.curWord;
	this.curWord = this.nextWord;
	
	this.nextWord = splitWordsGetFirst(this.curText);
	this.curText = splitWordsGetRest(this.curText);

}

function FHSee(){

	this.curText = "We have hit the big conundrum of the dream - if we have not lived to dream then have we truly lived at all?";
	
}

function FHClick(_x,_y){
	
}

function FHMouseMove(_x,_y){

}
