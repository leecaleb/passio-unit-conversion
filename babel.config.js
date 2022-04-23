module.exports = {
    presets: [
      '@babel/env',
      ['@babel/preset-react', {runtime: 'automatic'}],
      '@babel/preset-typescript',
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
  };