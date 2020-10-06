/*=========================================================================================
  File Name: moduleFile.js
  Description: File Module
==========================================================================================*/


import state from './moduleFilesState.js'
import mutations from './moduleFilesMutations.js'
import actions from './moduleFilesActions.js'
import getters from './moduleFilesGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

