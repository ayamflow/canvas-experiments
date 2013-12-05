var Draw = function(context)
{
	this.context = context;
	this.ribbons = [];

	this.pinks = [
		'rgba(255,0,0)',
		'rgba(255,0,32)',
		'rgba(255,0,64)',
		'rgba(255,0,96)',
		'rgba(255,0,128)',
		'rgba(255,0,159)',
		'rgba(255,0,191)',
		'rgba(255,0,223)',
		'rgba(255,0,255)'
	];

	this.reds = [
		'rgba(255,255,0)',
		'rgba(255,223,0)',
		'rgba(255,191,0)',
		'rgba(255,159,0)',
		'rgba(255,128,0)',
		'rgba(255,96,0)',
		'rgba(255,64,0)',
		'rgba(255,32,0)',
		'rgba(255,0,0)'
	];

	this.blues = [
		'rgba(0,255,255)',
		'rgba(0,223,255)',
		'rgba(0,191,255)',
		'rgba(0,159,255)',
		'rgba(0,128,255)',
		'rgba(0,96,255)',
		'rgba(0,64,255)',
		'rgba(0,32,255)',
		'rgba(0,0,255)'
	];

	this.purples = [
		'rgba(51,51,255)',
		'rgba(70,45,249)',
		'rgba(89,38,242)',
		'rgba(108,32,236)',
		'rgba(128,26,230)',
		'rgba(147,19,223)',
		'rgba(166,13,217)',
		'rgba(185,6,210)',
		'rgba(204,0,204)'
	];

	this.oranges = [
		'rgba(255,255,102)',
		'rgba(249,223,89)',
		'rgba(242,191,77)',
		'rgba(236,159,64)',
		'rgba(230,128,51)',
		'rgba(223,96,38)',
		'rgba(217,64,26)',
		'rgba(210,32,13)',
		'rgba(204,0,0)'
	];

	this.colors = [
		this.pinks,
		this.reds,
		this.blues,
		this.purples,
		this.oranges
	];

	this.filter = "lighter";
	this.context.globalCompositeOperation  = this.filter;
	
	// vars for playing around with the gui
	this.trails = true;
	this.density = 8;

	var ribbon, tone, color, alpha;
	var length = this.colors.length;

	for(var i = 0; i < this.density; i++)
	{
		tone = this.colors[~~(Math.random() * length)];
		alpha = Math.random().toFixed(2);
		ribbon = new Ribbon(tone);
		this.ribbons.push(ribbon);
	}

	this.animate();
};

Draw.prototype.getColorInRange = function(tone, alpha)
{
	var color;
	var colorIndex = ~~(Math.random()*tone.length);

	color = tone[colorIndex];
	color = color.split(')') + alpha + ')';

	return color;
};

Draw.prototype.animate = function()
{
	var that = this;
	if(this.trails)
	{
		this.context.fillStyle = "rgba(0,0,0,0.05 )";
		this.context.fillRect(0, 0, screenWidth, screenHeight);
	}
	else
		this.context.clearRect(0, 0, screenWidth, screenHeight);

	this.ribbons.forEach(function(ribbon)
	{
		ribbon.update();

		that.context.save();
		that.context.strokeStyle = that.getColorInRange(ribbon.tone, 0.1);
		that.context.beginPath();
		that.context.moveTo(ribbon.dots[0].x, ribbon.dots[0].y);
		that.context.lineTo(ribbon.dots[1].x, ribbon.dots[1].y);
		that.context.stroke();
		that.context.closePath();
		that.context.restore();
	});

	requestAnimationFrame(this.animate.bind(this));
};