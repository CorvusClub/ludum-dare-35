const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserify = require('browserify');
const babelify = require('babelify');

const postcss = require('gulp-postcss');

const browserSync = require('browser-sync').create();

function js() {
    return browserify({
        entries: './index.js',
        debug: true
    })
    .transform(babelify, {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'));
}

function css() {
    return gulp.src("./index.css")
        .pipe(postcss([
            require("autoprefixer"),
            require("postcss-import")
        ]))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
}

function static() {
    return gulp.src("./static/**/*")
        .pipe(gulp.dest("./build/"));
}

function dev() {
    gulp.watch('./**/*.js', {ignored: ['node_modules/*', 'build/*']}, gulp.series(js, reload));
    gulp.watch('./static/**/*', gulp.series(static, reload));
    gulp.watch('./**/*.css', {ignored: ['node_modules/*', 'build/*']}, gulp.series(css));
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        port: process.env.PORT,
        ghostMode: false
    });
}


function reload() {
    return browserSync.reload();
}

gulp.task(js);
gulp.task(dev);