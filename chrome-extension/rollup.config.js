import resolve from '@rollup/plugin-node-resolve';

export default {
  input: {
    content: 'src/content.mjs',
    background: 'src/background.mjs'
  },
  output: {
    dir: 'dist',
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
