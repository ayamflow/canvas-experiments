var Playground = function(context)
{
	this.context = context;
	this.mouseX = screenWidth>>1;
	this.mouseY = screenHeight>>1;

	this.context.lineJoin = "round";

	document.body.addEventListener('mousemove', this.onMouseMove.bind(this));

	this.init();
	this.animate();
};

Playground.prototype = {
	onMouseMove: function(e)
	{
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
	},

	init: function()
	{
		this.e1 = new Eloustic(screenWidth>>1, ~~((screenHeight+100)/50), 50, '#ff0000', '#efff00');
		this.e1.init();

		this.gui = new dat.GUI();
		this.gui.add(this.e1, 'distortX', 350, 1000).step(10);
		this.gui.add(this.e1, 'distortY', 350, 1000).step(10);
		this.gui.add(this.e1, 'inertiaX', 0.01, 0.5).step(0.01);
		this.gui.add(this.e1, 'inertiaY', 0.01, 0.5).step(0.01);
		this.gui.add(this.e1, 'width', 1, 200).step(1);
		this.gui.addColor(this.e1, 'startColor');
		this.gui.addColor(this.e1, 'endColor');

		this.pixels = new BGPixels(0, 0, screenWidth, screenHeight, 20);
		this.background = new Image();
		this.background.src = this.pixels.generate();

		this.bgCount = 0;
	},

	animate: function()
	{
		this.context.drawImage(this.background, 0, 0);
		this.e1.animate(this.context, this.mouseX, this.mouseY);
		requestAnimationFrame(this.animate.bind(this));
	}
};