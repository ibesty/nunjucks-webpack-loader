const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath);
};

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  exclude: resolveFile('node_modules/**'),
  plugins: ['@babel/plugin-proposal-object-rest-spread']
};

module.exports = [
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'cjs' // CommonJS编译模式
    },
    external: ['nunjucks', 'loaderUtils', 'path', 'fs', 'crypto'],
    plugins: [resolve(), commonjs(), babel(babelOptions)]
  }
];
