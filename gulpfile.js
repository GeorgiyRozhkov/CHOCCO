const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem'); 
const gcmq = require('gulp-group-css-media-queries'); 
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () =>{
  return src('docs/**/*', { read: false }).pipe(rm())
});

task("copy:html", ()=>{
  return src("./*.html")
  .pipe(dest("docs"))
  .pipe(reload({stream: true}));
})
task("copy:sass", ()=>{
  return src("src/styles/*.scss")
  .pipe(dest("docs"))
  .pipe(reload({stream: true}));
})

const styles = [
  'node_modules/normalize.css/normalize.css',
  "src/SCSS/main.scss"
];

task('styles', () =>{
  return src(styles)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss', { newLine: ";"}))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem()) перевел в ремы вручную
  .pipe(gulpif(env === 'prod', autoprefixer('last 2 versions')))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest('docs'));
});


task('img', () => {
  return src('src/img/png/*')
    .pipe(dest('docs/img/png'));
})


task('scripts', () => {
  return src('src/JS/**/*.js')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(concat('main.min.js'))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write('')))
    .pipe(dest('docs'));
 });

task('server', () => {
  browserSync.init({
    server: {
        baseDir: "./docs"
    },
    open: false
 });
});

task('icons', () => {
  return src('src/img/svg/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprites.svg'
        }
      }
    }))
    .pipe(dest('docs'));
 });

 task("watch", () => {
  watch("./src/scss/**/*.scss", series("styles"));
  watch("./src/js/**/*.js", series("scripts"));
  watch("./*.html", series("copy:html"));
  watch("./src/img/svg/*.svg", series("icons"));
 })

task(
  "default",
   series(
     "clean",
      parallel('copy:html', 'styles', 'scripts', 'icons', 'img'),
      parallel("watch", "server")
  )
);

task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons', 'img'))
); 