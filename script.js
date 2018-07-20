var toppings;
var heldTopping;
var table;
var pizza;
var gameOverImage;
var cameraImage;

function setup() {
	createCanvas(800, 600);
	table = loadImage("table.jpg");
	pizza = new Topping("pizza.png", -100, 0);
	gameOverImage = loadImage("gameover.png");
	cameraImage = new Topping("camera.png", 10, 500);
	toppings = [];
	heldTopping = null;
	addSlice();
	toppings.push(new Topping("mushroom1.png", 400, 10));
	toppings.push(new Topping("mushroom2.png", 500, 10));
	toppings.push(new Topping("mushroom3.png", 600, 10));
	toppings.push(new Topping("bacon1.png", 450, 100));
	toppings.push(new Topping("bacon2.png", 400, 150));
	toppings.push(new Topping("bread.png", 250, 400));
	toppings[toppings.length - 1].setSpecial(addBurger);
	toppings.push(new Topping("cheese.png", 450, 270));
	toppings.push(new Topping("ham.png", 500, 200));
	toppings[toppings.length - 1].setSpecial(addVesuvio);
	toppings.push(new Topping("lettuce.png", 100, 400));
	toppings[toppings.length - 1].setSpecial(addBurger);
	toppings.push(new Topping("pineapple.png", 620, 250));
	toppings[toppings.length - 1].setSpecial(gameOver);
}

function draw() {
	if (heldTopping !== null && !youLost) {
		heldTopping.move(mouseX - pmouseX, mouseY - pmouseY);
	}
	if (youLost) {
		if (lostTimer < 1) {
			lostTimer += 1 / frameRate();
		}
		tint(255, 255 * (1 - lostTimer), 255 * (1 - lostTimer));
	}

	image(table, 0, 0);
	pizza.draw();
	for (let index = 0; index < toppings.length; index++) {
		toppings[index].draw();
	}
	cameraImage.draw();
	if (heldTopping !== null) {
		heldTopping.draw();
	}
	if (youLost) {
		tint(255, 255, 255, 255 * lostTimer);
		image(gameOverImage, 0, 0);
	}
}

function mousePressed() {
	if (youLost) {
		return;
	} else if (mouseButton === LEFT && cameraImage.isHovered()) {
		saveCanvas("pizza", "png");
	} else if (mouseButton === LEFT) {
		for (let index = toppings.length - 1; index >= 0; index--) {
			if (toppings[index].isHovered()) {
				heldTopping = toppings[index];
				toppings.splice(index, 1);
				break;
			}
		}
	}
}

function mouseReleased() {
	if (youLost) {
		return;
	} else if (mouseButton === LEFT && heldTopping !== null) {
		if (pizza.isHovered()) {
			if (heldTopping.getHasSpecial()) {
				heldTopping.runSpecial();
			}
			pizzaIsEmpty = false;
		}
		toppings.push(heldTopping);
		heldTopping = null;
	}
}

//specials

var pizzaIsEmpty = true;
function addVesuvio() {
	if (pizzaIsEmpty) {
		toppings.push(new Topping("vesuvio.png", -100, 0));
	}
}

function addSlice() {
	toppings.push(new Topping("slice.png", 450, 200));
	toppings[toppings.length - 1].setSpecial(addSlice);
}

var hasHalfBurger = false;
function addBurger() {
	if (hasHalfBurger) {
		toppings.push(new Topping("burger.png", 400, 200));
	} else {
		hasHalfBurger = true;
	}
}

var youLost = false;
var lostTimer;
function gameOver() {
	youLost = true;
	lostTimer = 0;
}
