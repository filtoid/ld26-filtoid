function Level4(_owner){
	this.draw = Level4Draw;
	this.update = Level4Update;
	this.mouseMove = Level4MouseMove;
	this.click = Level4Click;
	this.owner = _owner;
	this.see = Level4See;
	this.curText = "";
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
		
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
}

function Level4Draw(ctx){

}

function Level4Update(){
	
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

function Level4ActivateButtons(){
	
}

function Level4Click(_x,_y){

}

function Level4MouseMove(_x,_y){
}

function Level4See(){
}
