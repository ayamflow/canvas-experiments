var Playground = function(context)
{
	this.context = context;
	this.init();
	//this.animate();
};

Playground.prototype = {
	init: function()
	{
		this.density = 1000;
		this.timer = 0;
		this.context.globalCompositeOperation = "lighter";

		this.modes = ["water", "plasma"];
		this.mode = "water";

		this.spread = true;
		this.minHeight = 30;
		this.maxHeight = 70;
		this.minTheta = 0;
		this.maxTheta = 180;
		this.startColor = '#1BD6E0';
		this.endColor = '#1B50E0';
		this.isAnimated = false;

		//this.colors = fw.createColorRange('#1BD6E0', '#1B50E0', 20);
		this.colors = fw.createColorRange(this.startColor, this.endColor, 20);
		this.color = fw.getColorInRange(this.colors, fw.rand(0.01, 0.05));
		//this.context.strokeStyle = this.color;

		this.gui = new dat.GUI();
		var gm = this.gui.add(this,'mode', this.modes),
			gs = this.gui.add(this, 'spread'),
			gd = this.gui.add(this, 'density', 100, 8000).step(10),
			gmh = this.gui.add(this, 'minHeight', 1, 200).step(1),
			gminh = this.gui.add(this, 'maxHeight', 1, 500).step(1),
			gst = this.gui.addColor(this, 'startColor'),
			get = this.gui.addColor(this, 'endColor'),
			//ga = this.gui.add(this, 'isAnimated'),
			self = this;

		gm.onChange(this.drawStripes.bind(this));
		gd.onChange(this.drawStripes.bind(this));
		gmh.onChange(this.drawStripes.bind(this));
		gminh.onChange(this.drawStripes.bind(this));
		gs.onChange(this.drawStripes.bind(this));
		gst.onChange(function() {
			self.updateColors();
			self.drawStripes();
		});
		get.onChange(function() {
			self.updateColors();
			self.drawStripes();
		});
		//ga.onChange(this.animate.bind(this));

		this.drawStripes();
	},

	animate: function()
	{
		if(this.isAnimated){
			this.drawStripes();
			requestAnimationFrame(this.animate.bind(this));
		}
	},

	updateColors: function()
	{
		this.colors = fw.createColorRange(this.startColor, this.endColor, 20);
		this.color = fw.getColorInRange(this.colors, fw.rand(0.01, 0.05));
	},

	drawStripes: function()
	{
		this.context.clearRect(0, 0, screenWidth, screenHeight);
		var yPos;
		//this.colors = fw.createColorRange(fw.randColor(), fw.randColor(), this.density, this.mode);
		for(var i=0; i<this.density; i++)
		{
			// Plasma + water
			//var s = new Stripe(fw.rand(0, screenWidth), fw.rand(0, screenHeight), fw.rand(this.minHeight, this.maxHeight), screenHeight, fw.rand(0, 180), this.color, this.mode);//fw.getColorInRange(this.colors, fw.rand(0, 0.05)));
			yPos = this.spread ? fw.rand(0, screenHeight) : 0;
			var s = new Stripe(0, yPos, screenWidth, fw.rand(this.minHeight, this.maxHeight), fw.rand(0, 180), fw.getColorInRange(this.colors, fw.rand(0, 0.05)), this.mode);//fw.getColorInRange(this.colors, fw.rand(0, 0.05)));
			//var s = new Stripe(x, y, width, height, theta, color, mode);
			s.draw(this.context);
		}
	}
};