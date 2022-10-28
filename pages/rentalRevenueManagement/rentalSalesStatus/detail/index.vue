<template>
<!-- 임대 매출 관리 > 임대 매출 현황 > 상세 -->
  <div class="w-full">
    <div class="w-full flex justify-center content overflow-scroll">
      <div class="container-box">
        <div class="w-full mb-16">
          <p class="main-title font-notosans">상세 내역</p>
        </div>
        <div class="w-full flex justify-between items-center mb-8">
          <div class="flex items-center gap-x-2">
            <div class="flex gap-x-2">
                <a-date-picker v-model="startDateParam" placeholder="시작일" @change="startDateChange" />
                <span> - </span>
                <a-date-picker v-model="endDateParam" placeholder="종료일" @change="endDateChange" />
              </div>
            <button class="search-btn" @click="search">
              조회
            </button>
          </div>
          <div class="flex gap-x-2">
            <button class="list-btn" @click="goList">
              목록
            </button>
            <button class="add-btn" @click="showModal = true">
              매출 등록
            </button>
          </div>
        </div>
        <!-- 테이블 -->
        <div id="rentalSalesStatusDetail" class="w-full h-full mb-5">
          <a-table
            :columns="columns"
            :data-source="resultDatas"
            bordered
            :pagination="pagination"
            :scroll="{ x: 1280 }"
            class="font-notosans text-black"
          >
          </a-table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <RentSalesAddModal v-if="showModal" @modalCloseRefresh="refresh" @close="showModal = false">
      <!-- <h3 slot="header">헤더</h3> -->
    </RentSalesAddModal>
  </div>

  
</template>
<script lang="ts">
import { Component, Vue, Emit } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';
import RentSalesAddModal from '@/components/modals/RentSalesAddModal.vue'

@Component({ 
  layout: 'navMenu',
  components: {
    RentSalesAddModal
  },
})
export default class rentalSalesStatusDetail extends Vue {
  SalesUrl = 'http://localhost:5000/api/rentalSales';
  searchDate:any = '';
  // targetMonth:string|(string|null)[] = '';

  showModal:boolean = false;
  subTotalIndex = -1; // 소계 행
  rentTotalIndex = -1; // 임대매출 합계 행
  mcTotalIndex = -1; // 관리비 매출 합계 행
  allTotalIndex = -1; // 총계 행

  columns:any[] = [];
  tableDatas = [];
  resultDatas = [];
  subTotalRowIndexs:number[] = [];
  salesTotalRowIndexs:number[] = [];

  accountMergetTargets:{ startIndex:number, itemCount:number }[] = [];
  accountMergeIndexs:number[] = [];

  divisionMergetTargets:{ startIndex:number, itemCount:number }[] = [];
  divisionMergeIndexs:number[] = [];

  startDateParam = '';
  endDateParam = '';

  priceFormatter = priceFormatter

  @Emit()
  refresh() {
    this.showModal = false;
    this.search();
  }

  // 임대매출 현황 목록 이동
  goList() {
    this.$router.push({ path: '/rentalRevenueManagement/rentalSalesStatus' });
  }

  pagination = {
    pageSize: 100
  };

  modalClose() {
    this.showModal  = false;
    alert('modal close');
  }

  startDateChange(date: any, dateString: string) {
    this.startDateParam = dateString;
  }

  endDateChange(date: any, dateString: string) {
    this.endDateParam = dateString;
  }

  setColumns() {
    this.columns = [
      {
        title: '구분',
        rowSpan: 3,
        children: [
          {
            title: '1',
            colSpan: 0,
            className: 'column-center',
            dataIndex: 'DivisionName',
            width: '14%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if(this.divisionMergetTargets.length > 0) {
                for(let i = 0; i < this.divisionMergetTargets.length; i++) {
                  if(index === this.divisionMergetTargets[i].startIndex) {
                    obj.attrs.rowSpan = this.divisionMergetTargets[i].itemCount;
                    break;
                  }
                }

                if(this.divisionMergeIndexs.includes(index)) {
                  obj.attrs.colSpan = 0; 
                }
              }

              if(value.includes('총 계')) {
                this.allTotalIndex = index;
                obj.attrs.colSpan = 3; 
              }

              if(index === this.allTotalIndex) {
                obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              }

              return obj;
            },
          },
          {
            title: '2',
            colSpan: 0,
            className: 'column-center',
            dataIndex: 'AccountName',
            width: '14%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if(this.accountMergetTargets.length > 0) {
                for(let i = 0; i < this.accountMergetTargets.length; i++) {
                  if(index === this.accountMergetTargets[i].startIndex) {
                    obj.attrs.rowSpan = this.accountMergetTargets[i].itemCount;
                    break;
                  }
                }

                if(this.accountMergeIndexs.includes(index)) {
                  obj.attrs.colSpan = 0; 
                }
              }

              if(value.includes('합계')) {
                obj.attrs.colSpan = 2; 
              }

              if(value.includes('총 계')) {
                obj.attrs.colSpan = 0; 
              }

              if(this.salesTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
              }

              return obj;
            },
          },
          {
            title: '3',
            colSpan: 0,
            className: 'column-center',
            dataIndex: 'ItemName',
            width: '14%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if(value.includes('합계')) {
                obj.attrs.colSpan = 0; 
              }

              if(value.includes('총 계')) {
                obj.attrs.colSpan = 0; 
              }

              if(this.subTotalRowIndexs.includes(index)) {
                obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
              }

