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
		
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
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

	if(this.showButtons){
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "blue";
    		ctx.fillRect(225,200,100,100);

		ctx.fillStyle = "green";
    		ctx.fillRect(325,200,100,100);

		ctx.fillStyle = "white";
		ctx.fillText("Wake", 250,250);
		ctx.fillText("Sleep", 350,250);

		ctx.globalAlpha = oldAlpha;	
	}
	
	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function Level1Update(){
	
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

function Level1ActivateButtons(){
	this.showButtons = true;
}

function Level1Click(_x,_y){
	// If we choose to wake then we need to set the level accordingly
	if(_x>225 && _x<325 && _y>200 && _y<300 ){
		this.owner.setLevel("FirstHurdle");
		return;
	}

	// If we choose to sleep then we can enjoy this adventure...
	if(_x>325 && _x<425 && _y>200 && _y<300){
		this.owner.addScore(10);
		this.owner.setLevel("Level2");
		return;
	}

}

function Level1MouseMove(_x,_y){
}

function Level1See(){
	// initiate the see
	this.curText = "The room looks odd - the bed I'm in smells of pizza. I wonder if I should rollover and go to sleep or wake and never dream again?";
	this.activateButtons();
}
