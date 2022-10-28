<template>
  <div class="w-full flex justify-center content overflow-scroll">
    <div class="container-box">
      <!-- 영업 속보 -->
      <div class="w-full mb-16">
        <p class="main-title font-notosans">
          영업속보
        </p>
      </div>
      <div class="w-full flex justify-between items-center mb-8">
        <div class="flex items-center gap-x-2">
           <!-- <a-select default-value="정산기준" style="width: 120px" @change="handleChange">
            <a-select-option value="1">
              VAT 포함
            </a-select-option>
            <a-select-option value="2">
              VAT 별도
            </a-select-option>
          </a-select>  -->
          <div class="flex">
            <a-date-picker :default-value="toDay" placeholder="정산일" @change="dateChange" />
          </div>
          <button class="search-btn" @click="search">
            조회
          </button>
        </div>
        <div class="flex gap-x-2">
          <button class="add-btn" @click="targetAdd">
            연간목표등록
          </button>
          <button class="excel-down-btn">
            엑셀 다운로드
          </button>
        </div>
      </div>
      <!-- 테이블 -->
      <!-- :scroll="{ x: 1080 }" -->
      <div id="flashReport" class="w-full mb-8">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="pagination"
          :scroll="{ x: 1280 }"
          class="font-notosans text-black"
        >

          <template slot="targetAddSlot" slot-scope="text, record">
            <p class="underline hover:cursor-pointer" @click="targetAdd">
              등록
            </p>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import moment from 'moment';
import { priceFormatter } from '@/utils/priceFormatter';
moment.locale('ko_KR')

@Component({ layout: 'navMenu' })
export default class FlashReport extends Vue {
  Url = 'http://localhost:5000/api/flashreport';
  selectYear:any = '';

  toDay = '';
  currentYear = '';
  currentDate = '';

  subTotalIndex = -1;
  totalIndex = -1;

