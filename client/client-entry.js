import createApp from './create-app'
import bus from './util/bus'

const {app, router, store} = createApp()

// 共用服务端的数据
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
bus.$on('auth', () => {
  console.log(1321312)
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
