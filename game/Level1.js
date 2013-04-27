function Level1(_owner){
	this.draw = Level1Draw;
	this.update = Level1Update;
	this.mouseMove = Level1MouseMove;
	this.click = Level1Click;
	this.owner = _owner;
	this.see = Level1See;
	this.curText = "I wake up early in the morning";
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
		
}

function Level1Draw(ctx){
	var oldColor = ctx.fillStyle;
	var oldFont = ctx.font;
	var oldAlpha = ctx.globalAlpha;

	ctx.fillStyle = "white";
  	ctx.font = "bold 16px Arial";

	// Have the next and old words be slightly faded
	ctx.globalAlpha = 0.5;
	ctx.fillText(this.oldWord, 50, 50);
	ctx.fillText(this.nextWord, 150,150);

	ctx.globalAlpha = oldAlpha;
  	ctx.fillText(this.curWord, 100, 100);

	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function Level1Update(){
	this.oldWord = this.curWord;
	this.curWord = this.nextWord;
	
	this.nextWord = splitWordsGetFirst(this.curText);
	this.curText = splitWordsGetRest(this.curText);
}

function Level1Click(_x,_y){

}

function Level1MouseMove(_x,_y){
}

function Level1See(){
	// initiate the see
	this.curText = "The room looks odd - the bed I'm in smells of pizza. I wonder if I should rollover and go to sleep or wake and never dream again?";

}
