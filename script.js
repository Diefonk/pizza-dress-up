var toppings;
var heldTopping;
var table;
var pizza;
var gameOverImage;
var cameraImage;

function setup() {
	createCanvas(800, 600);
	table = loadImage("images/table.jpg");
	pizza = new Topping("images/pizza.png", -100, 0);
	gameOverImage = loadImage("images/gameover.png");
	cameraImage = new Topping("images/camera.png", 10, 500);
	toppings = [];
	heldTopping = null;
	addSlice();
	toppings.push(new Topping("images/mushroom1.png", 400, 10));
	toppings.push(new Topping("images/mushroom2.png", 500, 10));
	toppings.push(new Topping("images/mushroom3.png", 600, 10));
	toppings.push(new Topping("images/bacon1.png", 450, 100));
	toppings.push(new Topping("images/bacon2.png", 400, 150));
	toppings.push(new Topping("images/bread.png", 250, 400));
	toppings[toppings.length - 1].setSpecial(addBurger);
	toppings.push(new Topping("images/cheese.png", 450, 270));
	toppings.push(new Topping("images/ham.png", 500, 200));
	toppings[toppings.length - 1].setSpecial(addVesuvio);
	toppings.push(new Topping("images/lettuce.png", 100, 400));
	toppings[toppings.length - 1].setSpecial(addBurger);
	toppings.push(new Topping("images/pineapple.png", 620, 250));
	toppings[toppings.length - 1].setSpecial(gameOver);
}

function draw() {
	var toppingIsHovered = false;
	for (let index = toppings.length - 1; index >= 0; index--) {
		if (toppings[index].isHovered()) {
			toppingIsHovered = true;
			break;
		}
	}
	if (cameraImage.isHovered() && heldTopping === null) {
		cursor(HAND);
	} else if (toppingIsHovered || heldTopping !== null) {
		cursor(MOVE);
	} else {
		cursor(ARROW);
	}

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
		toppings.push(new Topping("images/vesuvio.png", -100, 0));
	}
}

function addSlice() {
	toppings.push(new Topping("images/slice.png", 450, 200));
	toppings[toppings.length - 1].setSpecial(addSlice);
}

var hasHalfBurger = false;
function addBurger() {
	if (hasHalfBurger) {
		toppings.push(new Topping("images/burger.png", 400, 200));
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
