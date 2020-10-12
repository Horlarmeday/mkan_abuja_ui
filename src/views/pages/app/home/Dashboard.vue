<template>
	<div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="UsersIcon"
                  icon-right
                  :statistic="totalKhadim"
                  statisticTitle="Total Khuddam" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="ServerIcon"
                  icon-right
                  :statistic="totalMuqam"
                  statisticTitle="Total Muqam"
                  color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FileTextIcon"
                  icon-right
                  :statistic="totalFiles"
                  statisticTitle="Total Uploaded Files"
                  color="danger" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="AlertOctagonIcon"
                  icon-right
                  :statistic="totalExcos"
                  statisticTitle="Total Excos"
                  color="warning" />
            </div>
        </div>
        <div class="vx-row">
            <!-- CARD 6: Marital Status Analytics -->
            <div class="vx-col w-full lg:w-1/2 mb-base">
                <vx-card title="Marital Status">
                    <!-- Chart -->
                    <div slot="no-body">
                        <vue-apex-charts type="donut" height="325" :options="analyticsData.sessionsByDeviceDonut.chartOptions" :series="marital_series" />
                    </div>

                    <ul>
                        <li v-for="(index, status, key) in marital_statuses" :key="key" class="flex mb-3 justify-between">
                            <span class="flex items-center">
                                    <span class="inline-block h-4 w-4 rounded-full mr-2 border-3" :style="{backgroundColor: analyticsData.sessionsByDeviceDonut.chartOptions.colors[key]}"></span>
                                    <span class="font-semibold">{{ status }}</span>
                            </span>
                            <span>{{ index }}</span>
                        </li>
                    </ul>
                </vx-card>
            </div>

            <!-- CARD 7: Muqam Analytics -->
            <div class="vx-col w-full lg:w-1/2 mb-base">
              <vx-card title="Muqam">
                    <div slot="no-body">
                        <!-- CHART -->
                        <vue-apex-charts type="pie" height="305" :options="analyticsData.customersPie.chartOptions" :series="muqam_series" />
                        <!-- CHART DATA -->
                    </div>
                        <ul>
                            <li v-for="(index, muqam, key) in muqams" :key="key" class="flex mb-3 justify-between">
                                <span class="flex items-center">
                                 
                                    <span class="inline-block h-4 w-4 rounded-full mr-2 border-3" :style="{backgroundColor: analyticsData.customersPie.chartOptions.colors[key]}"></span>
                    
                                    <span class="font-semibold">{{ muqam }}</span>
                                </span>
                                <span>{{ index }}</span>
                            </li>
                        </ul>

                </vx-card>
            </div>
        </div>
        <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Recent Khuddam">
          <div slot="no-body" class="mt-4">
            <vs-table :data="khuddam" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>KHUDDAM NO.</vs-th>
                <vs-th>FULLNAME</vs-th>
                <vs-th>MUQAM</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>PHONE</vs-th>
                <vs-th>DATE REGISTERED</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="index" v-for="(khadim, index) in khuddam">
                  <vs-td :data="khadim.khuddam_no">
                    <span>{{khadim.khuddam_no}}</span>
                  </vs-td>
                  <vs-td :data="khadim.surname">
                    <span>{{khadim.surname}} {{ khadim.firstname }}</span>
                  </vs-td>
                  <vs-td :data="khadim.muqam">
                    <span>{{khadim.muqam}}</span>
                  </vs-td>
                  <vs-td :data="khadim.status">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="`bg-${getOrderStatusColor(khadim.status)}`"></div>{{khadim.status}}</span>
                  </vs-td>
                  <vs-td :data="khadim.phone">
                    <span>+234{{khadim.phone}}</span>
                  </vs-td>
                  <vs-td :data="khadim.createdAt">
                    <span>{{khadim.createdAt | moment('DD/MM/YYYY')}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>
    </div>
</template>
<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './analyticsData.js'
import VueApexCharts from 'vue-apexcharts'
import axios from '../../../../axios'
export default {
  components: {
    StatisticsCardLine,
    VueApexCharts
  },
  data() {
    return {
        analyticsData,
        totalKhadim: '',
        totalMuqam: '',
        totalFiles: '',
        totalExcos: '',
        marital_statuses: '',
        marital_series: [],
        muqam_series: [],
        muqams: '',
        khuddam: [],
        currentPage: 1,
        pageLimit: 10,
        activeColor: 'red'
    }
  },
  created() {
    // Analytics
    axios.get('/users/dashboard-analytics')
    .then(response => {
      this.totalKhadim = response.data.data.cardData.khuddam
      this.totalMuqam = response.data.data.cardData.muqam
      this.totalFiles = response.data.data.cardData.file
      this.totalExcos = response.data.data.cardData.excos

      this.marital_statuses = response.data.data.maritalData
      this.marital_series = response.data.data.maritalDataValues

      this.muqam_series = response.data.data.userDataValues
      this.muqams = response.data.data.userData
    })
    .catch(error => {
      this.handleError(error)
    })

    // Recent Khadims
    axios.get(`/users?currentPage=${this.currentPage}&pageLimit=${this.pageLimit}`)
      .then(response => {
        this.khuddam = response.data.data.docs
      })
      .catch(error => {
        this.handleError(error)
      })
     
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
    getOrderStatusColor (status) {
      if (status === 'Active')   return 'primary'
      if (status === 'Relocated') return 'success'
      if (status === 'Death')  return 'danger'
      return 'dark'
    },
  }
}
</script>