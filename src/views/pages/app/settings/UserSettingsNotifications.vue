<template>
  <vx-card no-shadow>

    <div class="mb-base">
      <h6 class="mb-4">Activity</h6>

      <div class="flex items-center mb-4">
        <vs-switch v-model="newMember" />
        <span class="ml-4">Email me when someone add a new member</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="newFile" />
        <span class="ml-4">Email me when someone add a new file</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="newLogin" />
        <span class="ml-4">Email me when someone logins in</span>
      </div>
    </div>

    <div>
      <h6 class="mb-4">Application</h6>

      <div class="flex items-center mb-4">
        <vs-switch v-model="news" />
        <span class="ml-4">News and announcements</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="activity" />
        <span class="ml-4">Application activity</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-base">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>

  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      newMember: true,
      newFile: true,
      newLogin: false,
      news: false,
      activity: false,
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
