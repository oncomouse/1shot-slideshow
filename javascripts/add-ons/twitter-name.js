var $ = require('webpack-zepto');
require('add-ons/twitter-name.scss');
//require('font-awesome-webpack');
//require("font-awesome-webpack!./font-awesome.config");

function twitter_name(name, hashtag,start) {
	name = 'oncomouse' || name;
	start = 1 || start;
	
	$('head').append($('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">'));
	
	var twitter_name =  '<span class="twitter_badge"><i class="fa fa-twitter" aria-hidden="true"></i>@' + name + '</span>';
	$('.remark-slide-content').slice(start).each(function(i, slide) {
		$(slide).append('<div class="twitter_name">' + twitter_name +  '</div>');
		if(typeof hashtag !== 'undefined') { 
			$(slide).append('<div class="hashtag">' + hashtag + '</div>');
		}
	});
}

module.exports = twitter_name;