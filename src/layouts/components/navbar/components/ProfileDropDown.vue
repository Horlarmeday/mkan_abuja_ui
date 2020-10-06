<template>
  <div class="the-navbar__user-meta flex items-center" v-if="currentUser">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ currentUser.firstname }} {{ currentUser.surname }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img key="onlineImg" src="../../../../assets/images/portrait/small/profile_image.png" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="gotoProfile">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import {parseJwt} from '../../../../views/pages/app/helper/index'
export default {
  data() {
    return {
      currentUser: ''
    }
  },
  created() {
    this.currentUser = parseJwt(localStorage.getItem('tkn'))
  },
  computed: {
    activeUserInfo() {
      return this.$store.getters['auth/getUser']
    }
  },
  methods: {
    logout() {
        this.$store.dispatch('auth/logout').then(() => this.$router.push('/auth/login'))
    },

    gotoProfile() {
      this.$router.push('/app/settings')
    }
  }
}
</script>
