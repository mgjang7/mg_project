<template>
<!-- 부대 매출 관리 > 부대 매출 현황 > 상세 -->
  <div class="w-full">
    <div class="w-full flex justify-center content overflow-scroll">
      <div class="container-box">
        <div class="w-full mb-16">
          <p class="main-title font-notosans">상세 내역</p>
        </div>
        <div class="w-full flex justify-between items-center mb-8">
          <div class="flex items-center gap-x-2">
            <div class="flex gap-x-2">
                <a-date-picker :default-value="startDateParam" placeholder="시작일" @change="startDateChange" />
                <span> - </span>
                <a-date-picker :default-value="endDateParam" placeholder="종료일" @change="endDateChange" />
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
        <div id="incidentalSalesStatusDetail" class="w-full h-full mb-5">
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
    <IncidentalSalesAddModal v-if="showModal" @modalCloseRefresh="refresh" @modalClose="showModal = false">
    </IncidentalSalesAddModal>
  </div>

  
</template>
<script lang="ts">
import { Component, Vue, Emit } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';
import IncidentalSalesAddModal from '@/components/modals/IncidentalSalesAddModal.vue'

@Component({ 
  layout: 'navMenu',
  components: {
    IncidentalSalesAddModal
  },
})
export default class rentalSalesStatusDetail extends Vue {
  SalesUrl = 'http://localhost:5000/api/incidentalSales';
  resultDatas:any[] = []; // 테이블 binding datas

  startDateParam = '';
  endDateParam = '';

  subTotalRowIndexs:number[] = [];
  mergetTargets:{ startIndex:number, itemCount:number }[] = [];
  mergeIndexs:number[] = [];
  columns:any[] = [];

  searchDate:any = '';
  showModal:boolean = false;
  totalIndex = -1; // 합계 행

  // columns = [
  //   {
  //     title: '구분',
  //     rowSpan: 2,
  //     children: [
  //       {
  //         title: '1',
  //         colSpan: 0,
  //         className: 'column-center',
  //         dataIndex: 'customer',
  //         width: '14%',
  //         customRender: (value:string, row:any, index:number) => {
  //           const obj:{children: string, attrs: any} = {
  //             children: value,
  //             attrs: {},
  //           };

  //           if(index === 0) {
  //             obj.attrs.rowSpan = 6;
  //           }

  //           for(let i = 1; i <= 5; i++) {
  //             if(index === i) {
  //               obj.attrs.colSpan = 0;
  //             }
  //           }

  //           if(index === 6) {
  //             obj.attrs.rowSpan = 3;
  //           }

  //           for(let i = 7; i <= 8; i++) {
  //             if(index === i) {
  //               obj.attrs.colSpan = 0;
  //             }
  //           }

  //           if(index === 9) {
  //             obj.attrs.rowSpan = 5;
  //           }

  //           for(let i = 10; i <= 13; i++) {
  //             if(index === i) {
  //               obj.attrs.colSpan = 0;
  //             }
  //           }

  //           if(value === '합계(체험+대관/대여+상품)') {
  //             this.totalIndex = index;
  //             obj.attrs.colSpan = 2;
  //             // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
  //             obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
  //           }

  //           return obj;
  //         },
  //       },
  //       {
  //         title: '2',
  //         colSpan: 0,
  //         className: 'column-center',
  //         dataIndex: 'salesItem',
  //         width: '14%',
  //         customRender: (value:string, row:any, index:number) => {
  //           const obj:{children: string, attrs: any} = {
  //             children: value,
  //             attrs: {},
  //           };

  //           if(value === '합계(체험+대관/대여+상품)') {
  //             obj.attrs.colSpan = 0;
  //           }

  //           if(value === '소계') {
  //             this.subTotalIndex = index;
  //             obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
  //           }

  //           return obj;
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     title: '공급가',
  //     className: 'column-right',
  //     dataIndex: 'supplyPrice',
  //     width: '14%',
  //     customRender: (value:string, row:any, index:number) => {
  //       const obj:{children: string, attrs: any} = {
  //         children: priceFormatter(Number(value)),
  //         attrs: {},
  //       };

