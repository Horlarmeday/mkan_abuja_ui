<template>
  <vx-card no-shadow>

    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Surname"
                name="surname"
                v-model="currentUser.surname"
                class="w-full"
            />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="First Name"
                name="surname"
                v-model="currentUser.firstname"
                class="w-full"
            />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                class="w-full"
                name="othername"
                label="Other Name"
                v-model="currentUser.othername" 
            />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Khuddam ID"
                name="khuddam_id"
                v-model="currentUser.khuddam_no"
                class="w-full"
            />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Date of Birth</small>
            <datepicker
                label="Date of Birth"
                class="w-full" 
                v-model="currentUser.date_of_birth">
            </datepicker>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Muqam</small>
            <v-select 
                v-model="currentUser.muqam"
                :closeOnSelect="true" 
                :options="muqamOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Number of Children"
                name="numb_of_children"
                v-model="currentUser.numb_of_children"
                class="w-full"
            />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Marital Status</small>
            <v-select 
                v-model="currentUser.marital_status"
                :closeOnSelect="true" 
                :options="maritalOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Highest Qualification</small>
            <v-select 
                v-model="currentUser.qualification"
                :closeOnSelect="true" 
                :options="qualificationsOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Employment Status</small>
            <v-select 
                v-model="currentUser.employment_status"
                :closeOnSelect="true" 
                :options="employmentStatusOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Occupation"
                name="occupation"
                v-model="currentUser.occupation"
                class="w-full"
            />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Address"
                name="address"
                placeholder="Address"
                v-model="currentUser.address"
                class="w-full"
            />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
                label="Phone"
                name="Phone"
                placeholder="Phone"
                v-model="currentUser.phone"
                class="w-full"
            />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="ml-2">Genotype</small>
            <v-select 
                v-model="currentUser.genotype"
                :closeOnSelect="true" 
                :options="genotypeOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
    </div>
    <div class="vx-row mb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
        <small class="ml-2">Blood Group</small>
            <v-select 
                v-model="currentUser.blood_group"
                :closeOnSelect="true" 
                :options="bloodGroupOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />               
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
        <small class="ml-2">Employment Type</small>
            <v-select 
                v-model="currentUser.employment_type"
                :closeOnSelect="true" 
                :options="employmentTypeOptions" 
                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
        </div>
    </div>
    <vs-input class="w-full my-base" type="hidden"></vs-input>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="updateData">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import vSelect from 'vue-select'
import data from '../../auth/registrationOptions'
import axios from '../../../../axios'
export default {
  data () {
    return {
      currentUser: '',
      muqamOptions: data.muqamOptions,
      maritalOptions: data.maritalOptions,
      qualificationsOptions: data.qualificationsOptions,
      employmentStatusOptions: data.employmentStatusOptions,
      employmentTypeOptions: data.employmentTypeOptions,
      bloodGroupOptions: data.bloodGroupOptions,
      genotypeOptions: data.genotypeOptions
    }
  },
  created () {
    axios.get('/users/sub')
    .then(response => {
        this.currentUser = response.data.data
    })
    .catch(error => {
        this.handleError(error)
    })
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
    updateData() {
        const obj = {
            kid: this.currentUser.kid,
            surname: this.currentUser.surname ,
            firstname: this.currentUser.firstname,
            othername: this.currentUser.othername, 
            khuddam_no: this.currentUser.khuddam_no,
            muqam: this.currentUser.muqam.value, 
            date_of_birth: this.currentUser.date_of_birth, 
            employment_status: this.currentUser.employment_status.value, 
            employment_type: this.currentUser.employment_type.value, 
            occupation: this.currentUser.occupation, 
            numb_of_children: this.currentUser.numb_of_children, 
            address: this.currentUser.address, 
            phone: this.currentUser.phone, 
            blood_group: this.currentUser.blood_group.value, 
            genotype: this.currentUser.genotype.value, 
            qualification: this.currentUser.qualification.value, 
            marital_status: this.currentUser.marital_status.value, 
        }
        this.$vs.loading()
        axios.put('/users', obj)
        .then(response => {
            this.handleSuccess(response)
        })
        .catch(err => { this.handleError(err) })
    }
  },

  components: {
    Datepicker,
    vSelect
  }
}
</script>
