<template>
  <div>
        <vs-prompt
            :title="`Change ${data.surname} ${data.firstname} Status`"
            accept-text= "Change Status"
            button-cancel = "border"
            @cancel="initValues"
            @accept="updateStatus"
            @close="activePrompt = false"
            :is-valid="validateForm"
            :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">

                    <div class="vx-col ml-auto flex">
                        <feather-icon icon="InfoIcon" class="cursor-pointer" svgClasses="text-success stroke-current w-5 h-5 mr-4"></feather-icon>

                        <feather-icon icon="StarIcon" class="cursor-pointer" svgClasses="text-warning stroke-current w-5 h-5 mr-4"></feather-icon>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <label for="">Status</label>
                        <v-select 
                            v-model="status"
                            :closeOnSelect="true" 
                            :options="['Active', 'Relocated', 'Inactive', 'Death']" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                    </div>
                </div>
            </form>
        </div>
    </vs-prompt>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    components: {
        vSelect
    },
    data() {
        return {
            status: '',
            kid: ''
        }
    },
    watch: {
        displayPrompt() {
            if (Object.entries(this.data).length === 0) {
                this.initValues()
                this.$validator.reset()
            } else {
                const { status, kid } = this.data;
                this.status = status;
                this.kid = kid
                this.initValues()
            }
        }
    },
    computed: {
        validateForm () {
            return !this.errors.any() && this.status
        },
        activePrompt:{
            get () {
                return this.displayPrompt
            },
            set (value) {
                this.$emit('hideDisplayPrompt', value)
            }
        },
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
      updateStatus () {
        const obj = {
            kid: this.kid,
            status: this.status
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('member/updateMember', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        if (this.data.kid) return
        this.status = ''
        this.kid = ''
      }
    },
    
}
</script>

<style>

</style>