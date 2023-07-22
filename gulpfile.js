import gulp from 'gulp';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import { deleteAsync } from 'del';

import pug from 'gulp-pug';
import debug from 'gulp-debug';
import prettyHtml from 'gulp-pretty-html';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import glob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import yargs from 'yargs';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

import terser from 'gulp-terser';

import svgSprite from 'gulp-svg-sprite';

import bs from 'browser-sync';

const sass = gulpSass(dartSass);
const argv = yargs(process.argv.slice(2)).argv;

// clean output folder
function clean() {
  return deleteAsync('build/');
}

// html to pug
function html2pug() {
  return gulp.src('src/views/*.pug')
    .pipe(plumber(
      notify.onError({
        title: 'PUG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(pug({
      pretty: true
    }))
    .pipe(debug({title: 'Pug to html', showCount: false}))
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br', 'script'],
      content_unformatted: [],
    }))
    .pipe(gulp.dest('build/'));
}

// fonts
function fonts() {
  return gulp.src('src/fonts/*.woff2')
  .pipe(gulp.dest('build/assets/fonts/'));
}

// scss to css
function styles() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(plumber(
      notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(glob())
    .pipe(gulpif(!argv.production, sourcemaps.init()))
    .pipe(sass({
      includePaths: [
        'node_modules'
      ]
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      }),
      sortMediaQueries()
    ]))
    .pipe(cleanCSS({
        debug: true,
        compatibility: '*'
      }, details => {
        console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
      })
    )
    .pipe(rename({suffix:'.min'}))
    .pipe(gulpif(!argv.production, sourcemaps.write()))
    .pipe(gulp.dest('build/assets/css/'))
    .pipe(bs.stream());
}

// images
function images() {
  return gulp.src('src/images/**/*')
    .pipe(plumber(
      notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(newer('build/assets/images/'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 5,
      verbose: true
    }))
    .pipe(gulp.dest('build/assets/images/'));
}

// js
function script() {
  return gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('build/assets/js/'));
}

// sprite
function createSvgSprite() {
  return gulp.src('src/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
          example: true
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: "(fill|stroke)",
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest('build/assets/images/'));
}

// server
function runServer(done) {
  bs.init({
    server: {
      baseDir: "build",
      index: "index.html"
    },
    port: 8080,
    ui: { port: 8081 },
    open: true,
    notify: false,
    logPrefix: 'frontend_dev'
  });
  console.log('Сервер работает по адресу http://localhost:8080');
  done();
}

function reload(done) {
  bs.reload();
  done();
}

// watch files
function watchFiles() {
  gulp.watch(['src/views/**/*.pug', 'src/blocks/**/*.pug'], gulp.series(html2pug, reload));
  gulp.watch(['src/styles/**/*.scss', 'src/blocks/**/*.scss'], gulp.series(styles));
  gulp.watch('src/images/**/*', gulp.series(images, reload));
  gulp.watch('src/js/*.js', gulp.series(script, reload));
  gulp.watch('src/fonts/*.woff2', gulp.series(fonts, reload));
}

// build
const build = gulp.series(
  clean,
  gulp.parallel(
    html2pug,
    styles,
    images,
    createSvgSprite,
    script,
    fonts
  )
);

const dev = gulp.series(
  build,
  runServer,
  watchFiles
);

export { clean };
export { createSvgSprite };
export { build };

export default dev;