<template>
<!-- 임대 매출 관리 > 임대 매출 현황 -->
  <div class="w-full flex justify-center content overflow-scroll">
    <div class="container-box">
      <div class="w-full mb-16">
        <p class="main-title font-notosans">임대매출 현황</p>
      </div>
      <div class="w-full flex justify-between items-center mb-8">
        <div class="flex items-center gap-x-2">
          <a-select default-value="1" style="width: 120px" @change="vatChange">
            <a-select-option value="1">
              VAT 포함
            </a-select-option>
            <a-select-option value="2">
              VAT 별도
            </a-select-option>
          </a-select> 
          <a-select :default-value="settlementYears[0]" style="width: 120px" @change="yearChange">
            <a-select-option v-for="(item, index) in settlementYears" :key="index" :value="item">
              {{ item }}년
            </a-select-option>
          </a-select>
          <a-select default-value="all" style="width: 120px" @change="divisionCodeChange">
            <a-select-option  value='all'>
              전체
            </a-select-option>
            <a-select-option v-for="(item, index) in divisionCodeDatas" :key="index" :value="item.Code">
              {{ item.CodeName }}
            </a-select-option>
          </a-select>
          <button class="search-btn" @click="search">
            조회
          </button>
        </div>
        <div class="flex gap-x-2">
          <button class="excel-down-btn">
            엑셀 다운로드
          </button>
          <button class="add-btn" @click="showModal = true">
            매출 등록
          </button>
        </div>
      </div>

      <!-- 테이블 -->
      <!-- :scroll="{ x: 1500, y: 300 }" -->
      <div id="rentalSalesStatus" class="w-full h-full mb-5">
        <a-table
          :columns="columns"
          :data-source="resultDatas"
          bordered
          :pagination="pagination"
          :scroll="{ x: 1280 }"
          class="w-full font-notosans text-black"
        >
          <span v-for="(item, index) in monthTitleSlots" :key="index" :slot="item.title" class="underline hover:cursor-pointer" @click="goDetail(item.month)">
            {{ item.month }}월
          </span>
          <span slot="selectYearTitleSlot" class="">
            <!-- {{ currentYear }}년 -->
            {{ yearView }}년
          </span>
        </a-table>
      </div>
    </div>
    <!-- Modal -->
    <RentSalesAddModal v-if="showModal" @modalCloseRefresh="refresh" @close="showModal = false">
    </RentSalesAddModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "nuxt-property-decorator";
import moment from 'moment';
import { priceFormatter } from '@/utils/priceFormatter';
import RentSalesAddModal from '@/components/modals/RentSalesAddModal.vue'
moment.locale('ko_KR')

@Component({ 
  layout: 'navMenu',
  components: {
    RentSalesAddModal
  },
})
export default class RentalSalesStatus extends Vue {
  SalesUrl = 'http://localhost:5000/api/rentalSales';
  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';
  yearView = '';
  showModal:boolean = false;
  currentYear:string = '';
  monthTitleSlots:{title:string, month:number}[] = [];
  divisionCodeDatas = [];

  totalIndex = -1;

  resultDatas:any[] = []; // 테이블 binding datas

  settlementYears:number[] = [];

  vatParam = '1'; // 검색조건 - vat 포함여부 // 1 : 포함, 2 :미포함, default : 1
  settlementYearParam = new Date().getFullYear(); // 검색조건 - 정산년도, default : 현재 연도
  divisionCodeParam = 'all'; // 검색조건 - 매출 항목, default : 전체

  columns:any[] = [];

  subTotalRowIndexs:number[] = [];
  
  mergetTargets:{ startIndex:number, itemCount:number }[] = [];
  mergeIndexs:number[] = [];

  searchitemCount:number = 0;

  @Emit()
  refresh() {
    this.showModal = false;
    this.search();
  }

