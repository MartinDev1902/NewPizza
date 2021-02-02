const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const del = require('del');
const preprocessor = 'sass';

gulp.task('browserSync', () => {
   browserSync({
      server: {
          baseDir: 'app/'
      },
       notify: true
   });
});

gulp.task('sass', () => {
   return gulp.src(`app/sass/**/*.${ preprocessor }`)
       .pipe(sass())
       .pipe(autoprefixer(['last 15 versions']))
       .pipe(cleanCss())
       .pipe(concat('main.min.css'))
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', () => {
   return gulp.src('app/jsrc/**/*.js')
       .pipe(uglify())
       .pipe(concat('scripts.min.js'))
       .pipe(gulp.dest('app/js'))
       .pipe(browserSync.reload(({ stream: true })))
});

gulp.task('html', () => {
   return gulp.src('app/templates/*.html')
       .pipe(rigger())
       .pipe(gulp.dest('app/'))
       .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', () => {
    gulp.watch(`app/sass/**/*.${ preprocessor }`, gulp.parallel('sass'));
    gulp.watch('app/jsrc/**/*.js', gulp.parallel('js'));
    gulp.watch('app/templates/**/*.html', gulp.parallel('html'));
})

gulp.task('removeDist', () => {
    return del.sync('dist');
});

gulp.task('clearCache', () => {
    return cache.clearAll();
});

gulp.task('image::build', () => {
    return gulp.src('app/img/**/*')
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html::build', () => {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css::build', () => {
    return gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js::build', () => {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', gulp.parallel('html', 'js', 'sass', 'watch', 'browserSync'));

gulp.task('prebuild', gulp.parallel('removeDist', 'html', 'sass', 'js'));

gulp.task('build', gulp.parallel('html::build', 'image::build', 'css::build', 'js::build'));
