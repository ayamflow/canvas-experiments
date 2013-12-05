var TweetDots = function(canvas)
{
	var that = this;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');

	TweetDots.prototype.init = function(data)
	{
		//hide search input
		document.getElementById('search').childNodes[1].className = "fadeOut";
		document.getElementById('search').childNodes[3].className = "fadeOut";
		
		if(that.dots) that.dots.length = 0;
		that.dots = [];
		that.text = "";
		that.username = "";

		for(var i=0, l = data.results.length; i < l; i++)
		{
			var dot = new Dot(data.results[i].text, data.results[i].from_user, data.results[i].profile_image_url);
			that.dots[i] = dot;
			//that.dots.push(dot);
		}

		document.addEventListener('click', that.onClick);
		document.addEventListener('touchend', that.onClick);
		document.addEventListener('resize', that.onResize);
		document.getElementById('search').style.display = 'none';
		that.animate();
	};

	TweetDots.prototype.animate = function()
	{
		that.context.clearRect(0, 0, screenWidth, screenHeight);

		that.dots.forEach(function(dot)
		{
			dot.x += dot.directionX * dot.velocityX;
			dot.y += dot.directionY * dot.velocityY;

			if(dot.x >= screenWidth - dot.radius || dot.x <= dot.radius) dot.directionX *= -1;
			if(dot.y >= screenHeight - dot.radius || dot.y <= dot.radius) dot.directionY *= -1;

			dot.draw(that.context);
		});
		requestAnimationFrame(that.animate);
	};

	TweetDots.prototype.onClick = function(event)
	{
		console.log(event);
		var click = { x: event.clientX || event.changedTouches[0].clientX, y : event.clientY || event.changedTouches[0].clientY};
		for(var i = 0, l = that.dots.length; i < l; i++)
		{
			if(that.dots[i].isUnderMouse(click.x, click.y, 20))
			{
				if(that.currentDotId) that.dots[that.currentDotId].scale("base");
				//that.dots[i].scale(50);
				that.dots[i].writeTweet();
				that.currentDotId = i;
				break;
			}
		}
	};

	TweetDots.prototype.onResize = function()
	{
		that.screenWidth = window.innerWidth;
		that.screenHeight = window.innerHeight;
		that.canvas.width = that.screenWidth;
		that.canvas.height = that.screenHeight;
	};
};