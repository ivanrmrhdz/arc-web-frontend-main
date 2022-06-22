import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#2196F3',
          secondary: '#757575',
          accent: '#BBDEFB',
          error: '#E53935',
          green: '#43A047',
          black: '#212121',
        },
        dark: {
          primary: '#2196F3',
          secondary: '#757575',
          accent: '#BBDEFB',
          error: '#E53935',
          green: '#43A047',
          black: '#212121',
        },
      },
    },
  });
