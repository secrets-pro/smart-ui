const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const less = require("gulp-less");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

// 编译less
gulp.task("css", function() {
  gulp
    .src("../src/styles/index.less")
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename("sm-ui.css"))
    .pipe(gulp.dest("../dist/styles"));
});

// 拷贝字体文件
gulp.task("fonts", function() {
  gulp
    .src("../src/styles/iconfont/fonts/*.*")
    .pipe(gulp.dest("../dist/styles/fonts"));
});

gulp.task("default", ["css", "fonts"]);
