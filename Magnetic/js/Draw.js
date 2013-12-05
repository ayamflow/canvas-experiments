var Draw = function(context)
{
	this.context = context;
	this.particles = [];
	this.density = 80;
	this.distanceMin = 130;

	for(var i = 0; i < this.density; i++)
	{
		var dot = new Dot();
		this.particles.push(dot);
	}

	this.animate();
};

Draw.prototype.animate = function()
{
	this.context.clearRect(0, 0, screenWidth, screenHeight);
	var i, j, l, x1, x2, y1, y2, dist, distMin = this.distanceMin*this.distanceMin;

	for(i = 0, l = this.particles.length; i < l; i++)
	{
		this.particles[i].update(this.context);
		for(j = i + 1; j < l; j++)
		{
			x1 = this.particles[i].x;
			x2 = this.particles[j].x;
			y1 = this.particles[i].y;
			y2 = this.particles[j].y;

			dist = ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1));
			if(dist <= distMin)
			{
				this.context.save();
				this.context.beginPath();
				this.context.strokeStyle = 'rgba(255, 255, 255, ' + (1-dist/distMin) +')';
				this.context.moveTo(this.particles[i].x, this.particles[i].y);
				this.context.lineTo(this.particles[j].x, this.particles[j].y);
				this.context.stroke();
				this.context.closePath();
				this.context.restore();
			}
		}
	}
	requestAnimationFrame(this.animate.bind(this));
};