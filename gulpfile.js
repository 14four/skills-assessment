const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

const postCssPlugins = [autoprefixer()];

function compileSCSS() {
  return gulp
    .src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function watchSCSS() {
  return gulp.watch('./src/scss/index.scss', compileSCSS);
}

function compileJS() {
  return gulp
    .src('./src/js/index.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function watchJS() {
  return gulp.watch('./src/js/index.js', compileJS);
}

function runBrowserSync() {
  return browserSync.init({
    server: {
      host: '0.0.0.0',
      watch: true,
      baseDir: './build',
    },
  });
}

function copyHTML() {
  return gulp.src('./src/**/*.html').pipe(gulp.dest('./build')).pipe(browserSync.stream());
}

function watchHTML() {
  return gulp.watch('./src/**/*.html', copyHTML);
}

function buildSCSS() {
  postCssPlugins.push(cssnano());
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest('./build/css'));
}

function buildJS() {
  postCssPlugins.push(cssnano());
  return gulp
    .src('./src/js/index.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

gulp.task(
  'watch',
  gulp.series(compileSCSS, compileJS, copyHTML, gulp.parallel(watchSCSS, watchJS, watchHTML, runBrowserSync)),
);
gulp.task('build', gulp.parallel(copyHTML, buildSCSS, buildJS));
gulp.task('start', gulp.series(copyHTML, gulp.parallel(buildSCSS, buildJS, runBrowserSync)));
