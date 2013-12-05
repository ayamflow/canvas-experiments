var Dots = function(canvas)
{
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');

	this.dots = [];

	this.mouseX = this.mouseY = 0;
	// vars for playing around with the gui
	this.autoFollow = false;
	this.circularMotion = true;
	this.trails = true;
	this.center = false;
	this.scaleBalls = true;
	this.magneticRadius = 15;

	this.number = Math.random() * 350 + 50;

	for(var i = 0; i < this.number; i++)
	{
		var dot = new Dot( 30 + Math.random() * (screenWidth - 40), 30 + Math.random() * (screenHeight - 40), Math.random() * 8 + 5);
		this.dots.push(dot);
	}

	canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
	document.addEventListener("mousemove", this.onMouseMove.bind(this));
	canvas.addEventListener("mouseup", this.onMouseUp.bind(this));

	this.animate();
};

Dots.prototype.onMouseDown = function(event)
{
	this.autoFollow = true;
};

Dots.prototype.onMouseMove = function(event)
{
	this.mouseX = event.clientX;
	this.mouseY = event.clientY;
};

Dots.prototype.onMouseUp = function()
{
	this.autoFollow = false;
};

Dots.prototype.animate = function()
{
	var that = this;
	if(this.trails)
	{
		this.context.fillStyle = "rgba(0,0,0,0.05)";
		this.context.fillRect(0, 0, screenWidth, screenHeight);
	}
	else
		this.context.clearRect(0, 0, screenWidth, screenHeight);

	if(this.center)
	{
		this.mouseX = screenWidth/2;
		this.mouseY = screenHeight/2;
	}

	if(this.autoFollow)
	{
		this.dots.forEach(function(dot)
		{
			if(that.scaleBalls)
				if(dot.radius > 2) dot.radius -= 0.1;
			dot.angleX += dot.angleXIncrement;
			dot.angleY += dot.angleYIncrement;
			if(that.circularMotion) dot.angleX = dot.angleY;
			var dx = that.mouseX + Math.cos(dot.angleX) * that.magneticRadius * that.magneticRadius;
			var dy = that.mouseY + Math.sin(dot.angleY) * that.magneticRadius * that.magneticRadius;
			dot.x += (dx - dot.x) * 0.005 * dot.velocityX;
			dot.y += (dy - dot.y) * 0.005 * dot.velocityY;

			dot.draw(that.context);
		});
	}
	else
	{
		this.dots.forEach(function(dot)
		{
			if(that.scaleBalls)
				if(dot.radius < dot.baseRadius) dot.radius += 0.1;
			dot.x += dot.directionX * dot.velocityX;
			dot.y += dot.directionY * dot.velocityY;


			if(dot.x >= screenWidth - dot.radius || dot.x <= dot.radius) dot.directionX *= -1;
			if(dot.y >= screenHeight - dot.radius || dot.y <= dot.radius) dot.directionY *= -1;

			dot.draw(that.context);
		});
	}
	requestAnimationFrame(this.animate.bind(this));
};