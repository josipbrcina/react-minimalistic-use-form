import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
  ],
};
