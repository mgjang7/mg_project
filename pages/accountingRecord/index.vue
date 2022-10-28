<template>
  <div class="w-full flex justify-center content overflow-scroll">
    <div class="container-box">
      <!-- 경리일보 - Main -->
      <div class="w-full mb-16">
        <p class="main-title font-notosans">경리일보</p>
      </div>
      <div class="w-full flex justify-between items-center mb-8">
        <div class="flex items-center gap-x-2">
          <div class="flex gap-x-2">
            <a-date-picker placeholder="시작일" @change="onChange" />
            <span> - </span>
            <a-date-picker placeholder="종료일" @change="onChange" />
          </div>
          <button class="search-btn">
            조회
          </button>
        </div>
        <div class="">
          <button class="excel-down-btn">
            엑셀 다운로드
          </button>
        </div>
      </div>

      <div class="mb-1 flex justify-start items-center gap-x-2">
        <!-- <span class="px-2 py-[2px] border border-blue-500 bg-blue-500 rounded text-white">
          1
        </span> -->
        <p class="text-lg font-bold font-notosans text-black">
          매출별 현황
        </p>
      </div>
      <!-- 매출별 현황 테이블 -->
      <div id="accountingRecordTable" class="w-full mb-5">
        <a-table :columns="columns" :data-source="viewDatas" bordered :pagination="pagination" class="font-notosans">
        
        </a-table>
      </div>

      <div class="mb-1 flex justify-start items-center gap-x-2">
        <!-- <span class="px-2 py-[2px] border border-blue-500 bg-blue-500 rounded text-white">
          2
        </span> -->
        <p class="text-lg font-bold text-black">
          결제수단별 현황
        </p>
      </div>
      <!-- 결제수단별 현황 테이블 -->
      <!-- :scroll="{ x: 1504 }" -->
      <div id="accountingRecordTable2" class="w-full mb-5">
        <a-table 
          :columns="columns2" 
          :data-source="viewDatas2" 
          bordered 
          :pagination="pagination" 
          :scroll="{ x: 1280 }"
          class="font-notosans"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';

@Component({ layout: 'navMenu' })
export default class SalesPaymentMethod extends Vue {
  // 구분(입장료) 항목 개수
  admissionFeeCount = 0;
  // 구분(부대시설) 항목 개수
  amenitiesCount = 0;  
  // 구분(카드) 항목 개수
  cardCount = 0;
  // 구분(기타외상) 항목 개수
  etcCount = 0;  

  pagination = {
    pageSize: 20
  };

  // 매출별 현황 합계 Row Index
  totalRowIndex = 0;
  // 결제수단별 현황 합계 Row Index
  totalRowIndex2 = 0;

