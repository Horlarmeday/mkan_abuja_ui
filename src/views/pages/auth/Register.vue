<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
========================================================================================== -->
<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-register"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
    <img
        src="@/assets/images/logo/small-logo.png"
        width="100"
        alt="register"
        style="margin-left: 30%"
      />
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>
                <div class="">
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                v-validate="'required|min:3'"
                                data-vv-validate-on="blur"
                                label="Surname"
                                name="surname"
                                v-model="surname"
                                class="w-full"
                            />
                            <span class="text-danger text-sm">{{errors.first('surname')}}</span>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                v-validate="'required|min:3'"
                                data-vv-validate-on="blur"
                                label="First Name"
                                name="firstname"
                                v-model="firstname"
                                class="w-full"
                            />
                             <span class="text-danger text-sm">{{errors.first('firstname')}}</span>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                class="w-full"
                                name="othername"
                                label="Other Name"
                                v-model="othername" 
                            />
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                label="Khuddam ID"
                                name="khuddam_no"
                                v-model="khuddam_no"
                                class="w-full"
                            />
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                           <small class="ml-2">Date of Birth</small>
                            <datepicker
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                             name="date_of_birth"
                             label="Date of Birth"
                             class="w-full" 
                             v-model="date_of_birth">
                            </datepicker>
                            <span class="text-danger text-sm">{{errors.first('date_of_birth')}}</span>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                           <small class="ml-2">Muqam</small>
                            <v-select 
                            v-validate="'required'"
                             data-vv-validate-on="blur"
                             v-model="muqam"
                             :closeOnSelect="true"
                             name="muqam" 
                             :options="muqamOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            <span class="text-danger text-sm">{{errors.first('muqam')}}</span>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                label="Number of Children"
                                name="numb_of_children"
                                v-model="numb_of_children"
                                class="w-full"
                            />
                            
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <small class="ml-2">Marital Status</small>
                            <v-select 
                            v-validate="'required'"
                             data-vv-validate-on="blur"
                             v-model="marital_status"
                             :closeOnSelect="true" 
                             name="marital_status"
                             :options="maritalOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            <span class="text-danger text-sm">{{errors.first('marital_status')}}</span>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <small class="ml-2">Highest Qualification</small>
                            <v-select 
                            v-validate="'required'"
                             data-vv-validate-on="blur"
                             v-model="qualification"
                             :closeOnSelect="true" 
                             name="qualification"
                             :options="qualificationsOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            <span class="text-danger text-sm">{{errors.first('qualification')}}</span>
                            
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <small class="ml-2">Employment Status</small>
                            <v-select 
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                              v-model="employment_status"
                              name="employment_status"
                              :closeOnSelect="true" 
                              :options="employmentStatusOptions" 
                              :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            <span class="text-danger text-sm">{{errors.first('employment_status')}}</span>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                v-validate="'required'"
                                data-vv-validate-on="blur"
                                label="Occupation"
                                name="occupation"
                                v-model="occupation"
                                class="w-full"
                            />
                            <span class="text-danger text-sm">{{errors.first('occupation')}}</span>
                            
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                v-validate="'required'"
                                data-vv-validate-on="blur"
                                label="Address"
                                name="address"
                                placeholder="Address"
                                v-model="address"
                                class="w-full"
                            />
                            <span class="text-danger text-sm">{{errors.first('address')}}</span>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <vs-input
                                v-validate="'required|min:11|max:11'"
                                data-vv-validate-on="blur"
                                label="Phone"
                                name="phone"
                                placeholder="Phone"
                                v-model="phone"
                                class="w-full"
                            />
                            <span class="text-danger text-sm">{{errors.first('phone')}}</span>
                            
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <small class="ml-2">Genotype</small>
                            <v-select 
                             v-model="genotype"
                             :closeOnSelect="true" 
                             :options="genotypeOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                        <small class="ml-2">Blood Group</small>
                            <v-select 
                             v-model="blood_group"
                             :closeOnSelect="true" 
                             :options="bloodGroupOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                        <small class="ml-2">Employment Type</small>
                            <v-select 
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                             v-model="employment_type"
                             name="employment_type"
                             :closeOnSelect="true" 
                             :options="employmentTypeOptions" 
                             :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                             />
                            <span class="text-danger text-sm">{{errors.first('employment_type')}}</span>
                        </div>
                    </div>
                  <vs-button class="mt-6" type="filled"
                    @click="submitData" :disabled="!isFormValid">Register</vs-button
                  >
                </div>
                <vs-divider></vs-divider>
                <vs-row>
                  <vs-col
                    vs-offset="2"
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="8"
                  >
                    <small class="pt-8 pb-8"
                      >Already have an account,
                      <router-link to="/auth/login">
                        Sign in</router-link
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
import Datepicker from 'vuejs-datepicker'
import vSelect from 'vue-select'
import data from './registrationOptions'
export default {
  data() {
    return {
      surname: '',
      firstname: '',
      othername: '',
      khuddam_no: '',
      muqam: '',
      date_of_birth: '',
      employment_status: '',
      employment_type: '',
      occupation: '',
      numb_of_children: '',
      address: '',
      phone: '',
      blood_group: '',
      genotype: '',
      qualification: '',
      marital_status: '',
      muqamOptions: data.muqamOptions,
      maritalOptions: data.maritalOptions,
      qualificationsOptions: data.qualificationsOptions,
      employmentStatusOptions: data.employmentStatusOptions,
      employmentTypeOptions: data.employmentTypeOptions,
      bloodGroupOptions: data.bloodGroupOptions,
      genotypeOptions: data.genotypeOptions
    }
  },
  components: {
      Datepicker,
      vSelect
  },
  computed: {
    isFormValid() {
      return !this.errors.any()
        && this.surname 
        && this.firstname 
        && this.date_of_birth 
        && this.employment_status 
        && this.occupation 
        && this.address
        && this.phone
        && this.muqam
        && this.employment_type
        && this.qualification
      
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
    initValues () {
      this.surname = ''
      this.firstname = ''
      this.othername = ''
      this.khuddam_no = ''
      this.muqam = ''
      this.date_of_birth = ''
      this.employment_status = ''
      this.employment_type = ''
      this.occupation = ''
      this.numb_of_children = ''
      this.address = ''
      this.phone = ''
      this.blood_group = ''
      this.genotype = ''
      this.qualification = ''
      this.marital_status = ''
    },
    submitData() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            surname: this.surname ,
            firstname: this.firstname,
            othername: this.othername, 
            khuddam_no: this.khuddam_no,
            muqam: this.muqam.value, 
            date_of_birth: this.date_of_birth, 
            employment_status: this.employment_status.value, 
            employment_type: this.employment_type.value, 
            occupation: this.occupation, 
            numb_of_children: this.numb_of_children, 
            address: this.address, 
            phone: this.phone, 
            blood_group: this.blood_group.value, 
            genotype: this.genotype.value, 
            qualification: this.qualification.value, 
            marital_status: this.marital_status.value, 
          }
          this.$vs.loading()

            this.$store.dispatch('member/addMember', obj)
            .then(response => {
              this.handleSuccess(response) 
              this.initValues()
            })
            .catch(err => { 
              this.handleError(err) 
            })
                   
        } else {
          this.$vs.notify({
            title:'Error',
            text: 'Complete all required fields',
            color:'danger',
            position:'top-center',
            iconPack: 'feather',
            icon:'icon-alert-circle'
          });
        }
      })
      
    },

    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}

[dir] .layout--full-page .bg-img {
    background-image: url(../../../assets/images/pages/bg.png) !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

[dir] .layout--full-page .full-page-bg-color{
    background-color: #ffffff;
}

#page-register {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #ffffff;
      color: #000000;
      border-radius: 0.5rem;
      box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.2);
      flex: 1;
    }
    .bg-github {
      background-color: #333;
      color: #ffffff;
      border-radius: 0.5rem;
      box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.2);
      flex: 1;
    }
  }
}
</style>
