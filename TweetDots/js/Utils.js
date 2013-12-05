/*
	TODO:
	réécrire les fonctions de parsing.

	Reg exp :

	http:// + ... => lien
	@... => lien
	#... => hashtag

	+ lors du hover : créer un cercle invisible autour de la souris
	qui fais grossir les cercles à proximité

	inspiration http://tholman.com/exp/dots/proof/

*/

String.prototype.parseURL = function()
{
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(url) {
		return '<a href="' + url + '" class="twitterUrl">' + url + '</a>';
		//return url.link(url);
	});
};
 
String.prototype.parseUsername = function()
{
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@",""),
			url = "http://twitter.com/"+username;
		//return u.link("http://twitter.com/"+username);
		return '<a href="' + url + '" class="twitterUsername">@' + username + '</a>';
	});
};
 
String.prototype.parseHashtag = function()
{
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23"),
			url = "http://search.twitter.com/search?q="+tag;
		//return t.link("http://search.twitter.com/search?q="+tag);
		return '<a href="' + url + '" class="twitterTag">' + t + '</a>';
	});
};