import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const __dirname = path.resolve();

process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts', // 진입 경로
  output: [
    {
      file: pkg.main,
      sourcemap: false,
      format: 'cjs',
    },
    {
      file: pkg.module,
      sourcemap: false,
      format: 'esm',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    svgr(),
    image(),
    peerDepsExternal(),
    nodeResolve({
      extensions,
    }),
    commonjs({ include: 'node_modules/**' }),
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    }),
    babel({
      exclude: /node_modules/,
      extensions,
      include: ['src/**/*'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/jest.setup.ts'],
    }),
    terser(),
  ],
};
