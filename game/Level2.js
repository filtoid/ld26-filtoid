var MAN_PHRASE_1 = "Hey";
var MAN_PHRASE_2 = "I need a drink - get me a bottle";
var MAN_PHRASE_3 = "Here is some money - get me my change";

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
		
	this.bottleVisible = false;	
		
	this.bottleImage = new Image();
	this.bottleImage.src = "./img/bottle_outline.png";
	this.barImage = new Image();
	this.barImage.src = "./img/bar.png";
	this.barOffset = 0;
	this.labelImage = new Image();
	this.labelImage.src = "./img/label.png";
	this.labelVisible=false;

	this.arrowRight = new Image();
	this.arrowRight.src = "./img/arrow_right.png";
	this.arrowRightHigh = new Image();
	this.arrowRightHigh.src = "./img/arrow_right_high.png";
	this.arrowLeft = new Image();
	this.arrowLeft.src = "./img/arrow_left.png";
	this.arrowLeftHigh = new Image();
	this.arrowLeftHigh.src = "./img/arrow_left_high.png";

	this.arrowHighlight = "";
	
	this.arrowsVisible = false;
	this.triedDrink=false;
	
	this.manDelay = 0;
	this.manCurPhrase = MAN_PHRASE_1;
	this.MAX_MAN_DELAY = 20;
	
	this.seeCount = 0;
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
	
	if(this.bottleVisible){
		ctx.drawImage(this.barImage,this.barOffset,0,this.bottleImage.width, this.bottleImage.height,200,150,this.bottleImage.width,this.bottleImage.height);
		ctx.drawImage(this.bottleImage,200,150);
		
		if(this.labelVisible)
			ctx.drawImage(this.labelImage,200,150);
	}
	
	if(this.manCurPhrase!=""){
		var alph = ctx.globalAlpha;
		ctx.globalAlpha = (this.manDelay/this.MAX_MAN_DELAY);
		ctx.fillText(this.manCurPhrase,250,50);
		ctx.globalAlpha=alph;
	}
	
	if(this.arrowsVisible){
		if(this.arrowHighlight=="left")
			ctx.drawImage(this.arrowLeftHigh,200,350);
		else
			ctx.drawImage(this.arrowLeft,200,350);
		
		if(this.arrowHighlight=="right")
			ctx.drawImage(this.arrowRightHigh,300,350);
		else
			ctx.drawImage(this.arrowRight,300,350);
	}
	
	ctx.fillStyle = oldColor;
	ctx.font = oldFont;
}

function Level2Update(){

	// To Slow the ticks down to a readable speed
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
	
	if(this.manDelay <0){
		
		this.manDelay=this.MAX_MAN_DELAY;
	}else
		this.manDelay-=1;
	
}

function Level2MouseMove(_x,_y){
	
	this.arrowHighlight = "";
	
	if(this.arrowsVisible){
		if(_x>200 && _x<300 && _y>350 && _y<450){
			this.arrowHighlight = "left";
		}else if(_x>300 && _x<400 && _y>350 && _y<450){
			this.arrowHighlight = "right";
		}
	}
}

function Level2Click(_x,_y){
	//ctx.fillText(this.manCurPhrase,250,50);
	if(_x>250 && _x<350 && _y>25 && _y<100){
		// We have clicked on the man - move the dialog on
		if(this.manCurPhrase==MAN_PHRASE_1){
			this.manCurPhrase = MAN_PHRASE_2;
		}
	}
	
	if(_x>200 && _x<350 && _y>150 && _y<350){
		// We have clicked on the bottle
		if(this.manCurPhrase==MAN_PHRASE_2){
			this.labelVisible=false;
			this.arrowsVisible = true;
			this.manCurPhrase = MAN_PHRASE_3;
		}
		
		if(this.manCurPhrase==MAN_PHRASE_3 && this.barOffset>210){
			// We are looking at the till therefore we are have done it
			this.owner.setLevel("Level3");
			this.owner.addScore(10);
		}
		
		if(this.manCurPhrase==MAN_PHRASE_3 && this.barOffset>90 && this.barOffset<160){
			if(this.triedDrink){
				this.curText = "Drinking would be a bad idea right now";
				this.owner.addScore(-1);
			}else{
				this.curText = "As much as I'd like a drink right now I think I'm supposed to be working";
				this.triedDrink = true;
			}
		}
		
	}
	if(this.arrowsVisible){
		if(_x>200 && _x<300 && _y>350 && _y<450){
			this.barOffset-=10;
		}else if(_x>300 && _x<400 && _y>350 && _y<450){
			this.barOffset+=10;
		}
		if(this.barOffset<0)
			this.barOffset=0;
		if(this.barOffset>this.barImage.width-this.bottleImage.width)
			this.barOffset=this.barImage.width-this.bottleImage.width;
	}
	

}

function Level2See(){
	
	
	if(this.seeCount==0){
		this.owner.addScore(5);
		this.curText = "I see a bottle on the bar - there is something strange about it";
		this.bottleVisible=true;
		this.labelVisible = true;
		
		this.seeCount += 1;
	}else if(this.seeCount == 1){
		this.seeCount += 1;
		this.curText = "The bottle seems to draw my attention";
	}else{
		this.curText = "The bottle seems to draw my attention";
		this.owner.addScore(-1);
	}
}
