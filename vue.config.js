/* eslint-disable prettier/prettier */
module.exports = {
  lintOnSave: false,

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Raha App";
      return args;
    });
  },

  transpileDependencies: ["vuetify"],
};
