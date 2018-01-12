module.exports = function() {
	$.gulp.task('libsJS:dev', () => {
		return $.gulp.src([
			'node_modules/svg4everybody/dist/svg4everybody.min.js',
			'dev/libs/jquery-ui.min.js',
			'dev/libs/matchMedia.js',
			'dev/libs/Animate_css.js',
			'dev/libs/anim-modal.js',
			'dev/libs/jquery.sticky.js',
			'dev/libs/jquery.mCustomScrollbar.concat.min.js'
		])
			.pipe($.gp.concat('libs.min.js'))
			.pipe($.gulp.dest('./build/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('libsJS:build', () => {
		return $.gulp.src([
			'node_modules/svg4everybody/dist/svg4everybody.min.js',
			'dev/libs/jquery-ui.min.js',
			'dev/libs/matchMedia.js',
			'dev/libs/Animate_css.js',
			'dev/libs/anim-modal.js',
			'dev/libs/jquery.sticky.js',
			'dev/libs/jquery.mCustomScrollbar.concat.min.js'
		])
			.pipe($.gp.concat('libs.min.js'))
			.pipe($.gp.uglifyjs())
			.pipe($.gulp.dest('./build/js/'));
	});

	$.gulp.task('js:copy', () => {
		return $.gulp.src(['./dev/js/*.js',
						   '!./dev/js/libs.min.js'])
			.pipe($.babel({
				presets: ['es2015', 'stage-3']
			}))
			.pipe($.gp.uglify())
			.pipe($.gulp.dest('./build/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});
};
