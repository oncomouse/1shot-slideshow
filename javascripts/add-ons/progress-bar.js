var $ = require('webpack-zepto');
require('add-ons/progress-bar.scss');

function attach_progress_bar(slideshow) {
	
	var showSlideListener = function(current_slide){
		if(current_slide === undefined) {
			current_slide = slideshow.getSlides()[slideshow.getCurrentSlideIndex()];
		}
		var progress_bar_width = (current_slide.getSlideIndex()) / (slideshow.getSlideCount()-1) * 100 + '%';
		if (slideshow.getSlideCount() == 1) {
			progress_bar_width = 0;
		}
		$("#remark-progress-content").width(progress_bar_width);
	};
	
	
	$('.remark-slide-number').css('display', 'none');
	$("body").append("<div id='remark-progress'></div>");
	var progress_bar = $("#remark-progress");
	
	progress_bar.append('<div id="remark-progress-content"></div>');
	$(window).on("resize", function() {
		progress_bar.width($('.remark-visible .remark-slide-content').width());
		progress_bar.offset({top: $(document).height() - progress_bar.offset().height, left: $('.remark-visible .remark-slide-content').offset().left});
	});
	
	slideshow.on("afterShowSlide", showSlideListener);
	showSlideListener(undefined);
}

module.exports = attach_progress_bar;