var screenWidth, screenHeight,
	canvas, context, draw, button, exportPNG;

window.onload = function()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight - 30;

	button = document.getElementById('toPNG');

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	draw = new Draw(context);

	button.addEventListener('click', function()
	{
		exportPNG = canvas.toDataURL();
		window.open(exportPNG);
		//window.location.href = exportPNG.replace("image/png", "image/octet-stream");
	});
};