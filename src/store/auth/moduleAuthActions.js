
/* eslint-disable no-unused-vars */
import axios from 'axios'

export default {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({
            url: `/users/login`,
            data: user,
            method: 'POST'
          })
            .then(response => {
              const token = response.data.token
              const user = response.data.data
              localStorage.setItem('tkn', token)
  
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
              commit('auth_success', token, user)
              resolve(response)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('tkn')
              reject(err)
            })
        })
    },

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({
            url: '/users/register',
            data: user,
            method: 'POST'
          })
            .then(response => {
              const token = response.data.token
              const user = response.data.data
              localStorage.setItem('tkn', token)
              axios.defaults.headers.common['authorization'] = `Bearer ${token}`
              commit('auth_success', token, user)
              resolve(response)
            })
            .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              reject(err)
            })
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('tkn')
          delete axios.defaults.headers.common['authorization']
          resolve()
        })
    }
}