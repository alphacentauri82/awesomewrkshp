import firebaseService from '../../service/firebase.service'

const state = {
  isLoggedIn: !!localStorage.getItem('lbUser'),
  userLogged: '',
  content: []
}

const mutations = {
  doLogin: (state) => {
    state.pending = true
  },
  loginSuccess: (state, payload) => {
    state.isLoggedIn = true
    state.pending = false
    state.userLogged = payload.user
  },
  logOut: (state) => {
    state.isLoggedIn = false
    state.userLogged = ''
  },
  cargoItems: (state, payload) => {
    state.content = payload.data
  }
}
const actions = {
  getData: ({commit}, payload) => {
    console.log('caraelementos')
    let content = firebaseService.getContent()
    console.log('--')
    console.log(content)
    console.log('--')
    commit(
      'cargoItems', {
        data: content
      })
  },
  doLogin: ({commit}, payload) => {
    firebaseService.logIn().then((resp) => {
      localStorage.setItem('lbUser', JSON.stringify(resp.user))
      console.log(resp.user.displayName)
      commit(
        'loginSuccess', {
          user: resp.user.displayName
        })
    }, (err) => {
      console.log(err)
    })
  },
  doLogOut: ({commit}, payload) => {
    firebaseService.logOut()
    localStorage.removeItem('lbUser')
    commit('logOut')
  }
}

const getters = {
  getIsauth: (state) => {
    return state.isLoggedIn
  },
  getUser: (state) => {
    return state.userLogged
  },
  getUsername: (state) => {
    return state.username
  },
  getContent: (state) => {
    return state.content
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
