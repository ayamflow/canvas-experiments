var Dot = function(x, y, radius)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.baseRadius = this.radius;
	// this.color = '#' + ((1<<24) * Math.random()|0).toString(16);
    this.color = tinycolor({h: ~~(Math.random() * 360), s: 60, l: 60}).toHexString();
	this.alpha = '0.4';

	this.velocityX = Math.random() * 8 + 2;
	this.velocityY = Math.random() * 8 + 2;

	this.angleX = Math.random() * Math.PI * 2;
	this.angleY = Math.random() * Math.PI * 2;
	this.angleXIncrement = Math.random() * 0.2 + 0.03;
	this.angleYIncrement = Math.random() * 0.2 + 0.03;

	this.directionX = Math.random() > 0.5 ? 1 : -1;
	this.directionY = Math.random() > 0.5 ? 1 : -1;
};

Dot.prototype.draw = function(context)
{
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.fillStyle = this.color;
	context.arc(0, 0, this.radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.restore();
};