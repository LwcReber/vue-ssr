const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)

// const MemoryFs = require('memory-fs') // 不把文件写入磁盘，直接写入内存中，读取文件和输出文件较快
// const NativeModule = require('module')
// const vm = require('vm')

// const mfs = new MemoryFs()
// serverCompiler.outputFileSystem = mfs // webpack输出目录

let bundle

// 监听文件修改
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  // 打印错误信息
  stats = stats.toJson()
  stats.errors.forEach((err) => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  // 合拼路径
  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js' // 读取的是js字符串
  )

  // 这个是直接读去server-entry.js 使用该方式client路由则可以写成异步加载的方式
  // 先删除原来的
  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry.js').default // require 会缓存

  // 使用mfs的时候，webpack打包的文件会写到内存里面，所以会导致读取不到bundlePath,这个时候需要把client的路由
  // 该为同步加载的方式，这个也是使用的mfs不好之处
  // try {
  //   const m = { exports: {} }
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')

  //   const wrapper = NativeModule.wrap(bundleStr) // 使用模块封装 类似require一个文件
  //   // 类似function (module, exports, require)

  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   // 绑定上下文
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (error) {
  //   console.error('compile js err:', error)
  // }

  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '等会，别急'
    return
  }

  // 开发环境向webpack-dev-server 获取对应的json文件
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createRenderer({
      inject: false,
      clientManifest
    })
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
