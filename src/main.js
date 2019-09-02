import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { auth } from "@/firebase";

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // var name = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoUrl = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        store.dispatch('setUser', user)
        console.log(user.displayName)
    }
    // No user is signed in.
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')

});

Vue.config.productionTip = false