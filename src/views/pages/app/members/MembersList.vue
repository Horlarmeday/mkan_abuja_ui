<!-- =========================================================================================
  File Name: MembersList.vue
  Description: Member List - List View
========================================================================================== -->

<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <export-members :displayExport="displayExport" @hideDisplay="hideDisplayExport" v-if="displayExport"/>

    <vs-table :sst="true" @search="handleSearch" ref="table" multiple v-model="selected" :max-items="itemsPerPage" search :data="members" :total="queriedItems">
      
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item @click="showDisplayExport">
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Export</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New Member</span>
          </div>

          <!-- Filter -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4" v-model="muqam">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Filter By:</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item @click="filterPage('')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>All</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterPage('Abuja')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Abuja</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterPage('Dutse')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Dutse</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterPage('Gwagwalada')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Gwagwalada</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterPage('Suleja')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Suleja</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterPage('Nassarawa')">
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Nassarawa</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <p class="mb-2">Total: <span style="background: #0080002b; padding: 3px; font-darker">{{ queriedItems ? queriedItems : 0 }}</span></p>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ members.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : members.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=10">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=30">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=40">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>


      <template slot="thead">
        <vs-th sort-key="s/n">S/N</vs-th>
        <vs-th sort-key="surname">Surname</vs-th>
        <vs-th sort-key="firstname">First Name</vs-th>
        <vs-th sort-key="muqam">Muqam</vs-th>
        <vs-th sort-key="graduating_state"> Graduating State</vs-th>
        <vs-th sort-key="status">Status</vs-th>
        <vs-th sort-key="createdAt">Date Created</vs-th>
        <vs-th>Action</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ getOverallIndex(indextr) }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.surname.toUpperCase() }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.firstname.toUpperCase() }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.muqam }}</p>
              </vs-td>

              <vs-td>
                <vs-progress :percent="calcAge(tr)" :color="getPopularityColor(calcAge(tr))" class="shadow-md" />
              </vs-td>

              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
              </vs-td>

              <vs-td>
                <p class="product-price">{{ tr.createdAt | moment('ddd, MMMM Do YYYY') }}</p>
              </vs-td>
              <vs-td class="whitespace-no-wrap">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                  <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="viewData(tr.kid)" />
                  <feather-icon icon="FileIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="showDisplayPrompt(tr)" />
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="deleteData(tr.kid)" />
              </vs-td>
            </vs-tr>
          </tbody>
        </template>

    </vs-table>
        <div>
          <vs-pagination class="float-right" :total="pages" v-model="currentPage" :max="6"></vs-pagination>
        </div>
      <member-edit :displayPrompt="displayPrompt" :data="memberToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></member-edit>
  </div>
</template>

<script>
import DataViewSidebar from './AddNewMember.vue'
import MemberEdit from './ChangeMemberStatus.vue'
import {calculateAge} from '../helper/index'
import vSelect from 'vue-select'
import ExportMembers from './ExportMembers'
// import moduleDataList from '@/store/members-list/moduleMember.js'

export default {
  components: {
    DataViewSidebar,
    vSelect,
    MemberEdit,
    ExportMembers
  },
  data () {
    return {
      selected: [],
      // products: [],
      itemsPerPage: 10,
      isMounted: false,
      muqam: '',

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      currentPage: 1,
      displayPrompt: false,
      memberToEdit: {},
      displayExport: false
    }
  },
  computed: {
    // currentPage () {
    //   if (this.isMounted) {
    //     return this.$refs.table.currentx
    //   }
    //   return 0
    // },
    members () {
      return this.$store.state.member.members
    },
    queriedItems () {
      return this.$store.state.member.total
    },
    pages() {
      return this.$store.state.member.pages
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
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (kid) {
      this.$store.dispatch('member/removeMember', kid).then(response => this.handleSuccess(response)).catch(err => { this.handleError(err) })
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    viewData(id) {
      this.$router.push(`/app/member/${id}`)
    },

    showDisplayPrompt (member) {
      this.memberToEdit  = member
      this.displayPrompt = true
    },

    showDisplayExport () {
      this.displayExport = true
    },

    hideDisplayExport () {
      this.displayExport = false
    },

    hidePrompt () {
      this.displayPrompt = false
    },

    calcAge(member) {
      return calculateAge(member.date_of_birth)
    },

    getOverallIndex(index) {
      return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
    },

    handleSearch(search) {
      this.currentPage = 1
      this.$store.dispatch('member/fetchMembers', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, search })
    },

    handlePageChange() {
      this.$store.dispatch('member/fetchMembers', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage })
    },

    filterPage(value) {
      this.$store.dispatch('member/fetchMembers', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, filter: value })
    },
    getOrderStatusColor (status) {
      if (status === 'Active')   return 'primary'
      if (status === 'Relocated') return 'success'
      if (status === 'Death')  return 'danger'
      return 'dark'
    },
    getPopularityColor (num) {
      if (num > 15 && num < 30)  return 'primary'
      if (num > 30 && num < 38) return 'warning'
      if (num > 38)  return 'danger'
      return 'success'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    this.$store.dispatch('member/fetchMembers', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage })
  },
  mounted () {
    this.isMounted = true
  },
  watch: {
    currentPage: function () {
      this.handlePageChange()
    }
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
