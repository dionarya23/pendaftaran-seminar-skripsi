// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import VueResource from "vue-resource";
import firebase from 'firebase';

Vue.use(VueSweetalert2);
Vue.use(VueResource);

var firebaseConfig = process.env.NODE_ENV;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.http.options.root = process.env.BASEURL;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
