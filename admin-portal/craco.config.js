/* eslint-disable */
const fs = require('fs');
const path = require('path');
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less');
const lessToJs = require('less-vars-to-js');
const TerserPlugin = require('terser-webpack-plugin')

const CLASS_HASH = '_[hash:base64:5]';

function themeVars () {
  const themePath = path.join(__dirname, './src/theme/vars.less');
  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}

module.exports = {
  webpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: 8,
        })
      ],
    },
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: themeVars(),
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        },
        modifyLessRule: function(lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = /node_modules/;

          return lessRule;
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: process.env.NODE_ENV === 'development' ? '[local]'+CLASS_HASH : CLASS_HASH
          }
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: function(lessRule, _context) {
          lessRule.test = /\.(less)$/;
          lessRule.exclude = /node_modules/;

          return lessRule;
        },
        cssLoaderOptions: {
          modules: false
        },
      },
    },
  ],
};
