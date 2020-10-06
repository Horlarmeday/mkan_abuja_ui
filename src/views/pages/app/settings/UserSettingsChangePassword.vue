<template>
  <vx-card no-shadow>

    <vs-input data-vv-validate-on="blur" v-validate="'required|min:6'" type="password" class="w-full mb-base" name="old_password" label-placeholder="Old Password" v-model="old_password" />
    <span class="text-danger text-sm">{{errors.first('old_password')}}</span>
    <vs-input data-vv-validate-on="blur" ref="password" v-validate="'required|min:6'" type="password" class="w-full mb-base" name="new_password" label-placeholder="New Password" v-model="new_password" />
    <span class="text-danger text-sm">{{errors.first('new_password')}}</span>
    <vs-input data-vv-validate-on="blur" v-validate="'required|min:6|confirmed:password'" type="password" class="w-full mb-base" name="confirm_new_password" label-placeholder="Confirm Password" v-model="confirm_new_password" />
    <span class="text-danger text-sm">{{errors.first('confirm_new_password')}}</span>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="changePassword" :disabled="!isFormValid">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../../axios'
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  methods: {
      handleError(error) {
      this.$vs.loading.close()
      this.$vs.notify({
        title:'Error',
        text: error.response.data,
        color:'danger',
        position:'top-center',
        iconPack: 'feather',
        icon:'icon-alert-circle'
      });
    },

    handleSuccess(response) {
      this.$vs.loading.close()
      this.$vs.notify({
        title:'Success',
        text: response.data.message,
        color:'primary',
        position:'top-center',
        iconPack: 'feather',
        icon:'icon-alert-circle'
      });
    },
    confirmPassword() {
      if (this.new_password !== this.confirm_new_password) {
        this.$vs.notify({
          title:'Error',
          text: 'Password confirmation does not match',
          color:'danger',
          position:'top-center',
          iconPack: 'feather',
          icon:'icon-alert-circle'
        });
        return false
      }
      return true
    },
    changePassword() {
      if (!this.confirmPassword()) return
      this.$vs.loading()
        const data = {
          oldPassword: this.old_password,
          newPassword: this.new_password,
          confirmPassword: this.confirm_new_password
        }
        axios.post('/users/change-password', data)
          .then(response => {
            this.reset()
            this.handleSuccess(response)
          })
          .catch(error => {
            this.handleError(error)
          })
      
    },
    reset() {
      this.old_password = ''
      this.new_password = ''
      this.confirm_new_password = ''
    }
  },
  computed: {
    isFormValid () {
      return !this.errors.any() && this.old_password && this.new_password && this.confirm_new_password
    }
  }
}
</script>
