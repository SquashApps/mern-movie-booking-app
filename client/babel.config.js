module.exports = {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        loose: true,
        debug: false,
        targets: 'last 2 and_chr versions, last 2 ff versions, last 2 Edge versions, last 2 Safari versions, last 2 ios_saf versions, not dead',
      }],
      '@babel/react',
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      ['react-loadable/babel', {
        server: true,
        webpack: true,
      }],
    ],
    env: {
      test: {
        plugins: [
          ['@babel/transform-object-assign'],
          ['@babel/plugin-transform-runtime'],
        ],
      },
      stage: {
        plugins: [
          [
            'transform-react-remove-prop-types',
            {
              removeImport: true,
              additionalLibraries: ['react-immutable-proptypes'],
            },
          ],
          [
            'react-remove-properties',
            {
              properties:
              [
                'wrapperComponentTest',
                'componentTest',
                'actionTest',
              ],
            },
          ],
          ['@babel/transform-object-assign'],
          ['@babel/plugin-transform-runtime'],
        ],
      },
      production: {
        plugins: [
          [
            'transform-react-remove-prop-types',
            {
              removeImport: true,
              additionalLibraries: ['react-immutable-proptypes'],
            },
          ],
          [
            'react-remove-properties',
            {
              properties:
              [
                'data-test',
                'wrapperComponentTest',
                'componentTest',
                'actionTest',
              ],
            },
          ],
          ['@babel/transform-object-assign'],
          ['@babel/plugin-transform-runtime'],
        ],
      },
    },
};
  