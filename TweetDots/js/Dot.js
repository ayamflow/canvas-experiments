var Dot = function(text, user, imgUrl)
{
	var randomMinMax = function(min, max)
	{
		return Math.random() * (max - min) + min;
	};

	this.text = text.parseURL().parseUsername().parseHashtag();
	this.image = new Image();
	this.image.src = imgUrl;

	this.user = user;

	this.focused = false;

	this.x = randomMinMax(15, screenWidth);
	this.y = randomMinMax(15, screenHeight);

	this.directionValues = [-1, 1];

	this.minRadius = 5, this.maxRadius = 30;
	this.radius = randomMinMax(this.minRadius, this.maxRadius);
	this.baseRadius = this.radius;

	this.directionX = this.directionValues[Math.floor(randomMinMax(0, 2))];
	this.directionY = this.directionValues[Math.floor(randomMinMax(0, 2))];

	this.velocityX = randomMinMax(0.1, 1);
	this.velocityY = randomMinMax(0.1, 1);
	this.baseVelocityX = this.velocityX;
	this.baseVelocityY = this.velocityY;

	this.color = "rgba(255, 255, 255, 0.8)";

	this.tweetDiv = document.getElementById('tweet');
	this.userDiv = document.getElementById('user');

	Dot.prototype.draw = function(context)
	{
		context.save();
		context.translate(this.x, this.y);
		context.beginPath();
		context.fillStyle = this.color;
		if(this.focused)
		{
			context.fillStyle = "transparent";
			if(this.radius < 50) this.radius += (50-this.radius) / 10;
		}
		context.arc(0, 0, this.radius, 0, Math.PI*2, true);
		if(this.focused)
		{
			context.clip();
			context.drawImage(this.image, -this.radius, -this.radius, this.radius*2, this.radius*2);
			context.lineWidth = 10;
			context.strokeStyle = "gray";
			context.stroke();
		}
		context.closePath();
		context.fill();
		context.restore();
	};

	Dot.prototype.writeTweet = function()
	{
		this.focused = true;
		this.tweetDiv.innerHTML = this.text;
		this.userDiv.innerHTML = "from " + this.user;
	};

	Dot.prototype.isUnderMouse = function(mouseX, mouseY, step)
	{
		if (step === undefined) step = 0;
		if( (mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y) < (this.radius * this.radius + step * step))
			return true;
		else return false;
	};

	Dot.prototype.scale = function(scale)
	{
		if(scale === "base")
		{
			this.focused = false;
			this.radius = this.baseRadius;
		}
		else this.radius = scale;
	};
};