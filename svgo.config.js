// svgo.config.js
module.exports = {
  multipass: true, // boolean. false by default
  datauri: 'enc', // 'base64' (default), 'enc' or 'unenc'.
  js2svg: {
    indent: '  ', // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  // plugins: [
  //   // set of built-in plugins enabled by default
  //   'preset-default',

  //   // enable built-in plugins by name
  //   'prefixIds',

  //   // or by expanded notation which allows to configure plugin
  //   {
  //     name: 'sortAttrs',
  //     params: {
  //       xmlnsOrder: 'alphabetical',
  //     },
  //   },
  // ],

  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          // inlineStyles: {
          //   onlyMatchedOnce: false,
          // },

          // or disable plugins
          // removeDoctype: false,
          convertTransform: false,
        },
      },
    },
  ],
};
