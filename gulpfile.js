const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const bs = require('browser-sync').create();
const postCss = require('gulp-postcss');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsify = require('tsify');
const terser = require('gulp-terser');
const fancyLog = require('fancy-log');

const srcPaths = {
  scripts: ['./src/ts/*.ts'],
  styles: ['./src/scss/*.scss'],
  pages: ['./src/*.html'],
};

const distPaths = {
  scripts: ['./dist/js/'],
  styles: ['./dist/css/'],
  pages: ['./dist/'],
};

function copyHtml() {
  return src(srcPaths.pages).pipe(dest(distPaths.pages)).pipe(bs.stream());
}

function buildStyles() {
  return src(srcPaths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postCss([require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(distPaths.styles))
    .pipe(bs.stream());
}

function bundle() {
  const watchBrowserify = watchify(
    browserify({
      basedir: '.',
      debug: true,
      entries: ['./src/ts/main.ts'],
      cache: {},
      packageCache: {},
    })
  );
  watchBrowserify.on('update', bundle);
  watchBrowserify.on('log', fancyLog);

  return watchBrowserify
    .plugin(tsify)
    .bundle()
    .on('error', fancyLog)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(distPaths.scripts))
    .pipe(bs.stream());
}

function browserSync() {
  copyHtml();
  buildStyles();
  bundle();

  bs.init({
    server: {
      baseDir: distPaths.pages,
    },
  });

  watch(srcPaths.pages).on('change', copyHtml);
  watch(srcPaths.styles, buildStyles);
}

exports.default = browserSync;
