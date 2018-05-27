import Vue from 'vue'
import { App } from '@/components'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
