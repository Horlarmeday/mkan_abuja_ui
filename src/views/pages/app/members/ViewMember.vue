<!-- =========================================================================================
  File Name: MemberView.vue
  Description: Member View page
========================================================================================== -->

<template>
  <div id="page-user-view">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
    <div id="user-data" v-if="member">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img src="../../../../assets/images/portrait/small/profile_image.png" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Surname</td>
                <td>{{ member.surname ? member.surname : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">First Name</td>
                <td>{{ member.firstname ? member.firstname : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Other Name</td>
                <td>{{ member.othername ? member.othername : 'nil' }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>{{ member.status ? member.status : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold mr-6">Khuddam ID</td>
                <td>{{ member.khuddam_no ? member.khuddam_no : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Muqam</td>
                <td>{{ member.muqam ? member.muqam : 'nil' }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click="editData(member)">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash">Delete</vs-button>
          </div>

        </div>

      </vx-card>

      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Birth Date</td>
                <td>{{ member.date_of_birth | moment('DD/MM/YYYY') }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>+234{{ member.phone ? member.phone : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Employment Status</td>
                <td>{{ member.employment_status ? member.employment_status : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Employment Type</td>
                <td>{{ member.employment_type ? member.employment_type : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>
                <td>Male</td>
              </tr>
              <tr>
                <td class="font-semibold">Address</td>
                <td>{{ member.address ? member.address : 'nil' }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Other Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Marital Status</td>
                <td>{{ member.marital_status ? member.marital_status : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Qualification</td>
                <td>{{ member.qualification ? member.qualification : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Blood Group</td>
                <td>{{ member.blood_group ? member.blood_group : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Genotype</td>
                <td>{{ member.genotype ? member.genotype : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Occupation</td>
                <td>{{ member.occupation ? member.occupation : 'nil' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">No of Children</td>
                <td>{{ member.numb_of_children ? member.numb_of_children : 'nil' }}</td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataViewSidebar from './AddNewMember.vue'
export default {
  components: {
    DataViewSidebar
  },
  data () {
    return {
      user_not_found: false,
      addNewDataSidebar: false,
      sidebarData: {},
      isMounted: false
    }
  },
  computed: {
    member() {
        return this.$store.state.member.member
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
    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.showDeleteSuccess()
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    const userId = this.$route.params.userId
    this.$store.dispatch('member/fetchParamMember', userId)
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        this.handleError(err) 
      })
  },
  mounted () {
    this.isMounted = true
  },
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
