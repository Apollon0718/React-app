import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'src/index.js',
    dest: 'build/scripts/quizbundle.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
     postcss({
       extensions: [ '.css' ],
     }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      (process.env.NODE_ENV === 'production' && uglify()),
    ],
  };
