var canvas, context, screenWidth, screenHeight;

window.onload = function()
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	var playground = new Draw(context);
}