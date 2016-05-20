var $ = require('webpack-zepto');
require('add-ons/twitter-name.scss');
//require('font-awesome-webpack');
require("font-awesome-webpack!./font-awesome.config");

function twitter_name(name, hashtag,start) {
	name = 'oncomouse' || name;
	start = 1 || start;
	var twitter_name =  '<span class="twitter_badge"><i class="fa fa-twitter" aria-hidden="true"></i>@' + name + '</span>';
	$('.remark-slide-content').slice(start).each(function(i, slide) {
		$(slide).append('<div class="twitter_name">' + twitter_name +  '</div>');
		if(typeof hashtag !== 'undefined') { 
			$(slide).append('<div class="hashtag">' + hashtag + '</div>');
		}
	});
}

module.exports = twitter_name;