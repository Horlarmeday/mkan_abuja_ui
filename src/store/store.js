/*=========================================================================================
  File Name: store.js
  Description: Vuex store
==========================================================================================*/
import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import moduleMember from './members-list/moduleMember.js'
import moduleFiles from './files-list/moduleFiles.js'

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
      auth: moduleAuth,
      member: moduleMember,
      file: moduleFiles
    },
    strict: process.env.NODE_ENV !== 'production'
})
