function Level1(_owner){
	this.draw = Level1Draw;
	this.update = Level1Update;
	this.mouseMove = Level1MouseMove;
	this.click = Level1Click;
	this.owner = _owner;
	this.see = Level1See;
}

function Level1Draw(ctx){
	var oldColor = ctx.fillStyle;
	var oldFont = ctx.font;
	
	ctx.fillStyle = "white";
  	ctx.font = "bold 16px Arial";
  	ctx.fillText("Zibri", 100, 100);

	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function Level1Update(){

}

function Level1Click(_x,_y){

}

function Level1MouseMove(_x,_y){
}

function Level1See(){
	// initiate the see
}
