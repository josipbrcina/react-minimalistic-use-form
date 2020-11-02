import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url';

export default [
  {
    input: 'src/lib/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: false,
        globals: { react: 'React' },
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        sourcemap: false,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      external(),
      url(),
      json(),
      typescript(),
      babel({
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
        ],
        exclude: 'node_modules/**',
      }),
      commonjs(),
    ],
    external: ['react', 'react-dom'],
  },
];