  setColumns() {
    this.columns = [
      {
        title: '구분',
        rowSpan: 2,
        children: [
          {
            title: '1',
            colSpan: 0,
            className: 'column-center',
            dataIndex: 'AccountName',
            width: '10%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if(value === '합계') {
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
                obj.attrs.colSpan = 2;
                this.totalIndex = index;
              }  

              if(this.mergetTargets.length > 0) {
                for(let i = 0; i < this.mergetTargets.length; i++) {
                  if(index === this.mergetTargets[i].startIndex) {
                    obj.attrs.rowSpan = this.mergetTargets[i].itemCount;
                    break;
                  }
                }

                if(this.mergeIndexs.includes(index)) {
                  obj.attrs.colSpan = 0; 
                }
              }

              if(this.searchitemCount > 0) {
                obj.attrs.rowSpan = this.searchitemCount - 1;

                for(let i = 1; i < (this.searchitemCount - 1); i++) {
                  if(index === i) {
                    obj.attrs.colSpan = 0; 
                    break;
                  }
                }
              }
              
              return obj;
            }
          },
          {
            title: '2',
            colSpan: 0,
            className: 'column-center',
            dataIndex: 'ItemName',
            width: '10%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if (value === '소계') {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 800;';
                // this.subTotalIndex = index;
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 800;';
                obj.attrs.colSpan = 0;
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
        ],
      },
      {
        // title: '목표',
        slots: { title: 'selectYearTitleSlot' },
        children: [
          {
            className: 'column-right',
            dataIndex: 'January',
            // width: '6%',
            slots: { title: 'custom1MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              // if(index === this.subTotalIndex) {
              //   obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              // }
              // this.subTotalRowIndexs
              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'February',
            // width: '6%',
            slots: { title: 'custom2MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'March',
            // width: '6%',
            slots: { title: 'custom3MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'April',
            // width: '6%',
            slots: { title: 'custom4MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'May',
            // width: '6%',
            slots: { title: 'custom5MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'June',
            // width: '6%',
            slots: { title: 'custom6MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'July',
            // width: '6%',
            slots: { title: 'custom7MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'August',
            // width: '6%',
            slots: { title: 'custom8MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'September',
            // width: '6%',
            slots: { title: 'custom9MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'October',
            // width: '6%',
            slots: { title: 'custom10MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'November',
            // width: '6%',
            slots: { title: 'custom11MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            className: 'column-right',
            dataIndex: 'December',
            // width: '6%',
            slots: { title: 'custom12MonthTitle' },
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
                attrs: {},
              };

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              if(index === this.totalIndex) {
                // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
        ]
      },
      {
        title: '합계',
        dataIndex: 'Total',
        className: 'column-right',
        // width: '10%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: parseInt(value) > 999999999 ? priceFormatter(parseInt(value) / 10000) + '(만)' : priceFormatter(parseInt(value)),
            attrs: {},
          };

          obj.attrs.style = 'border-right: 0;';

          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.totalIndex) {
            // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700; border-right: 0;';
            obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          }

          return obj;
        },
      }
      
    ];
  }

  goDetail(month:number) {
    let getDateQuery:string = '';
    if(month < 10) {
      // yearView
      getDateQuery = this.yearView + '-0' + month.toString();
    } else {
      getDateQuery = this.yearView + '-' + month.toString();
    }
    
    this.$router.push({path: '/rentalRevenueManagement/rentalSalesStatus/detail', query: { getDate: getDateQuery }});
  }

  // goDetail(month:number) {
  //   let getDateQuery:string = '';
  //   if(month < 10) {
  //     // yearView
  //     getDateQuery = this.yearView + '-0' + month.toString();
  //   } else {
  //     getDateQuery = this.yearView + '-' + month.toString();
  //   }
    
  //   this.$router.push({path: '/incidentalRevenueManagement/incidentalSalesStatus/detail', query: { getDate: getDateQuery }});
  // }

  priceFormatter = priceFormatter

  pagination = {
    pageSize: 100
  };

  vatChange(value: any) {
    // console.log(`selected ${value}`);
    this.vatParam = value; // 1 : 포함, 2 :미포함
  }

  yearChange(value: number) {
    // console.log(`selected ${value}`);
    this.settlementYearParam = value;
    this.currentYear = value.toString();
  }

  divisionCodeChange(value: string) {
    // console.log(`selected ${value}`);
    this.divisionCodeParam = value;
  }

  async getRentalSalesItemTypes() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItemTypes');

      if(respones.data !== null && respones.data !== undefined) {
        this.divisionCodeDatas = respones.data;
      } else {
        alert('부대매출 항목 구분 데이터 조회 실패');
      }
    } catch(e) {
      console.log('부대매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('부대매출 항목 구분 데이터 조회 실패');
    }
  }

  async getRentalSalesStatus() {
    try {
      const respones = await this.$axios.get(this.SalesUrl + '/rentalSalesStatus', {
        params: {
          vatParam: this.vatParam,
          settlementYearParam: this.settlementYearParam,
          divisionCodeParam: this.divisionCodeParam,
        }
      });
      // const respones = await this.$axios.get(this.SalesUrl + '/rentalSalesStatus');

      if(respones.data.data !== null && respones.data.data !== undefined && respones !== null && respones.data !== null) {
        this.mergetTargets = [];
        this.mergeIndexs = [];

        this.searchitemCount = 0;

           this.resultDatas = respones.data.data;

           if(respones.data.subTotalRowIndexs.length > 0) {
              this.subTotalRowIndexs = respones.data.subTotalRowIndexs;
           }

           if(respones.data.setMergeData.length > 0) {
            for(let i = 0; i < respones.data.setMergeData.length; i++) {  
              const obj:{ startIndex:number, itemCount:number } = { startIndex:-1, itemCount:0 };

              obj.startIndex = respones.data.setMergeData[i].StartIndex;
              obj.itemCount = respones.data.setMergeData[i].ItemCount;

              this.mergetTargets.push(obj);

              for(let j = 0; j < respones.data.setMergeData[i].DelIndexList.length; j++) {
                this.mergeIndexs.push(respones.data.setMergeData[i].DelIndexList[j]);
              } 
            }
           }

           await this.setColumns();
        // if(this.divisionCodeParam === 'all') {
        //   this.searchitemCount = 0;

        //    this.resultDatas = respones.data.data;

        //    if(respones.data.subTotalRowIndexs.length > 0) {
        //       this.subTotalRowIndexs = respones.data.subTotalRowIndexs;
        //    }

        //    if(respones.data.setMergeData.length > 0) {
        //     for(let i = 0; i < respones.data.setMergeData.length; i++) {  
        //       const obj:{ startIndex:number, itemCount:number } = { startIndex:-1, itemCount:0 };

        //       obj.startIndex = respones.data.setMergeData[i].StartIndex;
        //       obj.itemCount = respones.data.setMergeData[i].ItemCount;

        //       this.mergetTargets.push(obj);

        //       for(let j = 0; j < respones.data.setMergeData[i].DelIndexList.length; j++) {
        //         this.mergeIndexs.push(respones.data.setMergeData[i].DelIndexList[j]);
        //       } 
        //     }
        //    }

        //    await this.setColumns();
        // } else {
        //   this.resultDatas = respones.data.data;
        //   this.subTotalRowIndexs = [];

        //   this.searchitemCount = this.resultDatas.length;
        //   await this.setColumns();
        // }
        
      } else {
        alert('임대매출 현황 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 현황 데이터 조회 실패 : ' + e);
      alert('임대매출 현황 데이터 조회 실패');
    }
  }

  // 검색
  async search() {
    this.yearView = this.currentYear;
    this.totalIndex = -1;
    this.resultDatas = []; 

    // 임대매출 현황 데이터 조회
    await this.getRentalSalesStatus();
  }

  async created() {
    const date = new Date();
    let currentYear = date.getFullYear();

    for(let i = 0; i < 5; i++) {
      this.settlementYears.push(currentYear);
      currentYear--;
    } 

    for(let i = 1; i <= 12; i++) {
      this.monthTitleSlots.push({ title: 'custom' + i + 'MonthTitle', month: i });
    }    
    
    this.currentYear = date.getFullYear().toString();
    this.yearView = this.currentYear;


    // 매출 항목 검색 조건 데이터 조회
    await this.getRentalSalesItemTypes();
    // 매출 항목 검색
    await this.search();
  }

  async onLoad() {
    
  }

  mounted() {
    this.onLoad();
  }
}
</script>
<style>
.content {
  height: 100vh;
}

td.column-right {
  text-align: right !important;
}

td.column-center {
  text-align: center !important;
  position: relative !important;
}

th {
  text-align: center !important; 
  background-color: #f5f5f5 !important;
  font-weight: 800 !important;
  word-wrap: break-word !important;
}

td {
  color:black !important;
  word-wrap: break-word !important;
  padding: 6px !important;
}

#rentalSalesStatus .ant-table-pagination.ant-pagination {
  display: none;
}
</style>