const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.header['Content-type'] = 'text/html'
  const context = { url: ctx.path, user: ctx.session.user } // 用在服务端渲染传到vue-renderer
  try {
    const appString = await renderer.renderToString(context)

    // 路由重定向
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState()
    })
    ctx.body = html
  } catch (err) {
    console.log('render err', err)
    throw err
  }
}