  //       if(index === this.subTotalIndex) {
  //         this.subTotalIndex = index;
  //         obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
  //       }

  //       if(index === this.totalIndex) {
  //         this.subTotalIndex = index;
  //         // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
  //         obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
  //       }

  //       return obj;
  //     },
  //   },
  //   {
  //     title: '부가세',
  //     className: 'column-right',
  //     dataIndex: 'vat',
  //     width: '14%',
  //     customRender: (value:string, row:any, index:number) => {
  //       const obj:{children: string, attrs: any} = {
  //         children: priceFormatter(Number(value)),
  //         attrs: {},
  //       };

  //       if(index === this.subTotalIndex) {
  //         this.subTotalIndex = index;
  //         obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
  //       }

  //       if(index === this.totalIndex) {
  //         this.subTotalIndex = index;
  //         // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
  //         obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
  //       }

  //       return obj;
  //     },
  //   },
  //   {
  //     title: '합계',
  //     className: 'column-right',
  //     dataIndex: 'sumPrice',
  //     width: '14%',
  //     customRender: (value:string, row:any, index:number) => {
  //       const obj:{children: string, attrs: any} = {
  //         children: priceFormatter(Number(value)),
  //         attrs: {},
  //       };

  //       if(index === this.subTotalIndex) {
  //         this.subTotalIndex = index;
  //         obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
  //       }

  //       if(index === this.totalIndex) {
  //         this.subTotalIndex = index;
  //         // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
  //         obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
  //       }

  //       return obj;
  //     },
  //   },
  //   {
  //     title: '비고',
  //     className: 'column-center',
  //     dataIndex: 'note',
  //     width: '16%',
  //     customRender: (value:string, row:any, index:number) => {
  //       const obj:{children: string, attrs: any} = {
  //         children: value,
  //         attrs: {},
  //       };

  //       obj.attrs.style = 'border-right: 0;';

  //       if(index === this.subTotalIndex) {
  //         this.subTotalIndex = index;
  //         obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
  //       }

  //       if(index === this.totalIndex) {
  //         this.subTotalIndex = index;
  //         // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700; border-right: 0;';
  //         obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
  //       }

  //       return obj;
  //     },
  //   },
  // ];

  // tableDatas = [
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '사비로열차',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '백보열',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '너프체험',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '공포체험',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '밤도깨비',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '체험',
  //     salesItem: '소계',
  //     supplyPrice: 6000000, 
  //     vat: 600000,
  //     sumPrice: 6600000,
  //     note: '' 
  //   },
  //   /// /////////////////////////////////////////////////////////////////////////////
  //   {
  //     idx: 0,
  //     customer: '대관/대여',
  //     salesItem: '임대료',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '대관/대여',
  //     salesItem: '관리비',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '대관/대여',
  //     salesItem: '소계',
  //     supplyPrice: 2000000, 
  //     vat: 200000,
  //     sumPrice: 2200000,
  //     note: '' 
  //   },
  //   /// /////////////////////////////////////////////////////////////////////////////
  //   {
  //     idx: 0,
  //     customer: '상품',
  //     salesItem: '상품명1',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '상품',
  //     salesItem: '상품명2',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '상품',
  //     salesItem: '상품판매',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '상품',
  //     salesItem: '기타',
  //     supplyPrice: 1000000, 
  //     vat: 100000,
  //     sumPrice: 1100000,
  //     note: '' 
  //   },
  //   {
  //     idx: 0,
  //     customer: '상품',
  //     salesItem: '소계',
  //     supplyPrice: 4000000, 
  //     vat: 400000,
  //     sumPrice: 4400000,
  //     note: '' 
  //   },
  //   /// /////////////////////////////////////////////////////////////////////////////
  //   {
  //     idx: 0,
  //     customer: '합계(체험+대관/대여+상품)',
  //     salesItem: '합계(체험+대관/대여+상품)',
  //     supplyPrice: 10000000, 
  //     vat: 1000000,
  //     sumPrice: 11000000,
  //     note: '' 
  //   },

