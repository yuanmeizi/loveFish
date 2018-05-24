var dataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}



dataObj.prototype.draw=function(){
	var w = can1.width;
	var h = can1.height;

	if(this.gameOver){
		this.alpha +=deltaTime*0.001;
		if(this.alpha>=1){
			this.alpha=1;
		}
		ctx1.save();
		ctx1.shadowBlur=10;
		ctx1.shadowColor="white";

		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("Game Over",w*0.5,h*0.5);
		ctx1.restore();
	}
		ctx1.fillText("score "+this.score,w*0.5,h-20);
}

dataObj.prototype.addScore=function(){
	this.score +=this.fruitNum*10*this.double;
	this.fruitNum=0;
	this.double=1;
}






var dustObj = function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.No=[];
	this.alpha;
}

dustObj.prototype.num=30;
dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=20+Math.random()*15;
		this.No[i]=Math.floor(Math.random()*7);
	}
	this.alpha=0;
}

dustObj.prototype.draw=function(){
	this.alpha +=deltaTime*0.0008;
	var l=Math.sin(this.alpha);

	for(var i=0;i<this.num;i++){

		var no=this.No[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);

	}
}