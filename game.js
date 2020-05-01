function load_images(){
	virus_Image = new Image;
	virus_Image.src = "Assets/v1.png";

	player_Image = new Image;
	player_Image.src = "Assets/superhero.png";

	gem_Image = new Image;
	gem_Image.src = "Assets/shawarma.png"
}



function init(){

	//DOM tree traversal to find an element
	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	W = 900;
	H = 400;

	canvas.width = W;
	canvas.height = H;

	//try to work with canvas
	pen = canvas.getContext('2d');
	console.log(pen);

	score = 0;
	game_over = false;

	e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 10,
	}

	e2 = {
		x : 450,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	}

	e3 = {
		x : 650,
		y : 20,
		w : 60,
		h : 60,
		speed : 10,
	}
	enemy = [e1,e2,e3];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : false,
	}

	//Create an event listener

	//its like a call back function
	canvas.addEventListener('mousedown', function(){
		console.log("You pressed the mouse");
		player.moving = true;
	});

	canvas.addEventListener('mouseup', function(){
		console.log("You released the mouse");
		player.moving = false;
	});



	// document.addEventListener('keydown', function(e){
	// 	console.log(e);
	// });


	gem = {
		x : W - 80,
		y : H/2,
		w : 60,
		h : 60,
	}
}



function draw(){
	pen.clearRect(0,0,W,H);
	pen.fillStyle = "red";
	
	pen.drawImage(player_Image, player.x, player.y, player.w, player.h);
	for(let i = 0 ; i < enemy.length; i++)
	{
		pen.drawImage(virus_Image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
	}
	pen.drawImage(gem_Image, gem.x, gem.y, gem.w, gem.h);

	pen.fillStyle = "white";
	pen.fillText("Score : " + score, 10,20);

}

function isColliding(b1,b2) {
	//x,y,w,h
	if(Math.abs(b1.x-b2.x) <= b1.w && Math.abs(b1.y - b2.y) <= b1.h){
		return true;
	}
	return false;
}

function update(){

	//player state
	if(player.moving == true ){
		player.x += player.speed;
		score += 20;
	}

	for(let i = 0 ; i < enemy.length; i++)
	{
		if(isColliding(player,enemy[i]))
		{
			score -=i * 100;
			if(score < 0) {
				game_over = true;
				alert("Game over. Try harder for extra filling");
			}
		}
	}

	if(isColliding(player,gem)){
		game_over = true;
		draw();
		alert("SHAWARMA IN THE MAKING, Score =  " + score);
	}

	for(let i = 0; i < enemy.length; i++)
	{	
		enemy[i].y += enemy[i].speed;

		if(enemy[i].y >= H - enemy[i].h|| enemy[i].y <= 0) {
			enemy[i].speed *= -1;
		}
	}
	
}

function gameLoop(){

	if(game_over == true){
		clearInterval(f);
	}


	draw();
	update();
}



//start
load_images();

init();

//repeatedly call gameloop
//can't use while loop because while loop executed so many times in 1 second. So we kinda need a delay
var f = setInterval(gameLoop,100);

// clearInterval();



//Event Listeners
//Interact with keyboard









