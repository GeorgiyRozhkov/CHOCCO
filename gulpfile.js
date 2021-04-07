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

sass.compiler = require('node-sass');

task('clean', () =>{
  return src('dist/**/*', { read: false }).pipe(rm())
});

task("copy:html", ()=>{
  return src("./*.html")
  .pipe(dest("dist"))
  .pipe(reload({stream: true}));
})
task("copy:sass", ()=>{
  return src("src/styles/*.scss")
  .pipe(dest("dist"))
  .pipe(reload({stream: true}));
})

const styles = [
  // "node_modules/normalize.css/normalize.css",
  "src/SCSS/main.scss"
];

task('styles', () =>{
  return src(styles)
  .pipe(concat('main.min.scss', { newLine: ";"}))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem()) перевел в ремы вручную
  .pipe(autoprefixer('last 2 versions'))
  // .pipe(gcmq()) ломает css файл
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(dest('dist'));
});

task('img', () => {
  return src('src/img/png/*png')
    .pipe(dest('dist/img/png'));
})

task('scripts', () => {
  return src('src/JS/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(dest('dist'));
 });

task('server', () => {
  browserSync.init({
    server: {
        baseDir: "./dist"
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
    .pipe(dest('dist'));
 });

watch("./src/scss/**/*.scss", series("styles"));
watch("./src/js/**/*.js", series("scripts"));
watch("./*.html", series("scripts"));
watch("./src/img/svg/*.svg", series("icons"));

task("default", series("clean", parallel("copy:html", "copy:sass", "styles", "scripts", "icons", "img"), "server" ));