import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/content.mjs',
  output: {
    file: 'dist/content.js',
    format: 'iife',
    name: 'myExtension'
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    })
  ]
};
