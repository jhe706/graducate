import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'firebaseui/dist/firebaseui.css'

// import all other components that need routes
import CreateProfile from './components/CreateProfile.vue';
import Matches from './components/Matches.vue';

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
  '/createprofile': CreateProfile,
  '/matches': Matches
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