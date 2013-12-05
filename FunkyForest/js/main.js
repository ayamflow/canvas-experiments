var context, canvas, screenWidth, screenHeight;

window.onload = function()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	/*context.save();
	var background = context.createLinearGradient(screenWidth>>1, screenHeight, screenWidth>>1, 0);
	background.addColorStop(0, '#000000');
	background.addColorStop(1, '#AAAAFF');
	context.fillStyle = background;
	context.fillRect(0, 0, screenWidth, screenHeight);
	context.restore();*/

	var treeNumber = 10, space = screenWidth/treeNumber;
	for(var i = 0; i < treeNumber; i++)
	{
		var t = new Tree(context, i*space);
	}

};