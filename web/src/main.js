import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';

Vue.config.productionTip = false

// 注册element-ui
Vue.use(ElementUI)

Vue.use(LemonIMUI)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
