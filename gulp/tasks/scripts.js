module.exports = function() {
	$.gulp.task('libsJS:dev', () => {
		return $.gulp.src([
			'dev/libs/jquery.js',
			'node_modules/svg4everybody/dist/svg4everybody.min.js',
			'node_modules/mobile-detect/mobile-detect.min.js',
			'node_modules/jquery-validation/dist/jquery.validate.min.js',
			'node_modules/tooltipster/dist/js/tooltipster.bundle.min.js',
			'node_modules/tooltipster-follower/dist/js/tooltipster-follower.min.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
			'node_modules/select2/dist/js/select2.min.js',
			'node_modules/jquery-inputmask/index.js',
			'node_modules/swiper/dist/js/swiper.js',
			'dev/libs/jquery-ui.min.js',
			'dev/libs/matchMedia.js',
			//'dev/libs/Animate_css.js',  // чтобы работало animate.css
			//'dev/libs/waypoints.min.js', // чтобы работал animate.css
			'dev/libs/anim-modal.js',
			'dev/libs/slidebars.min.js',
			'dev/libs/owl.carousel.min.js',
			'dev/libs/jquery.sticky.js',
			//'dev/libs/jquery.mCustomScrollbar.concat.min.js',
			'dev/libs/greenSock.js',
			'dev/libs/fontawesome-all.min.js',
			'dev/libs/DrawSVGPlugin.js'
		])
			.pipe($.gp.concat('libs.min.js'))
			.pipe($.gulp.dest('./build/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('libsJS:build', () => {
		return $.gulp.src([
			'dev/libs/jquery.js',
			'node_modules/svg4everybody/dist/svg4everybody.min.js',
			'node_modules/mobile-detect/mobile-detect.min.js',
			'node_modules/jquery-validation/dist/jquery.validate.min.js',
			'node_modules/tooltipster/dist/js/tooltipster.bundle.min.js',
			'node_modules/tooltipster-follower/dist/js/tooltipster-follower.min.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
			'node_modules/select2/dist/js/select2.min.js',
			'node_modules/jquery-inputmask/index.js',
			'node_modules/swiper/dist/js/swiper.js',
			'dev/libs/jquery-ui.min.js',
			'dev/libs/matchMedia.js',
			//'dev/libs/Animate_css.js',  // чтобы работало animate.css
			//'dev/libs/waypoints.min.js', // чтобы работал animate.css
			'dev/libs/anim-modal.js',
			'dev/libs/slidebars.min.js',
			'dev/libs/owl.carousel.min.js',
			'dev/libs/jquery.sticky.js',
			//'dev/libs/jquery.mCustomScrollbar.concat.min.js',
			'dev/libs/greenSock.js',
			'dev/libs/fontawesome-all.min.js',
			'dev/libs/DrawSVGPlugin.js'
		])
			.pipe($.gp.concat('libs.min.js'))
			.pipe($.gp.uglify())
			.pipe($.gulp.dest('./build/js/'));
	});

	$.gulp.task('js:copy', () => {
		return $.gulp.src([
			'./dev/js/animate.js',
			'./dev/js/modal.js',
			'./dev/js/_functions.js',
			'./dev/js/validation.js',
			'./dev/js/main.js',
			'!./dev/js/libs.min.js'])
			.pipe($.babel({
				presets: ['es2015', 'stage-3']
			}))
			.pipe($.gp.concat('main.js'))
			.pipe($.gp.uglify())
			.pipe($.gulp.dest('./build/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});
};
