
function Level3(_owner){
	this.draw = Level3Draw;
	this.update = Level3Update;
	this.mouseMove = Level3MouseMove;
	this.click = Level3Click;
	this.owner = _owner;
	this.see = Level3See;
	this.curText = "";
	
	this.gardenTextAry = ["I","am","now","lying","in","a","garden.","The","sun","shines","down","and","I","am","at","peace.","The","buzz","in","the","air","creates","the","air","of","an","ether"];
	this.gardenTextFont = ["20px Sans-Serif","15px Helvetica","30px Charcoal"," 25px Times New Roman","18px Arial"];
	//this.gardenTextSize = ["20px","15px","30px","25px","18px"];
	
	this.butterfly = new Object();
	this.butterfly.text = "Butterfly";
	this.butterfly.loc = new Location(350,75);
	this.butterfly.dest = new Location(400,150);
	this.butterfly.isCaught = false;
	
	this.oldWord = "";	
	this.curWord = "";	
	this.nextWord = "";
		
	this.draggingNet = false;
	this.curLoc = new Location(0,0);
	this.seeCount = 0;
	
	this.seeCount = 0;
	this.activateButtons = Level1ActivateButtons;
	this.showButtons=false;
}

function Level3Draw(ctx){
	var fontCount = 0;
	var length = 0;
	var row = 0;
	
	var oldFont = ctx.font;
	var oldSize = ctx.fontSize;
	var oldColor = ctx.fillStyle;
	
	ctx.fillStyle="white";
	// Draw out the text on the left hand side
	for(var i=0;i<this.gardenTextAry.length;i++){
		ctx.font = this.gardenTextFont[fontCount];
		fontCount+=1;
		if(fontCount>this.gardenTextFont.length)
			fontCount=0;
			
		if((length + ctx.measureText(this.gardenTextAry[i]).width + 15)>300){
			length = 0;
			row+=1;
		}		
		
		ctx.fillText(this.gardenTextAry[i],75+length, 75+(row*75));
		
		length+=ctx.measureText(this.gardenTextAry[i]).width + 15;
	}
	
	// Now draw the butterfly
	ctx.fillText(this.butterfly.text,this.butterfly.loc.x,this.butterfly.loc.y);
	if(this.draggingNet){
		ctx.fillText("Net",this.curLoc.x,this.curLoc.y);
	}
	if(this.butterfly.isCaught){
		ctx.fillText("Net",this.butterfly.netLoc.x,this.butterfly.netLoc.y);
	}
	
	
	//Draw the hint text
	var oldAlpha = ctx.globalAlpha;
	ctx.globalAlpha = 0.5;

	var oldWidth = ctx.measureText(this.oldWord).width;
	var nextWidth = ctx.measureText(this.curWord).width;

	ctx.fillText(this.oldWord, 150, 40);
	ctx.fillText(this.nextWord, 160 + oldWidth + nextWidth + 10,40);

	ctx.globalAlpha = oldAlpha;
  	ctx.fillText(this.curWord, 160 + oldWidth, 40);
	
	ctx.font = oldFont;
	ctx.fontSize=oldSize ;
	ctx.fillStyle=oldColor;
}

function Level3Update(){
	
	// Pre slow down animation
	
	// Move the butterfly
	if(!this.butterfly.isCaught){
		if(this.butterfly.dest.x>this.butterfly.loc.x){
			this.butterfly.loc.x+=1;
		}else if(this.butterfly.dest.x<this.butterfly.loc.x){
			this.butterfly.loc.x-=1;
		}
		if(this.butterfly.dest.y>this.butterfly.loc.y){
			this.butterfly.loc.y+=1;
		}else if(this.butterfly.dest.y<this.butterfly.loc.y){
			this.butterfly.loc.y-=1;
		}
	}
	
	if(this.butterfly.dest.x==this.butterfly.loc.x && this.butterfly.dest.y==this.butterfly.loc.y){
		// Generate a new place for the butterfly to go to
		this.butterfly.dest.x = Math.floor(Math.random()*150) + 350;
		this.butterfly.dest.y = Math.floor(Math.random()*350) + 75;
	}
	
	// Slow things down
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

function Level3MouseMove(_x,_y){
	this.curLoc.x = _x;
	this.curLoc.y = _y;	
	
	if(this.draggingNet){
		if(_x>this.butterfly.loc.x && _x<this.butterfly.loc.x+100 && _y > this.butterfly.loc.y-50 && _y<this.butterfly.loc.y){
			// We have caught the butterfly
			this.butterfly.isCaught = true;
			this.butterfly.netLoc = new Location(_x,_y);
			this.draggingNet = false;
		}
	}
}

function Level3Click(_x,_y){

	if(this.draggingNet){
		this.draggingNet=false;
	}

	if(_x>195 && _x<234 && _y>355 && _y<380 && !this.butterfly.isCaught){
		// We have clicked on the net
		this.draggingNet = true;
	}
}

function Level3See(){

	// Reveal the hint of what to do
	if(!this.butterfly.isCaught){
		this.curText = "I need to find a way to catch the butterfly - what could I use?";
	}else if(this.butterfly.isCaught){
		this.curText = "Where does one put a newly caught butterfly?";
	}
}
