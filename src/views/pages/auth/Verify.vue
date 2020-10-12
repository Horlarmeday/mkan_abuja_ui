<!-- =========================================================================================
    File Name: Verify.vue
    Description: Verify Page
========================================================================================== -->
<template>
  <div class="h-screen flex w-full bg-img items-center justify-center" id="page-login">
    <div class="vx-col md:w-1/2 lg:w-2/4 xl:w-2/5 sm:m-0 m-4">
      <img
        src="@/assets/images/logo/small-logo.png"
        width="150"
        alt="register"
        style="margin-left: 30%"
      />
      <vx-card>
        <div class="p-8 login-tabs-container">
          <div class="vx-card__title mb-4">
              <h4 class="mb-4">Verification</h4>
              <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">
                <span>You can verify if your account has already been created with either your: phone number, khuddam ID, and surname.</span>
              </vs-alert>
          </div>
          <div>
              <vs-input
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  name="verify"
                  icon-no-border
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Verify"
                  v-model="verify"
                  class="w-full"/>
              <span class="text-danger text-sm">{{ errors.first('verify') }}</span>
              <vs-button class="mt-6" type="filled" style="width: 100%"
                @click="verifyAccount" :disabled="!isFormValid">Verify</vs-button
              >
              <vs-divider></vs-divider>
                <vs-row>
                <vs-col
                  vs-offset="2"
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="8"
                >
                  <small class="pt-4 pb-4"
                    >Don't have an account?
                    <router-link to="/auth/register">
                      Create Account</router-link
                    ></small
                  >
                </vs-col>
              </vs-row>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from '../../../axios'
export default{
  data() {
    return {
      verify: "",
    }
  },
  computed: {
    isFormValid () {
      return !this.errors.any() && this.verify
    },
  },
  methods: {
    handleError(error) {
      this.$vs.notify({
        title:'Error',
        text: error.response.data,
        color:'danger',
        position:'top-center',
        iconPack: 'feather',
        icon:'icon-alert-circle'
      });
    },
    verifyAccount() {
      this.$vs.loading()

      axios
        .post('/users/verify-account', { field: this.verify })
        .then(response => {
          this.$vs.loading.close()
          this.$vs.notify({
            title:'Success',
            text: response.data.message,
            color:'primary',
            position:'top-center',
            iconPack: 'feather',
            icon:'icon-alert-circle'
          });
        })
        .catch(error => {
          this.$vs.loading.close()
          this.handleError(error)
        })
    }
  }
}
</script>

<style lang="scss">

[dir] .layout--full-page .bg-img {
    background-image: url(../../../assets/images/pages/bg.png) !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media (min-width: 1200px){
  .xl\:w-2\/5 {
      width: 30% !important;
  }
}
</style>
