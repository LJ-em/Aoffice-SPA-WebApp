import Vue      from 'vue'
import store    from './store'
import router   from './router/config.js'
import Animate  from 'animate.css'
import MuseUI   from 'muse-ui'
import 'animate.css/animate.min.css'
import 'muse-ui/dist/muse-ui.css'
require('./assets/iconfont/material-icons.css')

Vue.config.devtools = true
Vue.config.debug = true

Vue.use(
    MuseUI
)

new Vue({
    el: '#app',
    store,
    router: router.router
}).$mount('#app')

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    document.body.style.fontFamily="PingFang SC Regular";
} else if (/(Android)/i.test(navigator.userAgent)) {
    document.body.style.fontFamily="NoteSansCJKsc-Regular";
} else {
    document.body.style.fontFamily="Microsoft Yahei";
};
