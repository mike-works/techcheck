import typescript from 'rollup-plugin-typescript';

export default {
  entry: './main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'amd'
  },
  plugins: [typescript()]
};
