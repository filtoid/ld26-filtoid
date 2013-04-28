
function Level3(_owner){
	this.draw = Level3Draw;
	this.update = Level3Update;
	this.mouseMove = Level3MouseMove;
	this.click = Level3Click;
	this.owner = _owner;
	this.see = Level3See;
	this.curText = "I am now lying in a garden - the sun shines down and I am at peace";
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
		
	this.bottleVisible = false;	
		
	this.seeCount = 0;
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
}

function Level3Draw(ctx){
	
}

function Level3Update(){

}

function Level3MouseMove(_x,_y){
	
}

function Level3Click(_x,_y){
	
}

function Level3See(){
	
}
