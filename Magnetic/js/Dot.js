var Dot = function()
{
	this.x = fw.rand(0, screenWidth);
	this.y = fw.rand(0, screenHeight);

	this.radius = 3;

	this.velocityX = fw.rand(5, 10);
	this.velocityY = fw.rand(5, 10);

	var tabDirection = [-1, 1];

	this.directionX = tabDirection[~~(Math.random() * 2)];
	this.directionY = tabDirection[~~(Math.random() * 2)];

	this.inertia = 0.1;
};

Dot.prototype.update = function(context)
{
	if(this.x >= screenWidth || this.x <= 0) this.directionX = -this.directionX;
	if(this.y >= screenHeight || this.y <= 0) this.directionY = -this.directionY;
	
	this.x += this.velocityX * this.directionX * this.inertia;
	this.y += this.velocityY * this.directionY * this.inertia;
};