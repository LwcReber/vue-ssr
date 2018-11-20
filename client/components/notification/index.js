import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  // 注册到vue中
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
