module.exports = function() {
    $.gulp.task('img:dev', () => {
        return $.gulp.src('./dev/img/**/*.{png,jpg,gif}')
            .pipe($.gulp.dest('./build/img/'));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src('./dev/img/**/*.{png,jpg,gif}')
            .pipe($.gp.tinypng(YOUR_API_KEY))
            .pipe($.gulp.dest('./build/img/'));
    });


    $.gulp.task('svg:copy', () => {
        return $.gulp.src('./dev/img/*.svg')
            .pipe($.gulp.dest('./build/img/'));
    });
};
