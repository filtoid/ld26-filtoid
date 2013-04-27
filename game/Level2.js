function Level2(_owner){
	this.draw = Level2Draw;
	this.update = Level2Update;
	this.mouseMove = Level2MouseMove;
	this.click = Level2Click;
	this.owner = _owner;
	this.see = Level2See;
	this.curText = "The roar of the crowd hits me first. I'm in a bar - the air is thick with the smell of sweat. I'm behind the bar, people are shouting for drinks.";
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
		
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
}

function Level2Draw(ctx){
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

function Level2Update(){
	this.oldWord = this.curWord;
	this.curWord = this.nextWord;
	
	this.nextWord = splitWordsGetFirst(this.curText);
	this.curText = splitWordsGetRest(this.curText);
}

function Level2MouseMove(_x,_y){
	
}

function Level2Click(_x,_y){
	
}

function Level2See(){

}
