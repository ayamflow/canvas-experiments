var Playground = function(context)
{
	this.context = context;
	var i;

	this.height = 20;
	this.width = 5;
	this.mouseX = screenWidth>>1;
	this.mouseY = screenHeight>>1;
	this.angleX = Math.random() * Math.PI;
	this.angleY = Math.random() * Math.PI;

	document.addEventListener("mousemove", this.onMouseMove.bind(this));

	// dat.gui variables
	this.density = 200;
	this.gravity = 0;
	this.wind = 0;
	this.responsiveness = 3;
	this.circle = false;
	this.startColor = '#FF0000';
	this.endColor = '#0000FF';
	this.auto = false;

	this.gui = new dat.GUI();
	this.gui.add(this, 'responsiveness', 1, 10).step(1);
	this.gui.add(this, 'circle');
	this.gui.add(this, 'auto');
	this.gui.add(this, 'gravity', 0, 100);
	this.gui.add(this, 'wind', 0, 100);
	var widthC = this.gui.add(this, 'width', 1, 50).step(1),
		heightC = this.gui.add(this, 'height', 1, 50).step(1),
		sizeC = this.gui.add(this, 'density', 10, 1000).step(10),
		color1 = this.gui.addColor(this, 'startColor'),
		color2 = this.gui.addColor(this, 'endColor');

	sizeC.onChange(this.init.bind(this));
	widthC.onChange(this.init.bind(this));
	heightC.onChange(this.init.bind(this));
	color1.onChange(this.init.bind(this));
	color2.onChange(this.init.bind(this));

	this.init();
	this.animate();
};

Playground.prototype = {
	init: function()
	{
		this.kins = [];
		this.colors = fw.createColorRange(this.startColor, this.endColor, 255);
		var i, colorIndex;
		for(i=0; i<this.density; i++)
		{
			colorIndex = ~~(i / this.density * 255);
			this.kins.push(new Kin(screenWidth - 200, screenHeight>>1, this.width, this.height, this.colors[colorIndex]));
		}
		this.first = this.kins[0];
		console.log(this.colors);
	},

	onMouseMove: function(event)
	{
		if(!this.auto)
		{
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		}
	},
	animate: function()
	{
		this.context.clearRect(0, 0, screenWidth, screenHeight);

		if(this.auto)
		{
			this.angleX += 0.03;
			this.angleY += 0.07;
			this.mouseX = screenWidth>>1;
			this.mouseX = (screenWidth>>2) * Math.cos(this.angleX) + (screenWidth>>1);
			this.mouseY = (screenHeight>>2) * Math.sin(this.angleY) + (screenHeight>>1);
		}

		var dx, dy, w, h;
		dx = this.mouseX - this.first.x;
		dy = this.mouseY - this.first.y;
		this.first.theta = Math.atan2(dy, dx);
		this.first.x = this.mouseX - (this.first.getPin().x - this.first.x);
		this.first.y = this.mouseY - (this.first.getPin().y - this.first.y);
		//this.first.update(this.context);

		for(var i=1, l=this.kins.length; i<l; i++)
		{
			this.kins[i].x -= this.wind;
			this.kins[i].y += this.gravity;
			dx = this.kins[i-1].x - this.kins[i].x;
			dy = this.kins[i-1].y - this.kins[i].y;
			this.kins[i].theta = Math.atan2(dy, dx);
			w = this.kins[i].getPin().x - this.kins[i].x;
			h = this.kins[i].getPin().y - this.kins[i].y;
			this.kins[i].x = this.kins[i-1].x - w/this.responsiveness;
			this.kins[i].y = this.kins[i-1].y - h/this.responsiveness;
			this.kins[i].update(this.context, this.circle);
		}

		requestAnimationFrame(this.animate.bind(this));
	}
};