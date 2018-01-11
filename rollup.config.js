import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescriptPlugin from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import typescript from 'typescript';

const pkg = require('./package.json');

const libraryName = 'techcheck';

/** @type {any[]} */
const plugins = [
  // Compile TypeScript files
  typescriptPlugin({
    typescript
  }),
  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),
  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  resolve({
    jsnext: true,
    main: true,
    browser: false
  }),

  // Resolve source maps to the original source
  sourceMaps()
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'cjs',
      sourcemap: true
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['os', 'child_process'],
  watch: {
    include: 'src/**'
  },
  plugins
};