  // 매출별 현황 columns
  columns = [
    {
      title: '구분',
      dataIndex: 'division',
      className: 'column-label',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          // attrs: {},
          attrs: {},
        };

        // 매출별 현황 - 입장료 merge
        if (index === 0) {
          obj.attrs.rowSpan = this.calcAdmissionFeeCount + 1;
        }

        const admissionFeeCount = this.calcAdmissionFeeCount;

        for(let i = 0; i < admissionFeeCount; i++) {
          if(index === (i + 1) && value === '입장료') {
            obj.attrs.colSpan = 0;
          }
        }

        if(value === '입장료') {
          obj.attrs.style = 'font-weight: 700;';
        }
        
        // 매출별 현황 - 부대시설 merge
        const nextIndex = this.calcAdmissionFeeCount + 1;
        if (index === nextIndex) {
          obj.attrs.rowSpan = this.calcAmenitiesCount + 1;
        }

        const amenitiesCount = this.calcAmenitiesCount + 1;

        for(let i = (this.calcAdmissionFeeCount + 2); i <= (amenitiesCount + 2); i++) {
          if(index === i && value === '부대시설') {
            obj.attrs.colSpan = 0;
          }  
        }

        if(value === '부대시설') {
          obj.attrs.style = 'font-weight: 700;';
        }

        // 합계 컬럼 merge
        if(value === '합계') {
          obj.attrs.colSpan = 2;
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';

          this.totalRowIndex = index;
        }

        return obj;
      },
    },
    {
      title: '항목',
      dataIndex: 'item',
      className: 'column-label',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 입장료 소계 Row 색상
        const subTotalRowIndex = this.calcAdmissionFeeCount;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 부대시설 소계 Row 색상
        const subTotalRowIndex2 = this.calcAdmissionFeeCount + this.calcAmenitiesCount + 1;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 컬럼 merge
        if(value === '합계') {
          obj.attrs.colSpan = 0;
          obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
        }

        return obj;
      },
    },
    {
      title: '공급가',
      dataIndex: 'supplyPrice',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 입장료 소계 Row 색상
        const subTotalRowIndex = this.calcAdmissionFeeCount;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 부대시설 소계 Row 색상
        const subTotalRowIndex2 = this.calcAdmissionFeeCount + this.calcAmenitiesCount + 1;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
    {
      title: '부가세',
      dataIndex: 'vat',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 입장료 소계 Row 색상
        const subTotalRowIndex = this.calcAdmissionFeeCount;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 부대시설 소계 Row 색상
        const subTotalRowIndex2 = this.calcAdmissionFeeCount + this.calcAmenitiesCount + 1;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
    {
      title: '합계',
      dataIndex: 'sumPrice',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        obj.attrs.style = 'border-right: 0;';

        // 입장료 소계 Row 색상
        const subTotalRowIndex = this.calcAdmissionFeeCount;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        }

        // 부대시설 소계 Row 색상
        const subTotalRowIndex2 = this.calcAdmissionFeeCount + this.calcAmenitiesCount + 1;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700; border-right: 0;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
  ];

  // 결제수단별 현황 columns
  columns2 = [
    {
      title: '구분',
      dataIndex: 'division',
      className: 'column-label',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 결제수단별 현황 - 현금 merge
        if (index === 0) {
          obj.attrs.rowSpan = 2;
        }

        if(index === 1 && value === '현금') {
          obj.attrs.colSpan = 0;
        }

        if(value === '현금') {
          obj.attrs.style = 'font-weight: 700;';
        }

        // 결제수단별 현황 - 카드 merge
        if (index === 2) {
          obj.attrs.rowSpan = this.calcCardCount + 1;
        }

        const cardCount = this.calcCardCount;

        for(let i = (cardCount - 1); i < (cardCount+3); i++) {
          if(index === i && value === '카드') {
            obj.attrs.colSpan = 0;
          }
        }

        if(value === '카드') {
          obj.attrs.style = 'font-weight: 700;';
        }

        // 결제수단별 현황 - 기타외상 merge
        const etcStartIndex = this.calcCardCount + 3;
        if (index === etcStartIndex) {
          obj.attrs.rowSpan = this.calcEtcCount + 1;
        }

        const mmm = etcStartIndex + this.calcEtcCount + 1;

        for(let i = (etcStartIndex + 1); i <= mmm; i++) {
          if(index === i && value === '기타외상') {
            obj.attrs.colSpan = 0;
          }
        }

        if(value === '기타외상') {
          obj.attrs.style = 'font-weight: 700;';
        }

        // 합계 컬럼 merge
        if(value === '합계') {
          obj.attrs.colSpan = 2;
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
          this.totalRowIndex2 = index;
        }

        return obj;
      },
    },
    {
      title: '항목',
      dataIndex: 'item',
      className: 'column-label',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 현금 소계 Row 색상
        if (index === 1) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 카드 소계 Row 색상
        const subTotalRowIndex = this.calcCardCount + 2;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 기타외상 소계 Row 색상
        const subTotalRowIndex2 = this.calcCardCount + this.calcEtcCount + 3;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 컬럼 merge
        if(value === '합계') {
          obj.attrs.colSpan = 0;
          obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
        }

        return obj;
      },
    },
    {
      title: '공급가',
      dataIndex: 'supplyPrice',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 현금 소계 Row 색상
        if (index === 1) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 카드 소계 Row 색상
        const subTotalRowIndex = this.calcCardCount + 2;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 기타외상 소계 Row 색상
        const subTotalRowIndex2 = this.calcCardCount + this.calcEtcCount + 3;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex2 && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
    {
      title: '부가세',
      dataIndex: 'vat',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        // 현금 소계 Row 색상
        if (index === 1) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 카드 소계 Row 색상
        const subTotalRowIndex = this.calcCardCount + 2;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 기타외상 소계 Row 색상
        const subTotalRowIndex2 = this.calcCardCount + this.calcEtcCount + 3;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex2 && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
    {
      title: '합계',
      dataIndex: 'sumPrice',
      className: 'column-money',
      width: '20%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        obj.attrs.style = 'border-right: 0;';

        // 현금 소계 Row 색상
        if (index === 1) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        }

        // 카드 소계 Row 색상
        const subTotalRowIndex = this.calcCardCount + 2;
        if (index === subTotalRowIndex) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        }

        // 기타외상 소계 Row 색상
        const subTotalRowIndex2 = this.calcCardCount + this.calcEtcCount + 3;
        if (index === subTotalRowIndex2) {
          // obj.attrs.style = 'background-color: #D1D5DB;';
          obj.attrs.style = 'background-color: #f5f5f5; font-weight: 700; border-right: 0;';
        }

        // 합계 Row 색상
        if(index === this.totalRowIndex2 && index > 0) {
          // obj.attrs.style = 'background-color: #e0e0e0; font-weight: 700; border-right: 0;';
          obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
        }

        return obj;
      },
    },
  ];
  
  // 매출별 현황 datas
  tableDatas = [
    {
      division: '입장료',
      item: '단지 입장료',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '입장료',
      item: '역사관 입장료',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '부대시설',
      item: '사비로열차',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '부대시설',
      item: '대관/대여료',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '부대시설',
      item: '임대료',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '부대시설',
      item: '관리비',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '부대시설',
      item: '상품',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 21000,
    },
    {
      division: '부대시설',
      item: '기타',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
  ];

  // 결제수단별 현황 datas
  tableDatas2 = [
    {
      division: '현금',
      item: '현금명세',
      supplyPrice: 20000,

      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '카드',
      item: '국민카드',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '카드',
      item: '농협카드',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '카드',
      item: '삼성카드',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '카드',
      item: '우리카드',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '기타외상',
      item: '버스PKG',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '기타외상',
      item: '투어패스',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '기타외상',
      item: '야놀자',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '기타외상',
      item: '백제의고향',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    {
      division: '기타외상',
      item: '기타',
      supplyPrice: 20000,
      vat: 1000,
      sumPrice: 0,
    },
    
  ];

  // Binding Datas
  // 매출별
  viewDatas: {division: string, item:string, supplyPrice:string, vat:string, sumPrice:string}[] = [];
  // 결제수단별
  viewDatas2: {division: string, item:string, supplyPrice:string, vat:string, sumPrice:string}[] = [];

  // 공급가 + 부가세
  calcSumPrice() {
    // 매출별
    for(let i = 0; i < this.tableDatas.length; i++) {
      this.tableDatas[i].sumPrice = this.tableDatas[i].supplyPrice + this.tableDatas[i].vat;
    }

    // 결제수단별
    for(let i = 0; i < this.tableDatas2.length; i++) {
      this.tableDatas2[i].sumPrice = this.tableDatas2[i].supplyPrice + this.tableDatas2[i].vat;
    }
  }

  // 매출별 현황 테이블 데이터
  createTableDatas() {
    // 구분 group by
    let beforeDivision: string = '';
    const groups: string[] = [];

    beforeDivision = this.tableDatas[0].division;
    
    for(let i = 0; i < this.tableDatas.length; i++) {
      if(i === 0) {
        groups.push(beforeDivision);
      }

      if(this.tableDatas[i].division !== beforeDivision) {
        groups.push(this.tableDatas[i].division);
        beforeDivision = this.tableDatas[i].division;
      }
    }

    const subTotalPrices: {division: string, item:string, supplyPrice:number, vat:number, sumPrice:number}[] = [];

    for(let i = 0; i < groups.length; i++) {
      let supplyPriceSum = 0;
      let vatSum = 0;
      let sumPriceSum = 0;

      for(let j = 0; j < this.tableDatas.length; j++) {
        if(groups[i] === this.tableDatas[j].division) {
          supplyPriceSum += this.tableDatas[j].supplyPrice;
          vatSum += this.tableDatas[j].vat;
          sumPriceSum += this.tableDatas[j].sumPrice;
        }
      }

      const obj:any = {};
      
      obj.division = groups[i];
      obj.item = '소계';
      obj.supplyPrice = supplyPriceSum;
      obj.vat = vatSum;
      obj.sumPrice = sumPriceSum;

      subTotalPrices.push(obj);
    }

    const resultDatas: {division: string, item:string, supplyPrice:number, vat:number, sumPrice:number}[] = [];
    
    beforeDivision = '';

    beforeDivision = this.tableDatas[0].division;
    for(let i = 0; i < this.tableDatas.length; i++) {
      if(this.tableDatas[i].division === beforeDivision) {
        resultDatas.push(this.tableDatas[i]);
      } else {
        for(let j = 0; j < subTotalPrices.length; j++) {
          if(beforeDivision === subTotalPrices[j].division) {
            resultDatas.push(subTotalPrices[j]);
          }
        }

        resultDatas.push(this.tableDatas[i]);

        beforeDivision = this.tableDatas[i].division;
      }
    }

    for(let i = 0; i < subTotalPrices.length; i++) {
      if(beforeDivision === subTotalPrices[i].division) {
        resultDatas.push(subTotalPrices[i]);
      }
    }

    // 총 합계 row 생성
    let supplyPriceTotal:number = 0; // 공급가 총합
    let vatTotal:number = 0; // 부가세 총합
    let sumTotal:number = 0; // 합계 총합
    for(let i = 0; i < resultDatas.length; i++) {
      if(resultDatas[i].item === '소계') {
        supplyPriceTotal += resultDatas[i].supplyPrice;
        vatTotal += resultDatas[i].vat;
        sumTotal += resultDatas[i].sumPrice;
      }
    }

    const totalObj = { division:'', item:'', supplyPrice:0, vat:0, sumPrice:0 };

    totalObj.division = '합계';
    totalObj.item = '합계';
    totalObj.supplyPrice = supplyPriceTotal;
    totalObj.vat = vatTotal;
    totalObj.sumPrice = sumTotal;

    resultDatas.push(totalObj);
    
    // ant view data 생성
    for(let i = 0; i < resultDatas.length; i++) {
      const obj = {division: '', item:'', supplyPrice:'', vat:'', sumPrice:''};

      obj.division = resultDatas[i].division;
      obj.item = resultDatas[i].item;

      obj.supplyPrice = priceFormatter(resultDatas[i].supplyPrice);
      obj.vat = priceFormatter(resultDatas[i].vat);
      obj.sumPrice = priceFormatter(resultDatas[i].sumPrice);

      this.viewDatas.push(obj);
    }

    // console.log(' === [viewDatas] ===');
    // console.log(this.viewDatas);
  }

  // 결제수단별 현황 테이블 데이터
  createTableDatas2() {
    // 구분 group by
    let beforeDivision: string = '';
    const groups: string[] = [];

    beforeDivision = this.tableDatas2[0].division;
    
    for(let i = 0; i < this.tableDatas2.length; i++) {
      if(i === 0) {
        groups.push(beforeDivision);
      }

      if(this.tableDatas2[i].division !== beforeDivision) {
        groups.push(this.tableDatas2[i].division);
        beforeDivision = this.tableDatas2[i].division;
      }
    }

    const subTotalPrices: {division: string, item:string, supplyPrice:number, vat:number, sumPrice:number}[] = [];

    for(let i = 0; i < groups.length; i++) {
      let supplyPriceSum = 0;
      let vatSum = 0;
      let sumPriceSum = 0;

      for(let j = 0; j < this.tableDatas2.length; j++) {
        if(groups[i] === this.tableDatas2[j].division) {
          supplyPriceSum += this.tableDatas2[j].supplyPrice;
          vatSum += this.tableDatas2[j].vat;
          sumPriceSum += this.tableDatas2[j].sumPrice;
        }
      }

      const obj:any = {};
      
      obj.division = groups[i];
      obj.item = '소계';
      obj.supplyPrice = supplyPriceSum;
      obj.vat = vatSum;
      obj.sumPrice = sumPriceSum;

      subTotalPrices.push(obj);
    }

    const resultDatas: {division: string, item:string, supplyPrice:number, vat:number, sumPrice:number}[] = [];
    
    beforeDivision = '';

    beforeDivision = this.tableDatas2[0].division;
    for(let i = 0; i < this.tableDatas2.length; i++) {
      if(this.tableDatas2[i].division === beforeDivision) {
        resultDatas.push(this.tableDatas2[i]);
      } else {
        for(let j = 0; j < subTotalPrices.length; j++) {
          if(beforeDivision === subTotalPrices[j].division) {
            resultDatas.push(subTotalPrices[j]);
          }
        }

        resultDatas.push(this.tableDatas2[i]);

        beforeDivision = this.tableDatas2[i].division;
      }
    }

    for(let i = 0; i < subTotalPrices.length; i++) {
      if(beforeDivision === subTotalPrices[i].division) {
        resultDatas.push(subTotalPrices[i]);
      }
    }

    // 총 합계 row 생성
    let supplyPriceTotal:number = 0; // 공급가 총합
    let vatTotal:number = 0; // 부가세 총합
    let sumTotal:number = 0; // 합계 총합
    for(let i = 0; i < resultDatas.length; i++) {
      if(resultDatas[i].item === '소계') {
        supplyPriceTotal += resultDatas[i].supplyPrice;
        vatTotal += resultDatas[i].vat;
        sumTotal += resultDatas[i].sumPrice;
      }
    }

    const totalObj = { division:'', item:'', supplyPrice:0, vat:0, sumPrice:0 };

    totalObj.division = '합계';
    totalObj.item = '합계';
    totalObj.supplyPrice = supplyPriceTotal;
    totalObj.vat = vatTotal;
    totalObj.sumPrice = sumTotal;

    resultDatas.push(totalObj);
    
    // ant view data 생성
    for(let i = 0; i < resultDatas.length; i++) {
      const obj = {division: '', item:'', supplyPrice:'', vat:'', sumPrice:''};

      obj.division = resultDatas[i].division;
      obj.item = resultDatas[i].item;

      obj.supplyPrice = priceFormatter(resultDatas[i].supplyPrice);
      obj.vat = priceFormatter(resultDatas[i].vat);
      obj.sumPrice = priceFormatter(resultDatas[i].sumPrice);

      this.viewDatas2.push(obj);
    }
  }

  // 매출별 현황 - 입장료 항목 수
  get calcAdmissionFeeCount() {
    this.admissionFeeCount = 0;

    for(let i = 0; i < this.tableDatas.length; i++) {
      if(this.tableDatas[i].division === '입장료') {
        this.admissionFeeCount++;
      }
    }

    return this.admissionFeeCount;
  }

  // 매출별 현황 - 부대시설 항목 수
  get calcAmenitiesCount() {
    this.amenitiesCount = 0;

    for(let i = 0; i < this.tableDatas.length; i++) {
      if(this.tableDatas[i].division === '부대시설') {
        this.amenitiesCount++;
      }
    }

    return this.amenitiesCount;
  }

  // 결제수단별 현황 - 카드 항목 수
  get calcCardCount() {
    this.cardCount = 0;

    for(let i = 0; i < this.tableDatas2.length; i++) {
      if(this.tableDatas2[i].division === '카드') {
        this.cardCount++;
      }
    }

    return this.cardCount;
  }

  // 결제수단별 현황 - 기타외상 항목 수
  get calcEtcCount() {
    this.etcCount = 0;

    for(let i = 0; i < this.tableDatas2.length; i++) {
      if(this.tableDatas2[i].division === '기타외상') {
        this.etcCount++;
      }
    }

    return this.etcCount;
  }

  // 매출별 현황 합계 Row Index
  // get getTotalRowIndex() {

  // }

  // 결제수단별 현황 합계 Row Index
  // get getTotalRowIndex2() {

  // }

 
  created() {
    this.calcSumPrice();
    this.createTableDatas();
    this.createTableDatas2();
  }

  priceFormatter = priceFormatter

   onChange(date: any, dateString: string) {
    console.log(date, dateString);
  }
}
</script>

<style>
th {
  word-wrap: break-word !important;
  font-weight: 800 !important;
  text-align: center !important;
  background-color: #f5f5f5 !important;
}

td.column-money {
  text-align: right !important;
}

td.column-label {
  text-align: center !important;
}

td {
  color:black !important;
  word-wrap: break-word !important;
  padding: 6px !important;
}

.content {
  height: 100vh;
}

#accountingRecordTable .ant-table-pagination.ant-pagination {
  display: none;
}

#accountingRecordTable2 .ant-table-pagination.ant-pagination {
  display: none;
}

/* table {
  border-left: 0 !important;
}
.ant-table-thead > tr:first-child > th:last-child {
  border-right: 0 !important;
}

.ant-table-row-cell-last {
  border-right: 0 !important;
} */
</style>
