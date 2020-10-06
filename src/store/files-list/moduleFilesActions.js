/*=========================================================================================
  File Name: moduleFileActions.js
  Description: File Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  uploadFile ({ commit }, file) {
    return new Promise((resolve, reject) => {
      axios.post('/files', file)
        .then((response) => {
          commit('ADD_FILE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchFiles ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/files', {params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search }})
        .then((response) => { 
          commit('SET_FILES', response.data.data.docs)
          commit('SET_FILES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateFile ({ commit }, file) {
    return new Promise((resolve, reject) => {
      axios.put(`/files`, file)
        .then((response) => {
          commit('UPDATE_FILE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeFile ({ commit }, fileId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/files/one`, {data: { fileId }})
        .then((response) => {
          commit('REMOVE_ITEM', fileId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeFiles ({ commit }, selectedFiles) {
    return new Promise((resolve, reject) => {
      axios.delete(`/files`, {data: { selectedFiles }})
        .then((response) => {
          commit('REMOVE_ITEMS', selectedFiles)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
