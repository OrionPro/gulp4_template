module.exports = function () {
    $.gulp.task('styles:build', () => {
        return $.gulp.src('./dev/stylus/main.styl')
            .pipe($.gp.stylus({
                'include css': true
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./build/css/'))
    });

    $.gulp.task('styles:dev', () => {
        return $.gulp.src('./dev/stylus/main.styl')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.stylus({
                'include css': true
            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Stylus',
                    message: error.message
                };
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
			.pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest('./build/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
