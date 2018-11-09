import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'firebaseui/dist/firebaseui.css'

// import all other components that need routes
import SignUp from './components/SignUp.vue';
import Match from './components/Match.vue';

Vue.config.productionTip = false
Vue.use(Vuetify);

// simple routing from scratch
const NotFound = {
  template:`
    <p>Page not found</p>
`
};

export const routes = {
  '/': App,
  '/signup': SignUp,
  '/matches': Match
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  components: {
    App
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) {
    return h(this.ViewComponent);
  }
})