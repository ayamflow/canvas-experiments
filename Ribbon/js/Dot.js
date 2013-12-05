var Dot = function(x, y)
{
	this.x = x;
	this.y = y;

	this.velocityX = Math.random() * 15 + 10;
	this.velocityY = Math.random() * 15 + 10;
	this.angleX = Math.random() * Math.PI * 2;
	this.angleY = Math.random() * Math.PI * 2;
	this.angleXIncrement = 0.03;
	this.angleYIncrement = 0.07;

	var tabDirection = [-1, 1];

	this.directionX = tabDirection[~~(Math.random() * 2)];
	this.directionY = tabDirection[~~(Math.random() * 2)];

	this.inertia = 0.005;
};

Dot.prototype.update = function()
{
	if(this.x >= screenWidth || this.x <= 0) this.directionX = -this.directionX;
	if(this.y >= screenHeight || this.y <= 0) this.directionY = -this.directionY;

	this.angleX = this.angleY = this.angleX + ((Math.random() -0.5 )* 0.15);
	this.angleX += this.angleYIncrement;
	this.angleY += this.angleYIncrement;
	
	/*this.x += this.velocityX * Math.cos(this.angleX) * this.directionX * this.inertia;
	this.y += this.velocityY * Math.cos(this.angleY) * this.directionY * this.inertia;*/

	var dx = this.x + Math.cos(this.angleX) + Math.random() * this.angleX;
	var dy = this.y + Math.sin(this.angleY) + Math.random() * this.angleY;
	this.x += (dx - this.x) * this.velocityX * this.directionX * this.inertia;
	this.y += (dy - this.y) * this.velocityY * this.directionY * this.inertia;
};