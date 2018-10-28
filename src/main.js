import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'firebaseui/dist/firebaseui.css'

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  el: '#app',
  components: {
    App
  },
  render: h => h(App)
  /*
  ALTERNATIVE SHORT/LONGHAND VERSIONS:
  render: function createElement(){
    return createElement(App);
  }
  render(h){
    return h(App);
  }
  render: h => h(App);
  */
})
// TODO: set up routing here if you choose to use it