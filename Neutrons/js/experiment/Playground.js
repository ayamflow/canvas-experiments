var Playground = function(context) {
	this.context = context;

	this.init();
    this.createGUI();
	this.animate();
};

Playground.prototype = {
	init: function() {
        // Variables
        this.color = 0;
        this.clearAlpha = 0.05;
        this.colorIncrement = 3;
        this.mouse = {
            x: screenWidth >> 1,
            y: screenHeight >> 1
        };
        this.brushIncrement = 0.03;
        this.angleX = 0.03;
        this.angleY = 0.07;
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
	},

    updateBrushSize: function() {
        this.brushIncrement += 0.03;
        this.brushSize = 30 + 10 * Math.cos(this.brushIncrement * 3) * Math.sin(this.brushIncrement * 0.2); // Based on equations for organic motions by Soulwire !
    },

    onMouseMove: function(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    },

    drawCircle: function(x, y, radius) {
        radius = Math.max(0, radius);
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    },

    centerSymmetry: function(angle) {
      this.context.save();
      this.context.translate(screenWidth / 2, screenHeight / 2); // Go to center of screen for better rotate
      this.context.rotate(angle);
      this.context.drawImage(canvas, - screenWidth / 2, - screenHeight / 2, screenWidth, screenHeight);
      this.context.restore();
    },

	animate: function() {
        this.context.fillStyle = "rgba(0,0,0," + this.clearAlpha + ")";
        this.context.fillRect(0, 0, screenWidth, screenHeight);
		// EXPERIMENT LOGIC

        this.updateBrushSize();

        this.color += this.colorIncrement;
        if(this.color >= 360) this.color = 0;
        this.context.fillStyle = tinycolor("hsl(" + this.color + ", 50, 50)").toHexString();
        this.drawCircle(this.mouse.x, this.mouse.y, this.brushSize);
        this.angleX += 0.07;
        this.angleY += 0.03;
        this.centerSymmetry(this.angleX / this.angleY);// * Math.atan(this.mouse.y, this.mouse.x));

		requestAnimationFrame(this.animate.bind(this));
	},

    createGUI: function() {
        this.gui = new dat.GUI();
        this.gui.add(this,'clearAlpha', 0.01, 0.28).step(0.01);
        this.gui.add(this,'colorIncrement', 1, 6).step(1);
    }
};