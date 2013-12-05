var context, canvas, screenWidth, screenHeight;

window.onload = function()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	var number = fw.rand(1, 3),
		spaceX = screenWidth/number,
		spaceY = screenHeight/number;

	document.body.addEventListener('click', function(event)
	{
		console.log(event.clientY);
		var coral = new Coral(context, event.clientX, event.clientY);
	});

};