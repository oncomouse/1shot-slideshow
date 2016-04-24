var gulp = require("gulp");
var gutil = require("gulp-util");
var replace = require('gulp-replace');

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

var fs = require("fs");
var path = require("path");

gulp.task("build", ["webpack:build", "drop-in-js", "clean-up"]);

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("clean-up", ["webpack:build"], function() {
	return gulp.src([
		'*images/**/*'
	])
	.pipe(gulp.dest('dist/'));
});

gulp.task("drop-in-js", ["webpack:build"], function() {
	return fs.readFile(path.resolve(__dirname, "bundle.js"), (err, data) => {
		if (err) throw err;
		return gulp.src(["index.html"])
		.pipe(replace('<script src="bundle.js"></script>', '<script>var script = document.createElement("script"); script.innerText = unescape("'+escape(data.toString().replace("</script>","</script\\>").replace("//# sourceMappingURL=bundle.js.map",""))+'"); document.body.appendChild(script);</script>'))
		.pipe(gulp.dest('dist/'))
	});
});