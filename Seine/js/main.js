var canvas, context,
	screenWidth, screenHeight;

window.onload = function()
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	var resize = function()
    {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;

        canvas.width = screenWidth;
        canvas.height = screenHeight;
    };

    resize();
    window.addEventListener('resize', resize);

	var playground = new Playground(context);
};