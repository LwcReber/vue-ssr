import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

// 销毁instance组件
const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)
  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
    parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return // 服务端环境不操作dom
  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    }, // 子组件接受父组件的参数
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}` // 组件保持唯一
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0 // 默认右下角
  // 不断往上堆
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除节点
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
