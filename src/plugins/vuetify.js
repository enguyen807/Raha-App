import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.purple.darken1, // #FB8C00
        secondary: colors.purple.lighten4, // #FFE0B2
        accent: colors.green.accent3, // #9C27B0
        background: colors.grey.lighten3,
      },
      dark: {
        primary: colors.purple.darken1, // #FB8C00
        secondary: colors.purple.lighten4, // #FFE0B2
        accent: colors.green.accent3, // #9C27B0
      },
    },
  },
});
