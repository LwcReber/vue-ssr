import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  // console.log(err)
  if (err.code === 401) {
    notify({
      content: '请登录'
    })
    // 使用新vue对象，事件总线，触发一个事件
    bus.$emit('auth')
  }
}
// 在actions可以处理数据的错误，请求失败等处理

export default {
  updateCountAxync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  },
  fetchTodos ({ commit }) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({commit}, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo ({commit}, {id, todo}) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updateTodo', {id, todo: data})
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({commit, state}) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)

    model.deleteAllCompleted(ids)
      .then(() => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '清理一下。。。 '
        })
      }).catch(err => {
        handleError(err)
      })
  },
  login ({commit}, { username, password }) {
    commit('startLoading')
    console.log(username)
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('endLoading')
          commit('doLogin', data)
          notify({content: '登录成功'})
          resolve()
        }).catch(err => {
          commit('endLoading')
          notify({
            content: '抱歉，登录失败，请确认用户名或者密码是否正确'
          })
          handleError(err)
          reject(err)
        })
    })
  }
}
