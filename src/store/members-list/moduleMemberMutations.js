/*=========================================================================================
  File Name: moduleMemberMutations.js
  Description: Member Module Mutations
==========================================================================================*/


export default {
    ADD_MEMBER (state, member) {
      state.members.unshift(member)
    },
    SET_MEMBERS (state, members) {
      state.members = members
    },

    SET_MEMBERS_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_MEMBER (state, member) {
      state.member = member
    },
    // SET_LABELS(state, labels) {
    //   state.eventLabels = labels
    // },
    UPDATE_MEMBER (state, member) {
      const memberIndex = state.members.findIndex((p) => p.kid === member.kid)
      Object.assign(state.members[memberIndex], member)
    },
    REMOVE_MEMBER (state, memberId) {
      const ItemIndex = state.members.findIndex((p) => p.kid === memberId)
      state.members.splice(ItemIndex, 1)
    }
  }
  