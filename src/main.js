import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBolt, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueResource from "vue-resource";
Vue.config.productionTip = false;

library.add(faBolt);
library.add(faTrash);
library.add(faTimes);

Vue.use(VueResource);
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
