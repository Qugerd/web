var imgstr;
var imgx;
var imgy;
var imgs;
var youx;
var	youy;
var youstepx;
var	youstepy;
var youmovex;
var youmovey;
var buls;
var ebuls;
var enemies;
var score;
var	endgame;
var	tcount;
var time;
var dispID;
var lvl;
var cd;
var cdMax;

var name = prompt("Введите ваше имя", 'Кто-то');

function newGame() {
	imgstr = ["fon.jpg", "0.png", "2.png", "3.png", "4.png"];
	imgx = [800, 75, 21, 100, 15];
	imgy = [600, 75, 35, 85, 50];
	imgs = [];
	youx = 100;
	youy = 400;
	youstepx = 4;
	youstepy = 3;
	youmovex = 0;
	youmovey = 0;
	buls = [];
	ebuls = [];
	enemies = [];
	score = 0;
	endgame = 0;
	tcount = 0;
	time = 30;
	dispID;
	lvl = 0;
	cdMax = 20;
	cd = 0;
	ImagesInit();
	timer();
}

function displayTable() {
	let html = '<table id="gen"><th>ИМЯ</th><th>ОЧКИ</th>';
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i) != "i18nextLng") {
			html += '<tr aling="center">';
				for (let j = 0; j < 1; j++) {
					let key = localStorage.key(i);
					html += "<td>" + localStorage.key(i) + "</td>";
					html += "<td>" + localStorage.getItem(key) + "</td>";
				}
			html += "</tr>";
		}
	}
	html += "</table>";

	document.getElementById("top").innerHTML = html;
}

function getRandomArbitrary(min = 1, max = 4) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clsEnemyAndBullet(i, j) {
	var x1 = enemies[i].x,
		y1 = enemies[i].y;
		
	var x2 = buls[j].x,
		y2 = buls[j].y;

	if (
		x2 + imgx[2] > x1 &&
		x1 + imgx[3] > x2 &&
		y2 + imgy[2] > y1 &&
		y1 + imgy[3] > y2
	) {
		if (enemies[i].hp == 1) {
			enemies.splice(i, 1);
			score += 10;
			lvlplus();
		} else {
			enemies[i].hp--;
		}
		buls.splice(j, 1);
		return 1;
	}
	return 0;
}

function clsPlayerAndBullet(j) {
	var x1 = youx,
		y1 = youy;
	var x2 = ebuls[j].x,
		y2 = ebuls[j].y;

	if (
		x2 + imgx[4] > x1 &&
		x1 + imgx[1] > x2 &&
		y2 + imgy[4] > y1 &&
		y1 + imgy[1] > y2
	) {
		endgame++;
		ebuls.splice(0, ebuls.length);
		if (endgame == 3) {
			localStorage.setItem(name, score);

			alert("Вы набрали " + score + " очков.");

			displayTable();
			newGame();
			return 1;
		}
		timer();
	}
	return 0;
}

function newBullet() {
	if (cd == 0){
		buls.push({
			x: youx,
			y: youy
		});
		cd = cdMax;
	}
}

function newEBullet(i) {
	ebuls.push({
		x: enemies[i].x + Math.floor(imgx[3] / 2),
		y: enemies[i].y + imgy[3] + 2,
	});
}

function newEnemies() {
	if (enemies.length > 0) 
		return;
	
	for (var i = 0; i < 5; i++) {
		enemies.push({
			x: i * 160 + 20,
			y: 100,
			hp: getRandomArbitrary() + Math.floor(lvl / 5)
		});
	}
}

function moveBullets() {
	for (var i = buls.length - 1; i >= 0; i--) {
		buls[i].y -= 7 + lvl;
		for (var j = enemies.length - 1; j >= 0; j--)
			if (clsEnemyAndBullet(j, i) == 1) return 1;
		if (buls[i].y < -40) buls.splice(i, 1);
	}
}

function moveEBullets() {
	for (var i = ebuls.length - 1; i >= 0; i--) {
		ebuls[i].y += 7 + lvl;
		if (clsPlayerAndBullet(i) == 1) return 1;

		if (ebuls[i].y > 550) ebuls.splice(i, 1);
	}
}

function movePlayer(e) {
	if (endgame == 3) return;
	if (e.keyCode == 37) {
		youmovex = -1;
		youmovey = 0;
	}
	if (e.keyCode == 39) {
		youmovex = 1;
		youmovey = 0;
	}

	if (e.keyCode == 38) {
		newBullet();
	}
}

function timer() {
	if (endgame == 3) 
		return;
	tcount++;
	
	if (cd <= 1)
		cd = 0;
	else
		cd--;

	if (youx >= 800 - 5 - imgx[1]) {
		youmovex = -1;
		youmovey = 0;
	}
	if (youx <= 0 + 5) {
		youmovex = 1;
		youmovey = 0;
	}
	if (youy >= 600 - 5 - imgy[1]) {
		youmovey = -1;
		youmovex = 0;
	}
	if (youy <= 200 + 5) {
		youmovey = 1;
		youmovex = 0;
	}

	youx += youmovex * youstepx;
	youy += youmovey * youstepy;

	if (tcount % 50 == 0) {
		for (var i = 0; i < enemies.length; i++) {
			if (Math.random() < 0.2 + Math.min(0.1, 0.001 * (tcount % 100)))
				newEBullet(i);
		}
	}

	moveBullets();

	if (moveEBullets() == 1) 
		return;

	newEnemies();

	document.onkeydown = movePlayer;

	draw();
	dispID = setTimeout("timer();", time);
}

function ImagesInit() {
	for (var i = 0; i <= 4; i++) {
		var tmp = new Image();
		tmp.src = imgstr[i];
		imgs.push(tmp);
	}
}

function draw() {
	ImagesInit();
	var cnv = document.getElementById("canvas");
	var ctx = cnv.getContext("2d");

	ctx.drawImage(imgs[0], 0, 0);
	ctx.drawImage(imgs[1], youx, youy, 70, 70);

	for (var i = 0; i < buls.length; i++) {
		ctx.drawImage(imgs[2], buls[i].x, buls[i].y);
	}

	for (var i = 0; i < enemies.length; i++) {
		ctx.drawImage(imgs[3], enemies[i].x, enemies[i].y, 69, 63);
	}

	for (var i = 0; i < ebuls.length; i++) {
		ctx.drawImage(imgs[4], ebuls[i].x, ebuls[i].y);
	}
	ctx.fillStyle = "#470027";
	ctx.font = "bold 20pt Arial";
	ctx.fillText("Очки: " + score + "", 20, 30);
	ctx.fillText("Жизни: " + (3 - endgame) + "", 220, 30);
	ctx.fillText("Игрок: " + name, 420, 30);
	ctx.fillText("Уровень: " + lvl, 620, 30);
	ctx.fillText("Перезарядка: " + cd, 20, 550);
}

function lvlplus() {
	lvl += 1;
	if (lvl % 5 == 0 && cdMax > 0)
		cdMax--;
}

function stop() {
	clearInterval(dispID);
}

function resume() {
	timer();
}

function newGamer() {
	stop();
	localStorage.setItem(name, score);
	name = prompt("Введите новое имя", "Кто-то");
	newGame();
}
