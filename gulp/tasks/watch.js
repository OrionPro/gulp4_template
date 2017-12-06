module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./dev/stylus/**/*.styl', $.gulp.series('styles:dev'));
        $.gulp.watch('./dev/img/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        $.gulp.watch(['./dev/img/**/*.{png,jpg,gif}'], $.gulp.series('img:dev'));
    });
};