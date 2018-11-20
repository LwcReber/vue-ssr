const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFs = require('memory-fs') // 不把文件写入磁盘，直接写入内存中，读取文件和输出文件较快
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs // webpack输出目录

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
    'vue-ssr-server-bundle.json'
  )
  // 使用mfs把文件打包到内存中
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
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
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
