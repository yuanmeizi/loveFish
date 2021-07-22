var can1,can2,ctx1,ctx2;
var lastTime,deltaTime;
var bgPic = new Image();
var canWidth=window.innerWidth,canHeight=window.innerHeight;
var ane,fruit,mom,baby;
var mx,my;
var babyTail=[];
var babyEye=[];
var babyBody=[];
var momTail=[];
var momEye=[];
var data;
var momBodyOra=[];
var momBodyBlue=[];
var wave,halo;
var dust;
var dustPic=[];

document.body.onload=game;

function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();

	
}


function init(){
	can1 = document.getElementById("canvas1");//fishes dust ui circle
	can2 = document.getElementById("canvas2");//background ane fruits
	ctx1 = can1.getContext("2d");
	ctx2 = can2.getContext("2d");
	bgPic.src = "./src/background.jpg"

	can1.width=canWidth;
	can1.height=canHeight;
	can2.width=canWidth;
	can2.height=canHeight;

	can1.addEventListener("mousemove",onMouseMove,false);

	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom=new momObj();
	mom.init();

	baby=new babyObj();
	baby.init();

	data =new dataObj();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src = "./src/dust"+i+".png";
	}

	dust = new dustObj();
	dust.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}

	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}

	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}

	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src ="./src/bigEye"+i+".png";
	}

	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();

		momBodyOra[i].src ="./src/bigSwim"+i+".png";
		momBodyBlue[i].src ="./src/bigSwimBlue"+i+".png";
	}

	ctx1.fillStyle="#fff";
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";


}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime =  deltaTime<20? now - lastTime:20;
	lastTime=now;
	drawbackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	mombabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();


}


function onMouseMove(e){
if (!data.gameOver){
	if(e.offsetX||e.layerX){
		mx = e.offsetX==undefined?e.layerX:e.offsetX;
		my = e.offsetY==undefined?e.layerY:e.offsetY;
	}
}
}