  //   // {
  //   //   idx: 0,
  //   //   customer: '가온',
  //   //   salesType: 'rent', 
  //   //   salesTypeName: '임대매출',
  //   //   salesItem: '임대료(주막)',
  //   //   supplyPrice: 2000000, 
  //   //   vat: 200000,
  //   //   sumPrice: 2200000,
  //   //   note: '7월부터 임대료 변경' 
  //   // },
  // ];

  priceFormatter = priceFormatter

  pagination = {
    pageSize: 100
  };


  @Emit()
  refresh() {
    this.showModal = false;
    this.search();
  }

  startDateChange(date: any, dateString: string) {
    // console.log(date, dateString);
    this.startDateParam = dateString;
  }

  endDateChange(date: any, dateString: string) {
    this.endDateParam = dateString;
  }

  // 부대매출 현황 목록 이동
  goList() {
    this.$router.push({ path: '/incidentalRevenueManagement/incidentalSalesStatus' });
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
            dataIndex: 'DivisionName',
            width: '10%',
            customRender: (value:string, row:any, index:number) => {
              const obj:{children: string, attrs: any} = {
                children: value,
                attrs: {},
              };

              if(value === '합계(체험+대관/대여+상품)') {
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
        title: '공급가',
        className: 'column-right',
        dataIndex: 'SupplyPrice',
        width: '14%',
        customRender: (value:string, row:any, index:number) => {
          const obj:{children: string, attrs: any} = {
            children: priceFormatter(Number(value)),
            attrs: {},
          };

          // if(index === this.subTotalIndex) {
          //   this.subTotalIndex = index;
          //   obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
          // }
          if(this.subTotalRowIndexs.includes(index)) {
            obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
          }

          if(index === this.totalIndex) {
            // this.subTotalIndex = index;
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

        // if(index === this.subTotalIndex) {
        //   this.subTotalIndex = index;
        //   obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        // }
        if(this.subTotalRowIndexs.includes(index)) {
          obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
        }

        if(index === this.totalIndex) {
          // this.subTotalIndex = index;
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

        // if(index === this.subTotalIndex) {
        //   this.subTotalIndex = index;
        //   obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        // }
        if(this.subTotalRowIndexs.includes(index)) {
          obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
        }

        if(index === this.totalIndex) {
          // this.subTotalIndex = index;
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

        // if(index === this.subTotalIndex) {
        //   this.subTotalIndex = index;
        //   obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        // }
        if(this.subTotalRowIndexs.includes(index)) {
          obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
        }

        if(index === this.totalIndex) {
          // this.subTotalIndex = index;
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
    ];
  }

  async getIncidentalSalesDetail() {
    try {
      const respones = await this.$axios.get(this.SalesUrl + '/incidentalSalesStatus/detail', {
        params: {
          startDateParam: this.startDateParam,
          endDateParam: this.endDateParam,
        }
      });

      if(respones !== null && respones !== undefined) {
        if(respones.data.data !== '' && respones.data.data !== undefined && respones.data.data !== null) {
          this.resultDatas = respones.data.data;
        }

        if(respones.data.subTotalRowIndexs != null && respones.data.subTotalRowIndexs !== undefined) {
          if(respones.data.subTotalRowIndexs.length) {
            this.subTotalRowIndexs = respones.data.subTotalRowIndexs;
          }
        }

        if(respones.data.setMergeData !== undefined && respones.data.setMergeData !== null) {
          if(respones.data.setMergeData.length > 0) {
            this.mergetTargets = [];
            this.mergeIndexs = [];

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
        }

        await this.setColumns();
        
      } else {
        alert('부대매출 상세 데이터 조회 실패');
      }
    } catch(e) {
      console.log('부대매출 상세 데이터 조회 실패 : ' + e);
      alert('부대매출 상세 데이터 조회 실패');
    }
  }

  // 검색
  async search() {
    
    this.totalIndex = -1;
    this.resultDatas = []; 

    // 부대매출 월별 상세 데이터 조회
    await this.getIncidentalSalesDetail();
  }

  async created() {
    this.searchDate = this.$route.query.getDate;
    // alert('this.searchDate : ' + this.searchDate);

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

    // 부대매출 항목 검색
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

#incidentalSalesStatusDetail .ant-table-pagination.ant-pagination {
  display: none;
}
</style>