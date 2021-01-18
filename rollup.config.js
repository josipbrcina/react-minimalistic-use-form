import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url';

export default [
  {
    input: 'src/lib/index.ts',
    output: [
      {
        file: 'dist/index.es.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      external(),
      url(),
      json(),
      typescript({
        clean: true,
      }),
      babel({
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
        ],
        extensions: [
          ...DEFAULT_EXTENSIONS,
          '.ts',
          '.tsx',
        ],
        exclude: 'node_modules/**',
      }),
    ],
    external: ['react', 'react-dom'],
  },
];
