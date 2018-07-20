class Topping {
	constructor(aImagePath, aX, aY) {
		this.image = loadImage(aImagePath);
		this.x = aX;
		this.y = aY;
		this.hasSpecial = false;
	}

	draw() {
		image(this.image, this.x, this.y);
	}

	isHovered() {
		if (mouseX < this.x || mouseX > this.x + this.image.width ||
			mouseY < this.y || mouseY > this.y + this.image.height) {
				return false;
		}
		let color = this.image.get(mouseX - this.x, mouseY - this.y);
		return color[3] > 0;
	}

	move(aX, aY) {
		this.x += aX;
		this.y += aY;
	}

	getHasSpecial() {
		return this.hasSpecial;
	}

	setSpecial(aFunction) {
		this.special = aFunction;
		this.hasSpecial = true;
	}

	runSpecial() {
		this.special();
		this.hasSpecial = false;
	}
}
