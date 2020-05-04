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

var firebaseConfig = {
  apiKey: "AIzaSyBxH7Z59pM7w94zITm2WDUYPA1JxEPNwrQ",
  authDomain: "form-project23.firebaseapp.com",
  databaseURL: "https://form-project23.firebaseio.com",
  projectId: "form-project23",
  storageBucket: "form-project23.appspot.com",
  messagingSenderId: "525132304126",
  appId: "1:525132304126:web:1e02d6bbc020911c759faf",
  measurementId: "G-KCCLV6VEV6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.http.options.root = "https://pendaftaran-api.herokuapp.com/api/v1/";
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
