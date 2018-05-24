var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;

}

momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;

}

momObj.prototype.draw=function(){

	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.98);

	var deltaX=mx-this.x;
	var deltaY=my-this.y;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;

	this.angle = lerpAngle(beta,this.angle,0.9);

	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer %=50;
	}


	this.momEyeTimer +=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer %=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.floor(Math.random()*1500+2000);
		}
		if(this.momEyeCount==1){
			this.momEyeInterval=200;
		}
	}


	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var momTailCount=this.momTailCount;

	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);

	var momBodyCount=this.momBodyCount;
	if(data.double==1){
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}

	

	var momEyeCount=this.momEyeCount;

	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}







function momFruitsCollision(){
if(!data.gameOver){
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l<900){
				fruit.alive[i]=false;
				data.fruitNum++;
				mom.momBodyCount++;
				if(mom.momBodyCount>7){mom.momBodyCount=7;}
				if(fruit.fruitType[i]=="blue"){
					data.double=2;
				}
				wave.born(fruit.x[i],fruit.y[i]);
				// else{
				// 	data.double=1;
				// }

			}
		}
	}
}
}



function mombabyCollision(){

	if(data.fruitNum>0 && !data.gameOver){
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	    if(l<900){
		//baby recover
		   baby.babyBodyCount=0;
		//data

		   mom.momBodyCount=0;
		   data.addScore();
		   //绘制halo
		   halo.born(baby.x,baby.y);
	    }
	}	
}