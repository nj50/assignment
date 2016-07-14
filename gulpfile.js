var gulp = require('gulp'),
    less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  concat = require( 'gulp-concat' ),
  webserver = require('gulp-webserver');




gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: false,
      open: true,
      port:8082
    }));
});

gulp.task( 'less', function() {
    return gulp.src( [ './css/**/*.less','!./node_modules/**','!./js/lib/**','!./js/**' ] )
        .pipe( less({
            compress: true
        }))
        .pipe( gulp.dest( './css/' ));
});

gulp.task( 'concatCSS', ['less'], function() {
    return gulp.src( [ './js/lib/**/*.css' ,'!./css/app.min.css','./css/**/*.css'] )
        .pipe( concat( {
            path: 'app.min.css',
            stat: {
                mode: 0666
            }
        }))
        .pipe(cssmin().on('error', function(err) {
          console.log(err);
        }))
        .pipe( gulp.dest( './css' ));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    './js/lib/bootstrap-css-only/fonts/*.*'])
            .pipe(gulp.dest('./fonts'));
});

gulp.task( 'concatJS', function() {
    return gulp.src( [
            'js/lib/**/*.min.js'
        ] )
        .pipe( concat( {
            path: 'lib.min.js',
            stat: {
                mode: 0666
            }
        } ) )
        .pipe( gulp.dest( './js' ) )
} );

gulp.task('default', ['concatCSS','fonts','concatJS']);


gulp.task('serve', ['default','webserver']);


