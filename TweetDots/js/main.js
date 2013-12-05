var screenWidth, screenHeight,
	canvas, input, loader,
	twitterStatuses,
	tweetDots;

var onInputChange = function(event)
{
	if(event.keyCode != 13 || event.value === "") return;
	loader.className = "fadeIn";
	// query, number of tweets, callback
	twitterStatuses = new TwitterRequest(escape(event.target.value), 100, tweetDots.init);
};

window.onload = function()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas = document.getElementById('canvas');
	input = document.getElementById('search').childNodes[1];
	loader = document.getElementById('search').childNodes[3];

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	tweetDots = new TweetDots(canvas);

	input.addEventListener('keyup', onInputChange);
};