var screenWidth, screenHeight,
	canvas, dots, gui;

window.onload = function()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas = document.getElementById('canvas');

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	canvas.style.background = "black";

	dots = new Dots(canvas);
	gui = new dat.GUI();
	//gui.add(dots, 'number', 100, 2000);
	gui.add(dots, 'autoFollow');
	gui.add(dots, 'circularMotion');
	gui.add(dots, 'trails');
	gui.add(dots, 'center');
	gui.add(dots, 'scaleBalls');
	gui.add(dots, 'magneticRadius', 5, 30);
};