const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appId, config.db.appKey)

// 服务端渲染做一些获取数据的操作
export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
