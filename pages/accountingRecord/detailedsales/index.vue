<template>
  <div class="w-full flex justify-center">
    <div class="container-box">
      <!-- 경리일보 - 상세 매출 구분 -->
      <div class="w-full mb-16">
        <p class="main-title">경리 일보</p>
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
      <!-- 테이블1 -->
      <div class="w-full border border-gray-400 rounded-sm overflow-hidden">
        <table class="w-full">
          <colgroup>
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
          </colgroup>
          <thead class="bg-gray-300">
            <tr class="text-center font-bold text-black border-b border-gray-400">
              <th class="border-r border-gray-400 py-2">구분</th>
              <th class="border-r border-gray-400 py-2">항목</th>
              <th class="border-r border-gray-400 py-2">공급가</th>
              <th class="border-r border-gray-400 py-2">부가세</th>
              <th class="border-r border-gray-400 py-2">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in viewDatas" :key="index" class="border-b border-gray-400">
              <td class="text-center border-r border-gray-400 py-2">{{item.division}}</td>
              <td :class="[item.item === '소계' ? 'bg-gray-300' : '',  'text-center', 'border-r', 'border-gray-400', 'py-2' ]">{{item.item}}</td>
              <td :class="[item.item === '소계' ? 'bg-gray-300' : '',  'text-right', 'border-r', 'border-gray-400', 'py-2' ]">{{ priceFormatter(item.supplyPrice) }} </td>
              <td :class="[item.item === '소계' ? 'bg-gray-300' : '',  'text-right', 'border-r', 'border-gray-400', 'py-2' ]">{{ priceFormatter(item.vat) }}</td>
              <td :class="[item.item === '소계' ? 'bg-gray-300' : '',  'text-right', 'border-r', 'border-gray-400', 'py-2' ]">{{ priceFormatter(item.sumPrice) }}</td>
            </tr>
            <tr>
              <td colspan="5" class="text-center border-gray-400 bg-gray-400 py-2">
                합계 : {{ priceFormatter(totalPrice) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';

@Component({ layout: 'navMenu' })
export default class SalesPaymentMethod extends Vue {
  
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

  viewDatas: {division: string, item:string, supplyPrice:number, vat:number, sumPrice:number}[] = [];

  calcSumPrice() {
    for(let i = 0; i < this.tableDatas.length; i++) {
      this.tableDatas[i].sumPrice = this.tableDatas[i].supplyPrice + this.tableDatas[i].vat;
    }
  }

  // 1. 구분 group by
  // 2. for(구분 group by) { for(this.tableDatas) { 소계 row data 생성 } }
  calcSubtotalPrice() {
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

    /// ////
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

    this.viewDatas = resultDatas;
  }

 
  created() {
    this.calcSumPrice();
    this.calcSubtotalPrice();
  }

  // mounted() {
  //   this.calcSumPrice();
  //   this.calcSubtotalPrice();
  // }

  priceFormatter = priceFormatter

  get totalPrice() {
    let totalPrice = 0;
    for(let i = 0; i < this.tableDatas.length; i++) {
      totalPrice += this.tableDatas[i].sumPrice;
    }

    return totalPrice;
  }

   onChange(date: any, dateString: string) {
    console.log(date, dateString);
  }
}
</script>
