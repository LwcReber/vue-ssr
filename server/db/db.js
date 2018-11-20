const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api' // 注意字段名 别写错大小写
})

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeadders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeadders()
      }))
    },
    async addTodo (todo) {
      return handleRequest(await request.post(
        `/${className}`,
        todo,
        {headers: getHeadders()}
      ))
    },
    async updateTodo (id, todo) {
      return handleRequest(await request.put(
        `/${className}/${id}`,
        todo,
        {headers: getHeadders()}
      ))
    },
    async deleteTodo (id) {
      return handleRequest(await request.delete(
        `/${className}/${id}`,
        {headers: getHeadders()}
      ))
    },
    async deleteComleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch', // 批量处理多个请求
        {requests},
        {headers: getHeadders()}
      ))
    }
  }
}
