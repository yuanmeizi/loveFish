function drawbackground(){
	ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
}


var aneObj = function(){
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;
	this.amp=[];
}

aneObj.prototype.num=120;
aneObj.prototype.init=function(){

	for(var i=0;i<this.num;i++){
		this.rootx[i] = Math.random()*canWidth;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight-200+Math.random()*50;
		this.amp[i] = Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){

	this.alpha +=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha=0.7;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for(var i=0;i<this.num;i++){

		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i]+l*this.amp[i]*0.6;
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}



var fruitObj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.l=[];
	this.spd=[];
	this.fruitType=[];
	this.orange= new Image();
	this.blue=new Image();
	this.aneNo=[];
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=0.01*Math.random()+0.001;
		this.fruitType[i]="";
		this.aneNo[i]=0;
		this.born(i);
	}
	this.orange.src="./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.born=function(i){
	this.aneNo[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran = Math.random();
	if(ran<=0.3){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}

}


fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){

		if(this.alive[i]){
		var pic;
		if(this.fruitType[i]=="blue"){
			pic = this.blue;
		}else{
			pic = this.orange;
		}


		if(this.l[i]<=14){
			this.l[i] +=this.spd[i]*deltaTime;
			var No = this.aneNo[i];
			this.x[i] = ane.headx[No];
			this.y[i] = ane.heady[No];
		}
		else{
			this.y[i] -=this.spd[i]*7*deltaTime;
		}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
	if(this.y[i]<10){this.alive[i]=false;}
	}
}
}


function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){num++;}
	}
	if(num<15){
		sendFruit();
		return;
	}

}

function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}