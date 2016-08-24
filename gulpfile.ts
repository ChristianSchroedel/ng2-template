/**
 * Created by developer on 24.08.2016.
 */
const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const SERVER_DIR = `${SRC_DIR}/server`;
const CLIENT_DIR = `${SRC_DIR}/client`;

const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const runSequence = require('run-sequence');

gulp.task('default', ['build']);

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
  return del([DIST_DIR], cb);
});

gulp.task('build.server', () => {
  let tsProject = tsc.createProject(`${SERVER_DIR}/tsconfig.json`);
  return gulp.src(`${SERVER_DIR}/**/*.ts`)
    .pipe(tsc(tsProject))
    .js
    .pipe(gulp.dest(`${DIST_DIR}/server`));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
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
 * Copy all resources that are not TypeScript files into build directory.
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
 * Copy all required libraries into build directory.
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

gulp.task('build', (done) => {
  console.log('Building the project ...');
  runSequence(
    'clean',
    'build.server',
    'build.client',
    'copy.assets',
    'copy.libs',
    done);
});
