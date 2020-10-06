<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- Product Image -->
        <template v-if="dataImg">

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img v-if="mime == 'png' || mime == 'jpg' || mime == 'gif'" :src="dataImg" alt="img" class="responsive">
            <img v-if="mime == 'pdf'" src="../../../../assets/images/pages/pdf.png" alt="img" class="responsive">
            <img v-if="mime == 'csv' || mime == 'xls' || mime == 'xlsx'" src="../../../../assets/images/pages/excel.png" alt="img" class="responsive">
            <img v-if="mime == 'ppt' || mime == 'pptx'" src="../../../../assets/images/pages/ppt.png" alt="img" class="responsive">
            <img v-if="mime == 'doc' || mime =='docx'" src="../../../../assets/images/pages/file.png" alt="img" class="responsive">
            <img v-if="mime == 'zip'" src="../../../../assets/images/pages/zip.png" alt="img" class="responsive">
            <img v-if="mime == ''" src="../../../../assets/images/pages/file.png" alt="img" class="responsive">
          </div>
          <h5 class="items-center justify-center text-center text-dark">{{ fileName }}</h5>
          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg"/>
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update File</vs-button>
            <vs-button type="flat" color="#999" @click="dataImg = null">Remove File</vs-button>
          </div>
        </template>

        <!-- NAME -->
        <vs-input label="Name" v-model="name" class="mt-5 w-full mb-5" name="name" v-validate="'required'" />
        <span class="text-danger text-sm">{{ errors.first('name') }}</span>

        <!-- CATEGORY -->
        <small class="ml-1 mt-5 w-full">Category</small>
        <v-select
            v-model="category"
            name="category"
            label="Category"
            :closeOnSelect="true" 
            :options="['Meeting Report', 'Tajnid', 'Financial Report', 'Tarbiyya', 'Taleem', 'Other']" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm">{{ errors.first('category') }}</span>

        <!-- Upload -->
        <!-- <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" /> -->

        <div class="upload-img mt-5" v-if="!dataImg">
          <input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" />
          <vs-button @click="$refs.uploadImgInput.click()">Upload File</vs-button>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import fileType from './fileTypes'
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
    vSelect
  },
  data () {
    return {
      mime: '',
      fileName: '',
      fid: null,
      file: '',
      category: '',
      name: '',
      dataImg: '',

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
        const { name, fid, file_url, category } = this.data
        this.fid = fid
        this.category = category
        this.dataImg = file_url
        this.name = name
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
      return !this.errors.any() && this.name && this.category
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
      if (this.data.id) return
      this.fid = null
      this.name = ''
      this.category = null
      this.file = null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let formData = new FormData()
          formData.append('files', this.file)
          formData.append('name', this.name)
          formData.append('category', this.category)

          this.$vs.loading()
          if (this.fid !== null && this.fid >= 0) {
            this.$store.dispatch('file/updateFile', formData).then(response => {
              this.handleSuccess(response)
              this.$emit('closeSidebar')
              this.initValues()
            }).catch(err => { this.handleError(err) })
          } else {
            // delete formData.fid
            this.$store.dispatch('file/uploadFile', formData).then(response => {
              this.handleSuccess(response)
              this.$emit('closeSidebar')
              this.initValues()
            }).catch(err => { this.handleError(err) })
          }
        }
      })
    },
    updateCurrImg (input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.dataImg = e.target.result
          this.fileName = input.target.files[0].name
          this.file = input.target.files[0]
        }
        reader.readAsDataURL(input.target.files[0])
        for (const item in fileType) {
            if (fileType[item] == input.target.files[0].type) {
                this.mime = item
            }
        }
      }
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
