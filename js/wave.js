var waveObj = function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];


}

waveObj.prototype.num = 10;
waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;

	}
}


waveObj.prototype.draw = function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//draw
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>=70){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/70;
			ctx1.save();
			ctx1.beginPath();
			ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
			ctx1.lineWidth=2;
			ctx1.shadowBlur=10;
			ctx1.shadowColor="#fff";
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.stroke();
			ctx1.restore();
		}
	}
}

waveObj.prototype.born = function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=20;
			this.x[i]=x;
			this.y[i]=y;
			//born
			return;
		}
	}
}



var haloObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
}

haloObj.prototype.num=10;

haloObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}

haloObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//draw
			this.r[i]+=deltaTime*0.03;
			if(this.r[i]>70){
				this.alive[i]=false;
				break;
			}
			var alpha = 1-this.r[i]/70;
			ctx1.save();
			ctx1.shadowBlur=10;
			ctx2.shadowColor="rgb(203,91,0)";
			ctx1.lineWidth=2;
			ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.stroke();
			ctx2.restore();
		}
	}
}

haloObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.x[i]=x;
			this.y[i]=y;
			this.r[i]=10;
			this.alive[i]=true;
			return;
		}
	}
}