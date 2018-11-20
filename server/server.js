const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const KoaBody = require('koa-body')
const koaSession = require('koa-session')

const apiRouter = require('./routers/api')
const staticRouter = require('./routers/static')
const createDb = require('./db/db')
const userRouter = require('./routers/user')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development' // 服务端渲染需要区分开发环境或者生产环境，不同环境差别大

app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

// 中间件 可以排查错误
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

// favicon.ico 处理
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})
// 处理请求的body数据
app.use(KoaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  // pageRouter = require('./routers/dev-ssr')
  // 如果使用no-bundle的方式，client的页面router 引入不能使用异步加载，需要先import，然后直接指定对应的页面
  pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  // pageRouter = require('./routers/ssr')
  pageRouter = require('./routers/ssr-no-bundle')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listen on ${HOST}:${PORT} `)
})
