var Ribbon = function(tone)
{
	this.tone = tone;
	this.dots = [
		new Dot(this.rand(10, screenWidth - 10), this.rand(10, screenHeight - 10)),
		new Dot(this.rand(10, screenWidth - 10), this.rand(10, screenHeight - 10))
	];
};

Ribbon.prototype.update = function()
{
	this.dots.forEach(function(dot, i)
	{
		dot.update();
	});
};

Ribbon.prototype.rand = function(min, max)
{
	return Math.random() * (max - min) + min;
};