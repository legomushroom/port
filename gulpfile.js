var gulp          = require('gulp');
var minifycss     = require('gulp-minify-css');
var stylus        = require('gulp-stylus');
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var livereload    = require('gulp-livereload');
var coffee        = require('gulp-coffee');
var changed       = require('gulp-changed');
var jade          = require('gulp-jade');
var watch         = require('gulp-jade');
var coffeelint    = require('gulp-coffeelint');
var plumber       = require('gulp-plumber');
var karma         = require('gulp-karma');
var concat        = require('gulp-concat');
var csslint       = require('gulp-csslint');
var browserify    = require('gulp-browserify');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var sequence      = require('run-sequence');
var rimraf         = require('gulp-rimraf');

var devFolder   = '';
var distFolder  = '';

var testFiles = [ 'spec/**/*.js' ];

var paths = {
  src: {
    js:       devFolder + 'js/**/*.coffee',
    css:      devFolder + 'css/**/*.styl',
    kit:      devFolder + 'css/kit.jade',
    index:    devFolder + 'index.jade',
    partials: devFolder + 'css/partials/**/*.jade',
    templates:devFolder + 'templates/**/*.jade',
    tests:    distFolder + 'spec/**/*.coffee'
  },
  dist:{
    js:       distFolder + 'js/',
    tests:    distFolder + 'spec/',
    css:      distFolder + 'css/',
    kit:      distFolder + 'css/',
    index:    distFolder
  }
}
              
gulp.task('build', function(){
  return gulp.src(['dist/**/*.js', 'vendor/**/*.js'])
          .pipe(concat('main.min.js'))
          .pipe(gulp.dest(distFolder))
});

gulp.task('stylus', function(){
  return gulp.src(devFolder + 'css/main.styl')
          .pipe(plumber())
          .pipe(stylus())
          .pipe(autoprefixer('last 4 version'))
          .pipe(gulp.dest(paths.dist.css))
          .pipe(livereload())
});

gulp.task('coffee-all', function(e){
  return gulp.src(['js/**/*.coffee'])
    .pipe(plumber())
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
});

gulp.task('js-reload', function(e){
  return gulp.src(['dist/app.js'])
    .pipe(plumber())
    .pipe(livereload())
});

// gulp.task('browserify', function(e){
//   return gulp.src('dist/main.js', { read: false })
//     .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
//     .pipe(browserify({}))
//     .pipe(gulp.dest('dist/main.dist.js'))
//     .pipe(livereload())
// });

gulp.task('coffee-all + build', function() {
  sequence('coffee-all', 'build');
});

gulp.task('coffee-lint', function(e){
  return gulp.src(paths.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.src.js), { extension: '.js'} )
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'))
});

gulp.task('index:jade', function(e){
  return gulp.src(paths.src.index)
          .pipe(plumber())
          .pipe(jade({pretty:true}))
          .pipe(gulp.dest(paths.dist.index))
          .pipe(livereload())
});

gulp.task('default', function(){
  var server = livereload();
  gulp.watch(paths.src.css,   ['stylus']);
  // gulp.watch(paths.src.js,    ['coffee-lint']);
  gulp.watch('dist/app.js',  ['js-reload']);
  gulp.watch(paths.src.index, ['index:jade']);
  // gulp.watch('dist/main.js',  ['browserify']);
});








