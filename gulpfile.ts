/**
 * Created by developer on 24.08.2016.
 */
const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const path = require('path');

const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const SERVER_DIR = `${SRC_DIR}/server`;
const CLIENT_DIR = `${SRC_DIR}/client`;

let tlr;

/**
 * Start an express server by default.
 */
gulp.task('default', ['serve.dev']);

/**
 * Remove dist directory.
 */
gulp.task('clean', (cb) => {
  return del([DIST_DIR], cb);
});

/**
 * Compile Typescript sources for server in dist directory.
 */
gulp.task('build.server', () => {
  let tsProject = tsc.createProject(`${SERVER_DIR}/tsconfig.json`);
  return gulp.src(`${SERVER_DIR}/**/*.ts`)
    .pipe(tsc(tsProject))
    .js
    .pipe(gulp.dest(`${DIST_DIR}/server`));
});

/**
 * Compile TypeScript sources for client and create sourcemaps in dist directory.
 */
gulp.task('build.client', () => {
  let tsProject = tsc.createProject(`${CLIENT_DIR}/tsconfig.json`);
  var tsResult = gulp.src(`${CLIENT_DIR}/**/*.ts`)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${DIST_DIR}/client`));
});

/**
 * Copy all resources that are not TypeScript files into dist directory.
 */
gulp.task('copy.assets', () => {
  return gulp.src([
    'src/**/*',
    '!**/*.ts',
    '!**/{typings,typings/**,typings.json,tsconfig.json}',
  ])
    .pipe(gulp.dest(DIST_DIR))
});

/**
 * Copy all required libraries into dist directory.
 */
gulp.task('copy.libs', () => {
  return gulp.src([
    'es6-shim/es6-shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'reflect-metadata/Reflect.js',
    'rxjs/**',
    'zone.js/dist/**',
    '@angular/**'
  ], {cwd: 'node_modules/**'}) /* Glob required here. */
    .pipe(gulp.dest(`${DIST_DIR}/client/lib`));
});

/**
 * Compile SASS to css into dist directory.
 */
gulp.task('compile.sass', () => {
  return gulp.src(`${CLIENT_DIR}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${DIST_DIR}/client`));
});

/**
 * Create an express server to serve built client files from dist directory.
 */
gulp.task('server.dev', () => {
  let express = require('express');
  let app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use('/', express.static(path.resolve(__dirname, `${DIST_DIR}/client`)));
  app.listen(4000, '0.0.0.0');
});

/**
 * Register live-reload for express server.
 */
gulp.task('live-reload', () => {
  tlr = require('tiny-lr')();
  tlr.listen(35729);
});

let notifyLiveReload = (event) => {
  let fileName = path.relative(__dirname, event.path);

  tlr.changed({
    body: {
      files: [fileName]
    }
  });
};

/**
 * Watch for changes of files we need to compile and notify live-reload.
 */
gulp.task('watch', () => {
  gulp
    .watch(`${CLIENT_DIR}/**/*.ts`, ['build.client'])
    .on('change', notifyLiveReload);

  gulp
    .watch(`${CLIENT_DIR}/**/*.scss`, ['compile.sass'])
    .on('change', notifyLiveReload);
});

/**
 * Compile all development files and copy libs and assets into dist directory.
 */
gulp.task('build.dev', (done) => {
  runSequence(
    'clean',
    'build.server',
    'build.client',
    'compile.sass',
    'copy.assets',
    'copy.libs',
    done);
});

/**
 * Serve built dev files from an express server with live-reload.
 */
gulp.task('serve.dev', (done) => {
  runSequence(
    'server.dev',
    'live-reload',
    'watch',
    done);
});
