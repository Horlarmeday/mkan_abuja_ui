/*=========================================================================================
  File Name: moduleMember.js
  Description: Member Module
==========================================================================================*/


import state from './moduleMemberState.js'
import mutations from './moduleMemberMutations.js'
import actions from './moduleMemberActions.js'
import getters from './moduleMemberGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