  columns = [
    {
      title: '구분',
      rowSpan: 3,
      children: [
        {
          title: '1',
          colSpan: 0,
          className: 'column-center',
          // dataIndex: 'totalTypeDivision',
          dataIndex: 'TotalDivision',
          width: '6%',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: value,
              attrs: {},
            };

            if (index === 0) {
              obj.attrs.rowSpan = 9;
              obj.attrs.style = 'font-weight: 700;';
            }

            for(let i = 1; i <= 8; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }

            if (index === 9) {
              obj.attrs.rowSpan = 16;
              obj.attrs.style = 'font-weight: 700;';
            }

            for(let i = 10; i <= 24; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }

            return obj;
          },
        },
        {
          title: '2',
          colSpan: 0,
          className: 'column-center',
          // dataIndex: 'audienceTypeDivision',
          dataIndex: 'Division',
          width: '8%',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: value,
              attrs: {},
            };

            if (index === 0 && value === '유료입장객') {
              obj.attrs.rowSpan = 5;
              obj.attrs.style = 'font-weight: 700;';
            }

            for(let i = 1; i <= 4; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }

            if (index === 5 && value === '무료입장객') {
              obj.attrs.rowSpan = 3;
              obj.attrs.style = 'font-weight: 700;';
            }

            for(let i = 6; i <= 7; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }

            if (index === 9 && value === '유료입장객매출') {
              obj.attrs.rowSpan = 7;
              obj.attrs.style = 'font-weight: 700;';
            }
            
            for(let i = 10; i <= 15; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }

            if (index === 16 && value === '부대매출') {
              obj.attrs.rowSpan = 6;
              obj.attrs.style = 'font-weight: 700;';
            }
            
            for(let i = 17; i <= 21; i++ ) {
              if (index === i) {
                obj.attrs.colSpan = 0;
              }  
            }
            
            if (index === 22 && value === '임대매출') {
              obj.attrs.rowSpan = 2;
              obj.attrs.style = 'font-weight: 700;';
            }

            if (index === 23) {
              obj.attrs.colSpan = 0;
            }

            if(value === '합계') {
              obj.attrs.colSpan = 2;
              // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700';
              obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
              this.totalIndex = index;
            }

            return obj;
          },
        },
        {
          title: '3',
          colSpan: 0,
          className: 'column-center',
          // dataIndex: 'itemTypeDivision',
          dataIndex: 'Item',
          width: '6%',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: value,
              attrs: {},
            };

            if (value === '소계') {
              obj.attrs.style = 'background-color: #eeeeee; font-weight: 800;';
              this.subTotalIndex = index;
            }

            if(value === '합계') {
              obj.attrs.colSpan = 0;
            }

            if(value === 'ㄴ 주간' || value === 'ㄴ 야간') {
              obj.attrs.style = 'color: #757575 !important; padding-left: 26px !important;';
            }

            return obj;
          },
        },
      ]
    },
    {
      title: '목표',
      scopedSlots: { customRender: 'targetAddSlot' },
      children: [
        {
          title: '목표(월)',
          className: 'column-right',
          // dataIndex: 'targetMonth',
          dataIndex: 'TargetMonth',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              // children: Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)),
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
              obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
            }

            if(index === this.totalIndex) {
              obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
            }

            return obj;
          },
        },
        {
          title: '목표(년)',
          className: 'column-right',
          // dataIndex: 'targetYear',
          dataIndex: 'TargetYear',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
              obj.attrs.style = 'background-color: #eeeeee; font-weight: 700;';
            }

            if(index === this.totalIndex) {
              // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
              obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important; white-space: nowrap;';
            }

            return obj;
          },
        },
        {
          title: '누계(년)',
          className: 'column-right',
          // dataIndex: 'runningTotalYear',
          dataIndex: 'TargetTotal',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
      title: '금일 실적',
      className: 'column-right',
      // dataIndex: 'TodayPerformance',
      dataIndex: 'TodaySales',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
          attrs: {},
        };

        if(index === this.subTotalIndex) {
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
      title: '월누계',
      children: [
        {
          title: '전년',
          className: 'column-right',
          // dataIndex: 'rtmPreviousYear',
          dataIndex: 'MonthTotalPreviousYear',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '금년',
          className: 'column-right',
          // dataIndex: 'rtmThisYear',
          dataIndex: 'MonthTotalThisYear',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '증가율',
          className: 'column-right',
          // dataIndex: 'rtmRateIncrease',
          dataIndex: 'MonthTotalRateIncrease',
          width: '75px',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ? value + '%' : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '목표대비',
          className: 'column-right',
          // dataIndex: 'rtmContrastTarget',
          dataIndex: 'MonthTotalAgainstTarget',
          width: '89px',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ? value + '%' : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
      title: '년누계',
      children: [
        {
          title: '전년',
          className: 'column-right',
          // dataIndex: 'rtyPreviousYear',
          dataIndex: 'YearTotalPreviousYear',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '금년',
          className: 'column-right',
          // dataIndex: 'rtyThisYear',
          dataIndex: 'YearTotalThisYear',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ?  Number(value) > 999999999 ?  priceFormatter(Number(value) / 10000) + '(만)'  : priceFormatter(Number(value)) : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '증가율',
          className: 'column-right',
          // dataIndex: 'rtyRateIncrease',
          dataIndex: 'YearTotalRateIncrease',
          width: '75px',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ? value + '%' : '',
              attrs: {},
            };

            if(index === this.subTotalIndex) {
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
          title: '목표대비',
          className: 'column-right',
          // dataIndex: 'rtyContrastTarget',
          dataIndex: 'YearTotalAgainstTarget',
          width: '89px',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: index !== 0 && index !== 9 ? value + '%' : '',
              attrs: {},
            };

            obj.attrs.style = 'border-right: 0;';

            if(index === this.subTotalIndex) {
              obj.attrs.style = 'background-color: #eeeeee; font-weight: 700; border-right: 0;';
            }

            if(index === this.totalIndex) {
              // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700; border-right: 0;';
              obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
            }

            return obj;
          },
        },
      ]
    },
  ];

  data:any[] = [];

  // data = [
  //   {
  //     totalTypeDivision:'총 입장객(명)',
  //     audienceTypeDivision:'유료입장객',
  //     itemTypeDivision:'단지',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(명)',
  //     audienceTypeDivision:'유료입장객',
  //     itemTypeDivision:'ㄴ 주간',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(명)',
  //     audienceTypeDivision:'유료입장객',
  //     itemTypeDivision:'ㄴ 야간',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'유료입장객',
  //     itemTypeDivision:'역사관',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'유료입장객',
  //     itemTypeDivision:'소계',

  //     targetMonth: '400,000',
  //     targetYear: '400,000',
  //     runningTotalYear: '4,000,000',

  //     TodayPerformance: '200,000',

  //     rtmPreviousYear: '2,000,000',
  //     rtmThisYear: '2,800,000',
  //     rtmRateIncrease: '48%',
  //     rtmContrastTarget: '20%',

  //     rtyPreviousYear: '2,000,000',
  //     rtyThisYear: '2,800,000',
  //     rtyRateIncrease: '48%',
  //     rtyContrastTarget: '20%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'무료입장객',
  //     itemTypeDivision:'단지',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'무료입장객',
  //     itemTypeDivision:'역사관',

  //     targetMonth: '100,000',
  //     targetYear: '100,000',
  //     runningTotalYear: '1,000,000',

  //     TodayPerformance: '50,000',

  //     rtmPreviousYear: '500,000',
  //     rtmThisYear: '700,000',
  //     rtmRateIncrease: '12%',
  //     rtmContrastTarget: '5%',

  //     rtyPreviousYear: '500,000',
  //     rtyThisYear: '700,000',
  //     rtyRateIncrease: '12%',
  //     rtyContrastTarget: '5%',
  //   },
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'무료입장객',
  //     itemTypeDivision:'소계',

  //     targetMonth: '200,000',
  //     targetYear: '200,000',
  //     runningTotalYear: '2,000,000',

  //     TodayPerformance: '100,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,400,000',
  //     rtmRateIncrease: '24%',
  //     rtmContrastTarget: '10%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,400,000',
  //     rtyRateIncrease: '24%',
  //     rtyContrastTarget: '10%',
  //   },
  //   // 합계
  //   {
  //     totalTypeDivision:'총 입장객(5,000명)',
  //     audienceTypeDivision:'합계',
  //     itemTypeDivision:'합계',

  //     targetMonth: '600,000',
  //     targetYear: '600,000',
  //     runningTotalYear: '6,000,000',

  //     TodayPerformance: '300,000',

  //     rtmPreviousYear: '3,000,000',
  //     rtmThisYear: '4,200,000',
  //     rtmRateIncrease: '72%',
  //     rtmContrastTarget: '30%',

  //     rtyPreviousYear: '3,000,000',
  //     rtyThisYear: '4,200,000',
  //     rtyRateIncrease: '72%',
  //     rtyContrastTarget: '30%',
  //   },
  //   /// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'단지',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'ㄴ 주간',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'ㄴ 야간',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'평균단가',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'역사관',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'평균단가',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'유료입장객매출',
  //     itemTypeDivision:'소계',

  //     targetMonth: '12,000,000',
  //     targetYear: '720,000,000',
  //     runningTotalYear: '720,000,000',

  //     TodayPerformance: '10,200,000',

  //     rtmPreviousYear: '6,000,000',
  //     rtmThisYear: '9,000,000',
  //     rtmRateIncrease: '300%',
  //     rtmContrastTarget: '240%',

  //     rtyPreviousYear: '6,000,000',
  //     rtyThisYear: '9,000,000',
  //     rtyRateIncrease: '300%',
  //     rtyContrastTarget: '240%',
  //   },
  //   /// /////////////////////////////////////////////
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'사비로열차',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'대관/대여',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'임대관리비',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'상품',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'체험(기타)',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'부대매출',
  //     itemTypeDivision:'소계',

  //     targetMonth: '12,000,000',
  //     targetYear: '720,000,000',
  //     runningTotalYear: '720,000,000',

  //     TodayPerformance: '10,200,000',

  //     rtmPreviousYear: '6,000,000',
  //     rtmThisYear: '9,000,000',
  //     rtmRateIncrease: '300%',
  //     rtmContrastTarget: '240%',

  //     rtyPreviousYear: '6,000,000',
  //     rtyThisYear: '9,000,000',
  //     rtyRateIncrease: '300%',
  //     rtyContrastTarget: '240%',
  //   },
  //   /// ///////////////////////////////
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'임대매출',
  //     itemTypeDivision:'임대매출',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'임대매출',
  //     itemTypeDivision:'소계',

  //     targetMonth: '2,000,000',
  //     targetYear: '120,000,000',
  //     runningTotalYear: '120,000,000',

  //     TodayPerformance: '1,700,000',

  //     rtmPreviousYear: '1,000,000',
  //     rtmThisYear: '1,500,000',
  //     rtmRateIncrease: '50%',
  //     rtmContrastTarget: '40%',

  //     rtyPreviousYear: '1,000,000',
  //     rtyThisYear: '1,500,000',
  //     rtyRateIncrease: '50%',
  //     rtyContrastTarget: '40%',
  //   },
  //   /// ///////////////////////////////////
  //   {
  //     totalTypeDivision:'총 매출(원)',
  //     audienceTypeDivision:'합계',
  //     itemTypeDivision:'합계',

  //     targetMonth: '26,000,000',
  //     targetYear: '156,000,000',
  //     runningTotalYear: '156,000,000',

  //     TodayPerformance: '22,100,000',

  //     rtmPreviousYear: '13,000,000',
  //     rtmThisYear: '19,500,000',
  //     rtmRateIncrease: '650%',
  //     rtmContrastTarget: '520%',

  //     rtyPreviousYear: '13,000,000',
  //     rtyThisYear: '19,500,000',
  //     rtyRateIncrease: '650%',
  //     rtyContrastTarget: '520%',
  //   },
  // ];

  pagination = {
    pageSize: 25
  };

  priceFormatter = priceFormatter

  handleChange(value: any) {
    alert('selected value : ' + value);
    // console.log(`selected ${value}`);
  }

  // 연간목표 등록 페이지 이동
  targetAdd() {
    const arr = this.currentDate.split('-');

    this.$router.push({ path: '/flashReport/add', query: { getYear: arr[0] } });
    // this.$router.push({path: '/flashReport/add'});
  }

   dateChange(date: any, dateString: string) {
    // console.log(date, dateString);

    const arr = dateString.split('-');
    this.currentYear = arr[0];
    this.currentDate = dateString;
  }

  async getFlashreport() {
    try {
      const respones = await this.$axios.get(this.Url + '/flashreport', {
        params: {
          targetDate: this.currentDate
        }
      });

      if(respones !== null && respones.data !== null) {
        // console.log(respones.data);

        // for(let i = 0; i < respones.data.length; i++) {
        //   if(respones.data[i].Item === '단지') {
        //     respones.data[i].TargetMonth = '';
        //     respones.data[i].TargetYear = '';
        //     respones.data[i].TargetTotal = '';

        //     respones.data[i].TodaySales = '';

        //     respones.data[i].MonthTotalPreviousYear = '';
        //     respones.data[i].MonthTotalThisYear = '';
        //     respones.data[i].MonthTotalRateIncrease = '';
        //     respones.data[i].MonthTotalAgainstTarget = '';

        //     respones.data[i].YearTotalPreviousYear = '';
        //     respones.data[i].YearTotalThisYear = '';
        //     respones.data[i].YearTotalRateIncrease = '';
        //     respones.data[i].YearTotalAgainstTarget = '';
        //   }
        // }

        this.data = respones.data;
      } else {
        alert('영업속보 데이터 조회 실패');
      }
    } catch(e) {
      console.log('영업속보 데이터 조회 실패 : ' + e);
      alert('영업속보 데이터 조회 실패');
    }
  }

  // 검색
  async search() {
    await this.getFlashreport();
  }

  async onLoad() {
    // 영업속보 검색
    await this.search();
  }

  created() {
    this.selectYear = this.$route.query.selectYear;

    const date = new Date();
    this.toDay = date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();

    if(this.selectYear !== undefined) {
      this.currentYear = this.selectYear;
      this.toDay = this.currentYear + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
      this.currentDate =  this.toDay;
    } else {
      this.currentYear = date.getFullYear().toString();
      this.currentDate =  this.toDay;
    } 
  }

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
th {
  word-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  text-align: center !important;
  background-color: #f5f5f5 !important;
}

td {
  color:black !important;
  word-wrap: break-word !important;
  padding: 6px !important;
}

td.column-right {
  text-align: right !important;
}

td.column-center {
  text-align: center !important;
}

.content {
  height: 100vh;
}

#flashReport .ant-table-pagination.ant-pagination {
  display: none;
}
</style>
