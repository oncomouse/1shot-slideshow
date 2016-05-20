var Api = require('remark/api');
var styler = require('components/styler');
var polyfills = require('./polyfills');
var yaml = require('js-yaml');

var slide_source = require('../slides.md');
var attach_progress_bar = require('./add-ons/progress-bar/index');
var twitter_name = require('./add-ons/twitter-name/index');
var yaml_config = {};

// Pull in YAML config:
if(slide_source.match(/^---/).length > 0) {
	var parts = slide_source.replace(/^---/,'').split(/---/);
	yaml_config = yaml.safeLoad(parts.shift());
	slide_source = parts.join('---');
}

if('title' in yaml_config) {
	document.title = yaml_config.title;
}

require('slides.scss');

// Expose API as `remark`
window.remark = new Api();

// Apply polyfills as needed
polyfills.apply();

// Apply embedded styles to document
styler.styleDocument();

document.getElementById('source').innerHTML = slide_source;

var slideshow = remark.create();
attach_progress_bar(slideshow);
twitter_name('oncomouse', '#conference');