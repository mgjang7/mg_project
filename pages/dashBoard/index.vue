<template>
  <div class="w-full flex justify-center content overflow-scroll">
    <div class="container-box">
      <!-- 대시보드 -->
      <div class="w-full mb-16">
        <p class="main-title font-notosans">Dashboard</p>
      </div>
      <div class="w-full flex justify-between items-center mb-8">
        <div>
        </div>
        <div class="">
          <a-select default-value="monthly" style="width: 120px" @change="searchTypeChange">
            <a-select-option value="toDay">
              금일
            </a-select-option>
            <a-select-option value="monthly">
              월간
            </a-select-option>
            <a-select-option value="yearly">
              연간
            </a-select-option>
          </a-select> 
        </div>
      </div>

      <div class="w-full flex justify-between gap-x-2 font-notosans">
        <!-- 누적 입장객 -->
        <div class="basis-[50%] border border-[eeeeee] p-6">
          <div class="w-full flex justify-start mb-4">
            <p class="text-lg text-gray-500 font-bold">
              누적 입장객
            </p>
          </div>
          <div class="w-full flex justify-between items-center">
            <div class="">
              <p class="text-black text-3xl font-bold">
                {{ priceFormatter(accumulateTotal) }}명
              </p>
            </div>
            <div class="flex flex-col">
              <div class="flex justify-end">
                <p class="text-gray-500 text-lg">
                  전년대비
                </p>
              </div>
              <div v-if="isVisitorTotalIncrease" class="flex justify-end items-center text-green-500 text-lg font-bold">
                <p class="mr-2">
                  {{ visitorTotalIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="flex justify-end items-center text-red-500 text-lg font-bold">
                <p class="mr-2">
                  {{ visitorTotalIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
          </div>

          <div class="w-full my-4 border-t border-[#eeeeee]"></div>

          <div class="w-full mb-6">
            <div class="w-full flex items-center text-xl text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-start items-end">
                  <p>
                    단
                  </p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p>
                    지
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payComplexDayAccumulate + payComplexNightAccumulate + freeComplexAccumulate) }}
                </p>
              </div>
              <div v-if="isComplexIncrease" class="basis-[20%] flex justify-end items-center text-green-500 font-bold">
                <p class="mr-2">
                  {{ complexIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500 font-bold">
                <p class="mr-2">
                  {{ complexIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    [주간]
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payComplexDayAccumulate) }}
                </p>
              </div>
              <div v-if="isComplexDayIncrease" class="basis-[20%] flex justify-end items-center text-green-500">
                <p class="mr-2">
                  {{ complexDayIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500">
                <p class="mr-2">
                  {{ complexDayIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-black mb-8">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    [야간]
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payComplexNightAccumulate) }}
                </p>
              </div>
              <div v-if="isComplexNightIncrease" class="basis-[20%] flex justify-end items-center text-green-500">
                <p class="mr-2">
                  {{ complexNightIDRate.toFixed(1) }}% 
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500">
                <p class="mr-2">
                  {{ complexNightIDRate.toFixed(1).toString().replace('-', '') }}% 
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-xl text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    역사관
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payHistoryhallAccumulate + freeHistoryhallAccumulate) }}
                </p>
              </div>

              <div v-if="isHistoryhallIncrease" class="basis-[20%] flex justify-end items-center text-green-500 font-bold">
                <p class="mr-2">
                  {{ historyhallIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500 font-bold">
                <p class="mr-2">
                  {{  historyhallIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
          </div>
          <div class="border border-[#eeeeee] pt-6">
            <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
          </div>
        </div>
        <!-- 누적 매출 -->
        <div class="basis-[50%] border border-[eeeeee] p-6">
          <div class="w-full flex justify-start mb-4">
            <p class="text-lg text-gray-500 font-bold">
              누적 매출
            </p>
          </div>
          <div class="w-full flex justify-between items-center">
            <div class="">
              <p class="text-black text-3xl font-bold">
                  {{ priceFormatter(accumulateSalesTotal) }}원
              </p>
            </div>
            <div class="flex flex-col">
              <div class="flex justify-end">
                <p class="text-gray-500 text-lg">
                  전년대비
                </p>
              </div>
              <div v-if="isSalesTotalIncrease" class="flex justify-end items-center text-green-500 text-lg font-bold">
                <p class="mr-2">
                  {{ salesTotalIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="flex justify-end items-center text-red-500 text-lg font-bold">
                <p class="mr-2">
                  {{ salesTotalIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
          </div>
          <div class="w-full my-4 border-t border-[#eeeeee]"></div>
          <div class="w-full mb-6">
            <div class="w-full flex items-center text-xl text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-start items-end">
                  <p>
                    단
                  </p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p>
                    지
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(complexSalesTotal) }}
                </p>
              </div>
              <div v-if="isComplexSalesTotalIncrease" class="basis-[20%] flex justify-end items-center text-green-500 font-bold">
                <p class="mr-2">
                  {{ complexSalesTotalIDRate.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500 font-bold">
                <p class="mr-2">
                  {{ complexSalesTotalIDRate.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    [주간]
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payComplexDayAccumulateSales) }} 
                </p>
              </div>
              <div v-if="isComplexDayIncreaseSales" class="basis-[20%] flex justify-end items-center text-green-500">
                <p class="mr-2">
                  {{ complexDayIDRateSales.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500">
                <p class="mr-2">
                  {{ complexDayIDRateSales.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-black mb-8">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    [야간]
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payComplexNightAccumulateSales) }} 
                </p>
              </div>
              <div v-if="isComplexNightIncreaseSales" class="basis-[20%] flex justify-end items-center text-green-500">
                <p class="mr-2">
                  {{ complexNightIDRateSales.toFixed(1) }}%
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500">
                <p class="mr-2">
                  {{ complexNightIDRateSales.toFixed(1).toString().replace('-', '') }}%
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
            <div class="w-full flex items-center text-xl text-black mb-1">
              <div class="basis-[60%] flex justify-start items-center">
                <div class="basis-[15%] flex justify-end items-end">
                  <p>
                    역사관
                  </p>
                </div>
                <div class="basis-[85%]">
                  
                </div>
              </div>
              <div class="basis-[20%] flex justify-end items-center">
                <p>
                  {{ priceFormatter(payHistoryhallAccumulateSales) }}
                </p>
              </div>
              <div v-if="isHistoryhallIncreaseSales" class="basis-[20%] flex justify-end items-center text-green-500 font-bold">
                <p class="mr-2">
                  {{ historyhallIDRateSales.toFixed(1) }}% 
                </p>
                <a-icon type="arrow-up" />
              </div>
              <div v-else class="basis-[20%] flex justify-end items-center text-red-500 font-bold">
                <p class="mr-2">
                  {{ historyhallIDRateSales.toFixed(1).toString().replace('-', '') }}% 
                </p>
                <a-icon type="arrow-down" />
              </div>
            </div>
          </div>
          <div class="border border-[#eeeeee] pt-6">
            <VueApexCharts type="donut" height="350" :options="chartOptions2" :series="series2"></VueApexCharts>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
// import VueApexCharts from 'vue-apexcharts';
import { priceFormatter } from '@/utils/priceFormatter';

@Component({ 
  layout: 'navMenu',
  // components: {
  //   VueApexCharts
  // },
})
export default class DashBoard extends Vue {
  series:any[] = [];
  chartOptions:any = {};

  series2:any[] = [];
  chartOptions2:any = {};

  // 유료 - 단지 - 주간 - 누적 입장객
  payComplexDayAccumulate = 0;
  // 유료 - 단지 - 야간 - 누적 입장객
  payComplexNightAccumulate = 0;
  // 유료 - 역사관 - 누적 입장객
  payHistoryhallAccumulate = 0;

  // 무료 - 단지 - 누적 입장객
  freeComplexAccumulate = 0;
  // 무료 - 역사관 - 누적 입장객
  freeHistoryhallAccumulate = 0;

  // 단지 - 주간 - 입장객 전년대비 증감률
  complexDayIDRate = 0.0;
  // 단지 - 주간 - 입장객 전년대비 증가여부
  isComplexDayIncrease = false;

  // 단지 - 야간 - 입장객 전년대비 증감률
  complexNightIDRate = 0.0;
  // 단지 - 야간 - 입장객 전년대비 증가여부
  isComplexNightIncrease = false;

  // 역사관 - 입장객 전년대비 증감률
  historyhallIDRate = 0.0;
  // 역사관 - 입장객 전년대비 증가여부
  isHistoryhallIncrease = false;

  // ///////////////////////////////////////////////

  // 단지 - 주간 - 누적 매출
  payComplexDayAccumulateSales = 0;
  // 단지 - 야간 - 누적 매출
  payComplexNightAccumulateSales = 0;
  // 역사관 - 누적 매출
  payHistoryhallAccumulateSales = 0;

  // 단지 - 주간 - 매출 전년대비 증감률
  complexDayIDRateSales = 0.0;
  // 단지 - 주간 - 매출 전년대비 증가여부
  isComplexDayIncreaseSales = false;

  // 단지 - 야간 - 매출 전년대비 증감률
  complexNightIDRateSales = 0.0;
  // 단지 - 야간 - 매출 전년대비 증가여부
  isComplexNightIncreaseSales = false;

  // 역사관 - 매출 전년대비 증감률
  historyhallIDRateSales = 0.0;
  // 역사관 - 매출 전년대비 증가여부
  isHistoryhallIncreaseSales = false;

  // 입장객 매출
  visitorSales = 0;
  // 부대 매출
  incidentalSales = 0;
  // 임대 매출
  rentalSales = 0;
  // 상품 매출
  goodsSales = 0;

  // 총 누적 입장객
  accumulateVisitorTotal = 0;
  // 총 누적 입장객 증감률   
  visitorTotalIDRate = 0.0;
  // 총 누적 입장객 증가여부
  isVisitorTotalIncrease = false;
  // 총 누적 매출
  accumulateSalesTotal = 0;
  // 총 누적 매출 증감률
  salesTotalIDRate = 0.0;
  // 총 누적 매출 증가여부
  isSalesTotalIncrease = false;

  // 단지 - 누적 입장객 수
  complexAccumulate = 0;
  // 단지 - 전년대비 증감률
  complexIDRate = 0.0;
  // 단지 - 전년대비 증가여부
  isComplexIncrease = false;

  // 단지 - 누적 매출
  complexSalesTotal = 0;
  // 단지 - 누적 매출 증감률
  complexSalesTotalIDRate = 0.0;
  // 단지 - 누적 매출 증가여부
  isComplexSalesTotalIncrease = false;

  accumulateTotal = 0;

  searchType = 'monthly';

  priceFormatter = priceFormatter

  // @Watch('visitorTotalIDRate')
  // onChangeVisitorTotalIDRate() {
    
  // }

  async getCumulativeStatus() {
    try {
      const respones = await this.$axios.get('http://localhost:5000/api/dashboard/cumulativeStatus', {
        params: {
          searchType: this.searchType,
        }
      });

      if(respones !== undefined && respones !== null) {
        this.payComplexDayAccumulate = respones.data.PayComplexDayAccumulate;
        this.payComplexNightAccumulate = respones.data.PayComplexNightAccumulate;
        this.payHistoryhallAccumulate = respones.data.PayHistoryhallAccumulate;
        this.freeComplexAccumulate = respones.data.FreeComplexAccumulate;
        this.freeHistoryhallAccumulate = respones.data.FreeHistoryhallAccumulate;
        this.complexDayIDRate = respones.data.ComplexDayIDRate;
        this.isComplexDayIncrease = respones.data.IsComplexDayIncrease;
        this.complexNightIDRate = respones.data.ComplexNightIDRate;
        this.isComplexNightIncrease = respones.data.IsComplexNightIncrease;
        this.historyhallIDRate = respones.data.HistoryhallIDRate;
        this.isHistoryhallIncrease = respones.data.IsHistoryhallIncrease;
        this.payComplexDayAccumulateSales = respones.data.PayComplexDayAccumulateSales;
        this.payComplexNightAccumulateSales = respones.data.PayComplexNightAccumulateSales;
        this.payHistoryhallAccumulateSales = respones.data.PayHistoryhallAccumulateSales;
        this.complexDayIDRateSales = respones.data.ComplexDayIDRateSales;
        this.isComplexDayIncreaseSales = respones.data.IsComplexDayIncreaseSales;
        this.complexNightIDRateSales = respones.data.ComplexNightIDRateSales;
        this.isComplexNightIncreaseSales = respones.data.IsComplexNightIncreaseSales;
        this.historyhallIDRateSales = respones.data.HistoryhallIDRateSales;
        this.isHistoryhallIncreaseSales = respones.data.IsHistoryhallIncreaseSales;
        this.visitorSales = respones.data.VisitorSales;
        this.incidentalSales = respones.data.IncidentalSales;
        this.rentalSales = respones.data.RentalSales;
        this.goodsSales = respones.data.GoodsSales;


        this.accumulateVisitorTotal = respones.data.AccumulateVisitorTotal;
        this.visitorTotalIDRate = respones.data.VisitorTotalIDRate;
        this.isVisitorTotalIncrease = respones.data.IsVisitorTotalIncrease;
        this.accumulateSalesTotal = respones.data.AccumulateSalesTotal;
        this.salesTotalIDRate = respones.data.SalesTotalIDRate;
        this.isSalesTotalIncrease = respones.data.IsSalesTotalIncrease;


        this.complexAccumulate = respones.data.ComplexAccumulate;
        this.complexIDRate = respones.data.ComplexIDRate;
        this.isComplexIncrease = respones.data.IsComplexIncrease;

        this.complexSalesTotal = respones.data.ComplexSalesTotal;
        this.complexSalesTotalIDRate = respones.data.ComplexSalesTotalIDRate;
        this.isComplexSalesTotalIncrease = respones.data.IsComplexSalesTotalIncrease;


        this.accumulateTotal = Number(this.freeHistoryhallAccumulate) + Number(this.freeComplexAccumulate) + Number(this.payHistoryhallAccumulate) + 
          Number(this.payComplexNightAccumulate) + Number(this.payComplexDayAccumulate)
      }
    } catch(e) {
      console.log('대시보드 누적 현황 데이터 조회 실패 : ' + e);
      alert('대시보드 누적 현황 데이터 조회 실패');
    }
  }

  setChartData() {
    this.series = [
      {
        name: '유료입장객',
        // data: [10018, 500]
        data: [this.payComplexDayAccumulate + this.payComplexNightAccumulate, this.payHistoryhallAccumulate]
      },
      {
        name: '무료입장객',
        // data: [4001, 180]
        data: [this.freeComplexAccumulate, this.freeHistoryhallAccumulate]
      },
    ];

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        position: 'bottom',
        horizontal: true,
        // offsetY: -40,
        // offsetX: 50,
        style: {
            // fontSize: '10px',
            colors: ['#000']
        },
        // labels: {
        //   formatter (val:any) {value
        //     return val + "명"
        //   },
        // },
        formatter(val:any, opt:any) {

          return priceFormatter(val)
        },
        // formatter(val:any, opt:any) {
        //   // return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val
        //   // const value:number = Number(val);
        //   // const percent:number = (value / 14699) * 100;
        //   // return val + '(' + percent.toFixed(2) + '%)';

        //   return priceFormatter(val)
        // },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: '입장객 현황',
        align: 'center',
        style: {
          fontSize: '18px',
        },
      },
      xaxis: {
        // categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        categories: ['단지', '역사관'],
        labels: {
          formatter (val:any) {
            return priceFormatter(val) + "명"
          },
        },
        // max: 14700 
        // max: Number(this.accumulateTotal) 
        // max: 14699 
      }, 
      // yaxis: {
      //   title: {
      //     text: undefined
      //   },
      // },
      tooltip: {
        y: {
          formatter (val:any) {
            // const value:number = Number(val);
            // const percent:number = (value / 14699) * 100;
            // return priceFormatter(val) + '(' + percent.toFixed(2) + '%)명';
            return priceFormatter(val) + '명'
          }
          // formatter (val:any) {
          //   // const value:number = Number(val);
          //   // const percent:number = (value / 14699) * 100;
          //   // return priceFormatter(val) + '(' + percent.toFixed(2) + '%)명';
          //   return priceFormatter(val)
          // }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        // position: 'top',
        // horizontalAlign: 'left',
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 40
      },
    };

    // this.series2 = [44, 55, 41, 17];
    this.series2 = [this.visitorSales, this.incidentalSales, this.rentalSales, this.goodsSales];
    // this.series2 = [priceFormatter(this.visitorSales), priceFormatter(this.incidentalSales) , priceFormatter(this.rentalSales), priceFormatter(this.goodsSales)];

    this.chartOptions2 = {
      chart: {
        type: 'donut',
      },
      title: {
        text: '매출 현황',
        align: 'center',
        style: {
          fontSize: '18px',
        },
      },
      labels: ['입장객매출', '부대매출', '임대매출', '상품매출' ],
      // xaxis: {
      //   categories: ['입장객매출', '부대매출', '임대매출', '상품매출'],
      //   labels: {
      //     formatter (val:any) {
      //       return val + "명"
      //     },
      //   }
      // },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      tooltip: {
        y: {
          formatter (val:any) {
            return priceFormatter(val)
          }
        }
      },
    };
  }

  created() {
     
  }

  async mounted() {
    await this.getCumulativeStatus();
    await this.setChartData();

    // this.series = [
    //   {
    //     name: '유료입장객',
    //     // data: [10018, 500]
    //     data: [this.payComplexDayAccumulate + this.payComplexNightAccumulate, this.payHistoryhallAccumulate]
    //   },
    //   {
    //     name: '무료입장객',
    //     // data: [4001, 180]
    //     data: [this.freeComplexAccumulate, this.freeHistoryhallAccumulate]
    //   },
    // ];

    // this.chartOptions = {
    //   chart: {
    //     type: 'bar',
    //     height: 350,
    //     stacked: true,
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     textAnchor: 'middle',
    //     position: 'bottom',
    //     horizontal: true,
    //     // offsetY: -40,
    //     // offsetX: 50,
    //     style: {
    //         // fontSize: '10px',
    //         colors: ['#000']
    //     },
    //     // labels: {
    //     //   formatter (val:any) {value
    //     //     return val + "명"
    //     //   },
    //     // },
    //     formatter(val:any, opt:any) {

    //       return priceFormatter(val)
    //     },
    //     // formatter(val:any, opt:any) {
    //     //   // return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val
    //     //   // const value:number = Number(val);
    //     //   // const percent:number = (value / 14699) * 100;
    //     //   // return val + '(' + percent.toFixed(2) + '%)';

    //     //   return priceFormatter(val)
    //     // },
    //   },
    //   stroke: {
    //     width: 1,
    //     colors: ['#fff']
    //   },
    //   title: {
    //     text: '입장객 현황',
    //     align: 'center',
    //     style: {
    //       fontSize: '18px',
    //     },
    //   },
    //   xaxis: {
    //     // categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    //     categories: ['단지', '역사관'],
    //     labels: {
    //       formatter (val:any) {
    //         return priceFormatter(val) + "명"
    //       },
    //     },
    //     // max: 14700 
    //     // max: Number(this.accumulateTotal) 
    //     // max: 14699 
    //   }, 
    //   // yaxis: {
    //   //   title: {
    //   //     text: undefined
    //   //   },
    //   // },
    //   tooltip: {
    //     y: {
    //       formatter (val:any) {
    //         // const value:number = Number(val);
    //         // const percent:number = (value / 14699) * 100;
    //         // return priceFormatter(val) + '(' + percent.toFixed(2) + '%)명';
    //         return priceFormatter(val)
    //       }
    //       // formatter (val:any) {
    //       //   // const value:number = Number(val);
    //       //   // const percent:number = (value / 14699) * 100;
    //       //   // return priceFormatter(val) + '(' + percent.toFixed(2) + '%)명';
    //       //   return priceFormatter(val)
    //       // }
    //     }
    //   },
    //   fill: {
    //     opacity: 1
    //   },
    //   legend: {
    //     // position: 'top',
    //     // horizontalAlign: 'left',
    //     position: 'bottom',
    //     horizontalAlign: 'center',
    //     offsetX: 40
    //   },
    // };

    
    // this.series2 = [this.visitorSales, this.incidentalSales, this.rentalSales, this.goodsSales];

    // this.chartOptions2 = {
    //   chart: {
    //     type: 'donut',
    //   },
    //   title: {
    //     text: '매출 현황',
    //     align: 'center',
    //     style: {
    //       fontSize: '18px',
    //     },
    //   },
    //   labels: ['입장객매출', '부대매출', '임대매출', '상품매출' ],
    //   // xaxis: {
    //   //   categories: ['입장객매출', '부대매출', '임대매출', '상품매출'],
    //   //   labels: {
    //   //     formatter (val:any) {
    //   //       return val + "명"
    //   //     },
    //   //   }
    //   // },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: 'bottom'
    //         }
    //       }
    //     }
    //   ],
    //   tooltip: {
    //     y: {
    //       formatter (val:any) {
    //         return priceFormatter(val)
    //       }
    //     }
    //   },
    // };
  }

  async searchTypeChange(value: any) {
    // console.log(`selected ${value}`);
    this.searchType = value;
    await this.getCumulativeStatus();
    await this.setChartData();
  }
}
</script>

<style>
.content {
  height: 100vh;
}

#arrow svg {
  width: 18px;
  height: 18px;
}
</style>
