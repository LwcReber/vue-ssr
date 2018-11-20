const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  // 设置session
  if (user.username === 'Reber' && user.password === '123456') {
    ctx.session.user = {
      username: 'Reber'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'Reber'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