              return obj;
            },
          },
        ],
      },
      {
        title: '공급가',
        className: 'column-right',
        dataIndex: 'SupplyPrice',
        width: '14%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: priceFormatter(Number(value)),
            attrs: {},
          };

          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
          }

          if(this.salesTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.allTotalIndex) {
            obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          }

          return obj;
        },
      },
      {
        title: '부가세',
        className: 'column-right',
        dataIndex: 'Surtax',
        width: '14%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: priceFormatter(Number(value)),
            attrs: {},
          };

          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
          }

          if(this.salesTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.allTotalIndex) {
            obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          }

          return obj;
        },
      },
      {
        title: '합계',
        className: 'column-right',
        dataIndex: 'SumPrice',
        width: '14%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: priceFormatter(Number(value)),
            attrs: {},
          };

          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
          }

          if(this.salesTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.allTotalIndex) {
            obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          }

          return obj;
        },
      },
      {
        title: '비고',
        className: 'column-center',
        dataIndex: 'Note',
        width: '16%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: value,
            attrs: {},
          };

          obj.attrs.style = 'border-right: 0;';

          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
          }

          if(this.salesTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.allTotalIndex) {
            obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          }

          return obj;
        },
      },
    ];
  }

  async getRentalSalesDetail() {
    try {
      const respones = await this.$axios.get(this.SalesUrl + '/rentalSalesStatus/detail', {
        params: {
          startDateParam: this.startDateParam,
          endDateParam: this.endDateParam,
        }
      });

      if(respones !== null && respones !== undefined) {
        if(respones.data.data !== '' && respones.data.data !== undefined && respones.data.data !== null) {
          this.resultDatas = respones.data.data;
        }

        // 소계 row index 설정
        if(respones.data.subTotalRowIndexs != null && respones.data.subTotalRowIndexs !== undefined) {
          if(respones.data.subTotalRowIndexs.length) {
            this.subTotalRowIndexs = respones.data.subTotalRowIndexs;
          }
        }

        // 매출합계 row index 설정
        if(respones.data.salesTotalRowIndexs != null && respones.data.salesTotalRowIndexs !== undefined) {
          if(respones.data.salesTotalRowIndexs.length) {
            this.salesTotalRowIndexs = respones.data.salesTotalRowIndexs;
          }
        }

        // 거래처 merge 설정
        if(respones.data.setAccountMergeData !== undefined && respones.data.setAccountMergeData !== null) {
          if(respones.data.setAccountMergeData.length > 0) {
            this.accountMergetTargets = [];
            this.accountMergeIndexs = [];

            for(let i = 0; i < respones.data.setAccountMergeData.length; i++) {  
              const obj:{ startIndex:number, itemCount:number } = { startIndex:-1, itemCount:0 };

              obj.startIndex = respones.data.setAccountMergeData[i].StartIndex;
              obj.itemCount = respones.data.setAccountMergeData[i].ItemCount;

              this.accountMergetTargets.push(obj);

              for(let j = 0; j < respones.data.setAccountMergeData[i].DelIndexList.length; j++) {
                this.accountMergeIndexs.push(respones.data.setAccountMergeData[i].DelIndexList[j]);
              } 
            }
          }
        }

        // 매출구분 merge 설정
        if(respones.data.setDivisionMergeData !== undefined && respones.data.setDivisionMergeData !== null) {
          if(respones.data.setDivisionMergeData.length > 0) {
            this.divisionMergetTargets = [];
            this.divisionMergeIndexs = [];

            for(let i = 0; i < respones.data.setDivisionMergeData.length; i++) {  
              const obj:{ startIndex:number, itemCount:number } = { startIndex:-1, itemCount:0 };

              obj.startIndex = respones.data.setDivisionMergeData[i].StartIndex;
              obj.itemCount = respones.data.setDivisionMergeData[i].ItemCount;

              this.divisionMergetTargets.push(obj);

              for(let j = 0; j < respones.data.setDivisionMergeData[i].DelIndexList.length; j++) {
                this.divisionMergeIndexs.push(respones.data.setDivisionMergeData[i].DelIndexList[j]);
              } 
            }
          }
        }

        await this.setColumns();
        
      } else {
        alert('임대매출 상세 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 상세 데이터 조회 실패 : ' + e);
      alert('임대매출 상세 데이터 조회 실패');
    }
  }

  // 검색
  async search() {
    this.allTotalIndex = -1;
    this.resultDatas = []; 

    // 임대매출 월별 상세 데이터 조회
    await this.getRentalSalesDetail();
  }

  async created() {
    this.searchDate = this.$route.query.getDate;

    let searchYear:number = 0;
    let searchMonth:number = 0;
    if(this.searchDate !== '' && this.searchDate !== undefined) {
      const arr = this.searchDate.split('-');

      searchYear = Number(arr[0]);
      searchMonth = Number(arr[1]);
    }

    const date = new Date();

    const currentYear:number = date.getFullYear();
    const currentMonth:number = date.getMonth() + 1;
    const currentDay:number = date.getDate();

    const startDay:string = '01';
    let endDay:string = '';

    if(searchYear === currentYear && searchMonth === currentMonth) {
      endDay = currentDay.toString();
    } else if(searchMonth === 2) {
      endDay = '28';
    } else if(searchMonth === 1 || searchMonth === 3 || searchMonth === 5 || searchMonth === 7 || searchMonth === 8 || searchMonth === 10 || searchMonth === 12) {
      endDay = '31';
    } else {
      endDay = '30';
    }
    
    let monthStr:string = '';
    if(searchMonth < 10) {
      monthStr = '0' + searchMonth.toString();
    } else {
      monthStr = searchMonth.toString();
    }

    const startDate = searchYear.toString() + '-' + monthStr + '-' + startDay;
    const endDate = searchYear.toString() + '-' + monthStr + '-' + endDay;

    this.startDateParam = startDate;
    this.endDateParam = endDate;

    // 임대매출 항목 검색
    await this.search();
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

#rentalSalesStatusDetail .ant-table-pagination.ant-pagination {
  display: none;
}
</style>