// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
import 'bootstrap'
import Vuex from 'vuex'
import store from './store/store'
import VueResource from 'vue-resource'
import firebase from 'firebase'
import VueFire from 'vuefire'
import 'firebase/firestore'

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueResource)

Vue.config.productionTip = false

// Initialize Firebase

const config = {
  apiKey: 'INSERT_YOUR_API_KEY',
  authDomain: 'YOUR_FIREBASE_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: '',
  messagingSenderId: 'YOUR_ID'
}
Vue.use(VueFire)
firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export const db = firestore
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
