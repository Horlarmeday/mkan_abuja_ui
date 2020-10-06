<!-- =========================================================================================
  File Name: AddNewMember.vue
  Description: Add New Member - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} MEMBER</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
          <div class="vx-row mb-3">
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
          <div class="vx-row mb-3">
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
                    <span class="text-danger text-sm">{{errors.first('khuddam_no')}}</span>
              </div>
          </div>
          <div class="vx-row mb-3">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                  <small class="ml-2">Date of Birth</small>
                  <datepicker
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    label="Date of Birth"
                    class="w-full" 
                    name="date_of_birth"
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
                    name="muqam"
                    :closeOnSelect="true" 
                    :options="muqamOptions" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                  <span class="text-danger text-sm">{{errors.first('muqam')}}</span>
              </div>
          </div>
          <div class="vx-row mb-3">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                  <vs-input
                      label="Number of Children"
                      name="numb_of_children"
                      v-model="numb_of_children"
                      class="w-full"
                  />
                  <span class="text-danger text-sm">{{errors.first('numb_of_children')}}</span>
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-2">
                  <small class="ml-2">Marital Status</small>
                  <v-select 
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="marital_status"
                    v-model="marital_status"
                    :closeOnSelect="true" 
                    :options="maritalOptions" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                  <span class="text-danger text-sm">{{errors.first('marital_status')}}</span>
              </div>
          </div>
          <div class="vx-row mb-3">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                  <small class="ml-2">Highest Qualification</small>
                  <v-select 
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    v-model="qualification"
                    name="qualification"
                    :closeOnSelect="true" 
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
                    name="employment_status"
                    v-model="employment_status"
                    :closeOnSelect="true" 
                    :options="employmentStatusOptions" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                  <span class="text-danger text-sm">{{errors.first('employment_status')}}</span>
              </div>
          </div>
          <div class="vx-row mb-3">
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
          <div class="vx-row mb-3">
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
          <div class="vx-row mb-3">
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
                    :closeOnSelect="true" 
                    name="employment_type"
                    :options="employmentTypeOptions" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                  <span class="text-danger text-sm">{{errors.first('employment_type')}}</span>
              </div>
          </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Datepicker from 'vuejs-datepicker'
import data from '../../auth/registrationOptions'
import vSelect from 'vue-select'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker,
    vSelect
  },
  data () {
    return {
      kid: null,
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
      genotypeOptions: data.genotypeOptions,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { 
          firstname,
          kid,
          surname, 
          muqam, 
          status, 
          othername, 
          date_of_birth, 
          phone, 
          employment_status, 
          employment_type, 
          marital_status,
          blood_group,
          genotype,
          qualification,
          address,
          occupation,
          numb_of_children,
          khuddam_no
        } = this.data
        this.kid = kid
        this.firstname = firstname
        this.surname = surname
        this.muqam = muqam
        this.status = status
        this.othername = othername
        this.date_of_birth = date_of_birth
        this.phone = phone
        this.employment_status = employment_status
        this.employment_type = employment_type
        this.marital_status = marital_status
        this.blood_group = blood_group
        this.genotype = genotype
        this.qualification = qualification
        this.address = address
        this.occupation = occupation
        this.numb_of_children = numb_of_children
        this.khuddam_no = khuddam_no
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
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
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
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
      if (this.data.kid) return
      this.kid = null
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
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            kid: this.kid,
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
          if (this.kid !== null && this.kid > 0) {
            this.$store.dispatch('member/updateMember', obj)
            .then(response => {
              this.$emit('closeSidebar')
              this.handleSuccess(response)
              this.initValues()
            })
            .catch(err => { this.handleError(err) })
          } else {
            delete obj.kid
            this.$store.dispatch('member/addMember', obj)
            .then(response => {
              this.$emit('closeSidebar')
              this.handleSuccess(response) 
              this.initValues()
            })
            .catch(err => { 
              this.handleError(err) 
            })
          }         
        } else {
          this.$vs.notify({
            title:'Error',
            text: 'Validate all fields',
            color:'danger',
            position:'top-center',
            iconPack: 'feather',
            icon:'icon-alert-circle'
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
