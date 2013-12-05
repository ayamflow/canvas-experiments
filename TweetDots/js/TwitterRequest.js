var TwitterRequest = function(request, rpp, callback)
{

	this.url = 'http://search.twitter.com/search.json?q=' + escape(request) + '&rpp=' + rpp + '&callback=?';
	
	$.getJSON(this.url, function(data)
	{
		callback(data);
	});

	/*$.ajax(
	{
		url: this.url,
		dataType: "json",
		jsonp: false,
		cache: true,
		jsonpCallback: 'initDots'
	}).success(callback);*/
};