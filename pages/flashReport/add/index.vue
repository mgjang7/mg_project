<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="w-full flex justify-center content overflow-scroll">
    <div class="container-box">
      <!-- 영업 속보 - 연간목표 등록 -->
      <div class="w-full mb-16">
        <p class="main-title font-notosans">연간목표 등록</p>
      </div> 
      <div class="w-full flex justify-between items-center mb-8">
        <div class="flex items-center gap-x-2">
          <p class="text-2xl text-black font-bold">
            {{ selectYear }}년
          </p>
        </div>
        <div class="flex items-center gap-x-2">
          <button class="list-btn" @click="goFlashreport">
            목록
          </button>
          <button class="add-btn" @click="onSave">
            저장
          </button>
        </div>
      </div>
      <!-- 테이블 -->
      <div id=flashReportAdd class="w-full mb-5">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="pagination"
          :scroll="{ x: 1280 }"
          class="font-notosans text-black"
        >
          <template v-for="item in addTargetSlotItems" :slot="item" slot-scope="text, record">
            <div
              v-if="record.rowIdx == '1' || record.rowIdx == '2' || record.rowIdx == '3' 
              || record.rowIdx == '5' || record.rowIdx == '6' || record.rowIdx == '10'
              || record.rowIdx == '11' || record.rowIdx == '13' || record.rowIdx == '16' || record.rowIdx == '17' || record.rowIdx == '18'
              || record.rowIdx == '19' || record.rowIdx == '20' || record.rowIdx == '22'"  
              class=""
            >
              <!-- <a-input v-if="item === '1'" :id="record.key + '-' + item" v-model="month1datas[record.key]" :value="month1datas[record.key]" class="w-full h-7 text-right" @change="inputChange" /> -->
              <a-input v-if="item === '1'" v-model="month1datas[record.rowIdx]" :value="month1datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '2'" v-model="month2datas[record.rowIdx]" :value="month2datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '3'" v-model="month3datas[record.rowIdx]" :value="month3datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '4'" v-model="month4datas[record.rowIdx]" :value="month4datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '5'" v-model="month5datas[record.rowIdx]" :value="month5datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '6'" v-model="month6datas[record.rowIdx]" :value="month6datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '7'" v-model="month7datas[record.rowIdx]" :value="month7datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '8'" v-model="month8datas[record.rowIdx]" :value="month8datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '9'" v-model="month9datas[record.rowIdx]" :value="month9datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '10'" v-model="month10datas[record.rowIdx]" :value="month10datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '11'" v-model="month11datas[record.rowIdx]" :value="month11datas[record.rowIdx]" class="w-full h-7 text-right" />
              <a-input v-if="item === '12'" v-model="month12datas[record.rowIdx]" :value="month12datas[record.rowIdx]" class="w-full h-7 text-right" />
            </div>
            <div
              v-else-if="record.rowIdx == '4'" 
              class="bg-[#eeeeee] absolute left-0 top-0 w-full h-full flex justify-end items-center">
                <!-- 유료입장객 - 단지,역사관 - 소계 -->
                <p v-if="item === '1'" class="">{{ month1PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month1PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month1PayComplexVisitorSum) }}</p>
                <p v-if="item === '2'" class="">{{ month2PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month2PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month2PayComplexVisitorSum) }}</p>
                <p v-if="item === '3'" class="">{{ month3PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month3PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month3PayComplexVisitorSum) }}</p>
                <p v-if="item === '4'" class="">{{ month4PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month4PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month4PayComplexVisitorSum) }}</p>
                <p v-if="item === '5'" class="">{{ month5PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month5PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month5PayComplexVisitorSum) }}</p>
                <p v-if="item === '6'" class="">{{ month6PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month6PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month6PayComplexVisitorSum) }}</p>
                <p v-if="item === '7'" class="">{{ month7PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month7PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month7PayComplexVisitorSum) }}</p>
                <p v-if="item === '8'" class="">{{ month8PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month8PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month8PayComplexVisitorSum) }}</p>
                <p v-if="item === '9'" class="">{{ month9PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month9PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month9PayComplexVisitorSum) }}</p>
                <p v-if="item === '10'" class="">{{ month10PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month10PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month10PayComplexVisitorSum) }}</p>
                <p v-if="item === '11'" class="">{{ month11PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month11PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month11PayComplexVisitorSum) }}</p>
                <p v-if="item === '12'" class="">{{ month12PayComplexVisitorSum > 999999999 ?  priceFormatter((Number(month12PayComplexVisitorSum) / 10000)) + '(만명)' : priceFormatter(month12PayComplexVisitorSum) }}</p>
            </div>
            <div
              v-else-if="record.rowIdx == '7'" 
              class="bg-[#eeeeee] absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 무료입장객 - 단지,역사관 - 소계 -->
              <p v-if="item === '1'" class="">{{ month1FreeVisitorSum > 999999999 ?  priceFormatter((Number(month1FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month1FreeVisitorSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2FreeVisitorSum > 999999999 ?  priceFormatter((Number(month2FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month2FreeVisitorSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3FreeVisitorSum > 999999999 ?  priceFormatter((Number(month3FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month3FreeVisitorSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4FreeVisitorSum > 999999999 ?  priceFormatter((Number(month4FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month4FreeVisitorSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5FreeVisitorSum > 999999999 ?  priceFormatter((Number(month5FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month5FreeVisitorSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6FreeVisitorSum > 999999999 ?  priceFormatter((Number(month6FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month6FreeVisitorSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7FreeVisitorSum > 999999999 ?  priceFormatter((Number(month7FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month7FreeVisitorSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8FreeVisitorSum > 999999999 ?  priceFormatter((Number(month8FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month8FreeVisitorSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9FreeVisitorSum > 999999999 ?  priceFormatter((Number(month9FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month9FreeVisitorSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10FreeVisitorSum > 999999999 ?  priceFormatter((Number(month10FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month10FreeVisitorSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11FreeVisitorSum > 999999999 ?  priceFormatter((Number(month11FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month11FreeVisitorSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12FreeVisitorSum > 999999999 ?  priceFormatter((Number(month12FreeVisitorSum) / 10000)) + '(만명)' : priceFormatter(month12FreeVisitorSum) }}</p>
              
            </div>
            <div
              v-else-if="record.rowIdx == '8'" 
              class="bg-[#616161] absolute left-0 top-0 w-full h-full flex justify-end items-center text-white">
              <!-- 입장객 - 합계 -->
              <p v-if="item === '1'" class="">{{ month1VisitorTotalSum > 999999999 ?  priceFormatter((Number(month1VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month1VisitorTotalSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2VisitorTotalSum > 999999999 ?  priceFormatter((Number(month2VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month2VisitorTotalSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3VisitorTotalSum > 999999999 ?  priceFormatter((Number(month3VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month3VisitorTotalSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4VisitorTotalSum > 999999999 ?  priceFormatter((Number(month4VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month4VisitorTotalSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5VisitorTotalSum > 999999999 ?  priceFormatter((Number(month5VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month5VisitorTotalSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6VisitorTotalSum > 999999999 ?  priceFormatter((Number(month6VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month6VisitorTotalSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7VisitorTotalSum > 999999999 ?  priceFormatter((Number(month7VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month7VisitorTotalSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8VisitorTotalSum > 999999999 ?  priceFormatter((Number(month8VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month8VisitorTotalSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9VisitorTotalSum > 999999999 ?  priceFormatter((Number(month9VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month9VisitorTotalSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10VisitorTotalSum > 999999999 ?  priceFormatter((Number(month10VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month10VisitorTotalSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11VisitorTotalSum > 999999999 ?  priceFormatter((Number(month11VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month11VisitorTotalSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12VisitorTotalSum > 999999999 ?  priceFormatter((Number(month12VisitorTotalSum) / 10000)) + '(만명)' : priceFormatter(month12VisitorTotalSum) }}</p>
              
            </div>
            <div
              v-else-if="record.rowIdx == '12'" 
              class="absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 유료입장객매출 - 단지 - 평균단가 -->
              <p v-if="item === '1'" class="">{{ month1PayComplexSalesAverage }}</p>
              <p v-if="item === '2'" class="">{{ month2PayComplexSalesAverage }}</p>
              <p v-if="item === '3'" class="">{{ month3PayComplexSalesAverage }}</p>
              <p v-if="item === '4'" class="">{{ month4PayComplexSalesAverage }}</p>
              <p v-if="item === '5'" class="">{{ month5PayComplexSalesAverage }}</p>
              <p v-if="item === '6'" class="">{{ month6PayComplexSalesAverage }}</p>
              <p v-if="item === '7'" class="">{{ month7PayComplexSalesAverage }}</p>
              <p v-if="item === '8'" class="">{{ month8PayComplexSalesAverage }}</p>
              <p v-if="item === '9'" class="">{{ month9PayComplexSalesAverage }}</p>
              <p v-if="item === '10'" class="">{{ month10PayComplexSalesAverage }}</p>
              <p v-if="item === '11'" class="">{{ month11PayComplexSalesAverage }}</p>
              <p v-if="item === '12'" class="">{{ month12PayComplexSalesAverage }}</p>
            </div>
            <div
              v-else-if="record.rowIdx == '14'" 
              class="absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 유료입장객매출 - 역사관 - 평균단가 -->
              <p v-if="item === '1'" class="">{{ month1PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '2'" class="">{{ month2PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '3'" class="">{{ month3PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '4'" class="">{{ month4PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '5'" class="">{{ month5PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '6'" class="">{{ month6PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '7'" class="">{{ month7PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '8'" class="">{{ month8PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '9'" class="">{{ month9PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '10'" class="">{{ month10PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '11'" class="">{{ month11PayHistoryhallSalesAverage }}</p>
              <p v-if="item === '12'" class="">{{ month12PayHistoryhallSalesAverage }}</p>
            </div>
            <div
              v-else-if="record.rowIdx == '15'" 
              class="bg-[#eeeeee] absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 유료입장객매출 - 소계 -->
              <p v-if="item === '1'" class="">{{ month1PaySalesSum > 999999999 ? priceFormatter((Number(month1PaySalesSum) / 10000)) + '(만)' : priceFormatter(month1PaySalesSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2PaySalesSum > 999999999 ? priceFormatter((Number(month2PaySalesSum) / 10000)) + '(만)' : priceFormatter(month2PaySalesSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3PaySalesSum > 999999999 ? priceFormatter((Number(month3PaySalesSum) / 10000)) + '(만)' : priceFormatter(month3PaySalesSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4PaySalesSum > 999999999 ? priceFormatter((Number(month4PaySalesSum) / 10000)) + '(만)' : priceFormatter(month4PaySalesSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5PaySalesSum > 999999999 ? priceFormatter((Number(month5PaySalesSum) / 10000)) + '(만)' : priceFormatter(month5PaySalesSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6PaySalesSum > 999999999 ? priceFormatter((Number(month6PaySalesSum) / 10000)) + '(만)' : priceFormatter(month6PaySalesSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7PaySalesSum > 999999999 ? priceFormatter((Number(month7PaySalesSum) / 10000)) + '(만)' : priceFormatter(month7PaySalesSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8PaySalesSum > 999999999 ? priceFormatter((Number(month8PaySalesSum) / 10000)) + '(만)' : priceFormatter(month8PaySalesSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9PaySalesSum > 999999999 ? priceFormatter((Number(month9PaySalesSum) / 10000)) + '(만)' : priceFormatter(month9PaySalesSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10PaySalesSum > 999999999 ? priceFormatter((Number(month10PaySalesSum) / 10000)) + '(만)' : priceFormatter(month10PaySalesSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11PaySalesSum > 999999999 ? priceFormatter((Number(month11PaySalesSum) / 10000)) + '(만)' : priceFormatter(month11PaySalesSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12PaySalesSum > 999999999 ? priceFormatter((Number(month12PaySalesSum) / 10000)) + '(만)' : priceFormatter(month12PaySalesSum) }}</p>
            </div>
            <div
              v-else-if="record.rowIdx == '21'" 
              class="bg-[#eeeeee] absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 부대매출 - 소계 -->
              <p v-if="item === '1'" class="">{{ month1IncidentalSalesSum > 999999999 ? priceFormatter((Number(month1IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month1IncidentalSalesSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2IncidentalSalesSum > 999999999 ? priceFormatter((Number(month2IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month2IncidentalSalesSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3IncidentalSalesSum > 999999999 ? priceFormatter((Number(month3IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month3IncidentalSalesSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4IncidentalSalesSum > 999999999 ? priceFormatter((Number(month4IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month4IncidentalSalesSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5IncidentalSalesSum > 999999999 ? priceFormatter((Number(month5IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month5IncidentalSalesSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6IncidentalSalesSum > 999999999 ? priceFormatter((Number(month6IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month6IncidentalSalesSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7IncidentalSalesSum > 999999999 ? priceFormatter((Number(month7IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month7IncidentalSalesSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8IncidentalSalesSum > 999999999 ? priceFormatter((Number(month8IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month8IncidentalSalesSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9IncidentalSalesSum > 999999999 ? priceFormatter((Number(month9IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month9IncidentalSalesSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10IncidentalSalesSum > 999999999 ? priceFormatter((Number(month10IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month10IncidentalSalesSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11IncidentalSalesSum > 999999999 ? priceFormatter((Number(month11IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month11IncidentalSalesSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12IncidentalSalesSum > 999999999 ? priceFormatter((Number(month12IncidentalSalesSum) / 10000)) + '(만)' : priceFormatter(month12IncidentalSalesSum) }}</p>
              
            </div>

            <div
              v-else-if="record.rowIdx == '23'" 
              class="bg-[#eeeeee] absolute left-0 top-0 w-full h-full flex justify-end items-center">
              <!-- 임대매출 - 소계 -->
              <p v-if="item === '1'" class="">{{ month1RentalSalesSum > 999999999 ? priceFormatter((Number(month1RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month1RentalSalesSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2RentalSalesSum > 999999999 ? priceFormatter((Number(month2RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month2RentalSalesSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3RentalSalesSum > 999999999 ? priceFormatter((Number(month3RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month3RentalSalesSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4RentalSalesSum > 999999999 ? priceFormatter((Number(month4RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month4RentalSalesSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5RentalSalesSum > 999999999 ? priceFormatter((Number(month5RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month5RentalSalesSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6RentalSalesSum > 999999999 ? priceFormatter((Number(month6RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month6RentalSalesSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7RentalSalesSum > 999999999 ? priceFormatter((Number(month7RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month7RentalSalesSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8RentalSalesSum > 999999999 ? priceFormatter((Number(month8RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month8RentalSalesSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9RentalSalesSum > 999999999 ? priceFormatter((Number(month9RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month9RentalSalesSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10RentalSalesSum > 999999999 ? priceFormatter((Number(month10RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month10RentalSalesSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11RentalSalesSum > 999999999 ? priceFormatter((Number(month11RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month11RentalSalesSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12RentalSalesSum > 999999999 ? priceFormatter((Number(month12RentalSalesSum) / 10000)) + '(만)' : priceFormatter(month12RentalSalesSum) }}</p>
            </div>
            <div
              v-else-if="record.rowIdx == '24'" 
              class="bg-[#616161] absolute left-0 top-0 w-full h-full flex justify-end items-center text-white">
              <!-- 총 매출 - 합계 -->
              <p v-if="item === '1'" class="">{{ month1SalesTotalSum > 999999999 ? priceFormatter((Number(month1SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month1SalesTotalSum) }}</p>
              <p v-if="item === '2'" class="">{{ month2SalesTotalSum > 999999999 ? priceFormatter((Number(month2SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month2SalesTotalSum) }}</p>
              <p v-if="item === '3'" class="">{{ month3SalesTotalSum > 999999999 ? priceFormatter((Number(month3SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month3SalesTotalSum) }}</p>
              <p v-if="item === '4'" class="">{{ month4SalesTotalSum > 999999999 ? priceFormatter((Number(month4SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month4SalesTotalSum) }}</p>
              <p v-if="item === '5'" class="">{{ month5SalesTotalSum > 999999999 ? priceFormatter((Number(month5SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month5SalesTotalSum) }}</p>
              <p v-if="item === '6'" class="">{{ month6SalesTotalSum > 999999999 ? priceFormatter((Number(month6SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month6SalesTotalSum) }}</p>
              <p v-if="item === '7'" class="">{{ month7SalesTotalSum > 999999999 ? priceFormatter((Number(month7SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month7SalesTotalSum) }}</p>
              <p v-if="item === '8'" class="">{{ month8SalesTotalSum > 999999999 ? priceFormatter((Number(month8SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month8SalesTotalSum) }}</p>
              <p v-if="item === '9'" class="">{{ month9SalesTotalSum > 999999999 ? priceFormatter((Number(month9SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month9SalesTotalSum) }}</p>
              <p v-if="item === '10'" class="">{{ month10SalesTotalSum > 999999999 ? priceFormatter((Number(month10SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month10SalesTotalSum) }}</p>
              <p v-if="item === '11'" class="">{{ month11SalesTotalSum > 999999999 ? priceFormatter((Number(month11SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month11SalesTotalSum) }}</p>
              <p v-if="item === '12'" class="">{{ month12SalesTotalSum > 999999999 ? priceFormatter((Number(month12SalesTotalSum) / 10000)) + '(만)' : priceFormatter(month12SalesTotalSum) }}</p>
            </div>
          </template>
          <!-- 월별 합계 -->
          <template slot="rowTotalSlot" slot-scope="text, record">
            <!-- 유료입장객 - 단지(주간) -->
            <div v-if="record.rowIdx === '1'"> 
              <p class="">
                {{ priceFormatter(Number(month1datas[1]) + Number(month2datas[1]) + Number(month3datas[1]) + Number(month4datas[1]) + Number(month5datas[1]) + Number(month6datas[1]) + 
                    Number(month7datas[1]) + Number(month8datas[1]) + Number(month9datas[1]) + Number(month10datas[1]) + Number(month11datas[1]) + Number(month12datas[1])) }}
              </p>
            </div>
            <!-- 유료입장객 - 단지(야간) -->
            <div v-else-if="record.rowIdx === '2'"> 
              <p class="">
                {{ priceFormatter(Number(month1datas[2]) + Number(month2datas[2]) + Number(month3datas[2]) + Number(month4datas[2]) + Number(month5datas[2]) + Number(month6datas[2]) + 
                  Number(month7datas[2]) + Number(month8datas[2]) + Number(month9datas[2]) + Number(month10datas[2]) + Number(month11datas[2]) + Number(month12datas[2])) }}
              </p>
            </div>
            <!-- 유료입장객 - 역사관 -->
            <div v-else-if="record.rowIdx === '3'"> 
              <p class="">
                {{ priceFormatter(Number(month1datas[3]) + Number(month2datas[3]) + Number(month3datas[3]) + Number(month4datas[3]) + Number(month5datas[3]) + Number(month6datas[3]) + 
                  Number(month7datas[3]) + Number(month8datas[3]) + Number(month9datas[3]) + Number(month10datas[3]) + Number(month11datas[3]) + Number(month12datas[3])) }}
              </p>
            </div>
            <!-- 유료입장객 - 단지, 역사관 - 소계 -->
            <div v-else-if="record.rowIdx === '4'" class="absolute top-0 left-0 bg-[#eeeeee] w-full h-full flex justify-end items-center"> 
              <p class="">
              {{ priceFormatter(Number(month1PayComplexVisitorSum) + Number(month2PayComplexVisitorSum) + Number(month3PayComplexVisitorSum) + Number(month4PayComplexVisitorSum) + Number(month5PayComplexVisitorSum) +
                Number(month6PayComplexVisitorSum) + Number(month7PayComplexVisitorSum) + Number(month8PayComplexVisitorSum) + Number(month9PayComplexVisitorSum) + Number(month10PayComplexVisitorSum) +
                Number(month11PayComplexVisitorSum) + Number(month12PayComplexVisitorSum)) }}
              </p>
            </div>
            <!-- 무료입장객 - 단지 -->
            <div v-else-if="record.rowIdx === '5'"> 
              <p class="">
                {{ priceFormatter(Number(month1datas[5]) + Number(month2datas[5]) + Number(month3datas[5]) + Number(month4datas[5]) + Number(month5datas[5]) + Number(month6datas[5]) + 
                  Number(month7datas[5]) + Number(month8datas[5]) + Number(month9datas[5]) + Number(month10datas[5]) + Number(month11datas[5]) + Number(month12datas[5])) }}
              </p>
            </div>
            <!-- 무료입장객 - 역사관 -->
            <div v-else-if="record.rowIdx === '6'"> 
              <p class="">
                {{ priceFormatter(Number(month1datas[6]) + Number(month2datas[6]) + Number(month3datas[6]) + Number(month4datas[6]) + Number(month5datas[6]) + Number(month6datas[6]) + 
                  Number(month7datas[6]) + Number(month8datas[6]) + Number(month9datas[6]) + Number(month10datas[6]) + Number(month11datas[6]) + Number(month12datas[6])) }}
              </p>
            </div>
            <!-- 무료입장객 - 단지, 역사관 - 소계 -->
            <div v-else-if="record.rowIdx === '7'" class="absolute top-0 left-0 bg-[#eeeeee] w-full h-full flex justify-end items-center"> 
              <p class="">
                {{ priceFormatter(Number(month1FreeVisitorSum) + Number(month2FreeVisitorSum) + Number(month3FreeVisitorSum) + Number(month4FreeVisitorSum) + Number(month5FreeVisitorSum) + Number(month6FreeVisitorSum) +
                  Number(month7FreeVisitorSum) + Number(month8FreeVisitorSum) + Number(month9FreeVisitorSum) + Number(month10FreeVisitorSum) + Number(month11FreeVisitorSum) + Number(month12FreeVisitorSum)) }}
              </p>
            </div>
            <!-- 총 입장객 - 합계 -->
            <div v-else-if="record.rowIdx === '8'" class="bg-[#616161] absolute left-0 top-0 w-full h-full flex justify-end items-center text-white"> 
              <p class="">
                {{ priceFormatter(Number(month1VisitorTotalSum) + Number(month2VisitorTotalSum) + Number(month3VisitorTotalSum) + Number(month4VisitorTotalSum) + Number(month5VisitorTotalSum) + Number(month6VisitorTotalSum) +
                  Number(month7VisitorTotalSum) + Number(month8VisitorTotalSum) + Number(month9VisitorTotalSum) + Number(month10VisitorTotalSum) + Number(month11VisitorTotalSum) + Number(month12VisitorTotalSum)) }}
              </p>
            </div>
            <!-- 유료입장객매출 - 단지(주간) -->
            <div v-if="record.rowIdx === '10'"> 
              <p class="" style="white-space:nowrap;">
                {{ payComplexDaySalesTotal }}
              </p>
            </div>
            <!-- 유료입장객매출 - 단지(야간) -->
            <div v-if="record.rowIdx === '11'"> 
              <p class="" style="white-space:nowrap;">
                {{ payComplexNightSalesTotal }}
              </p>
            </div>
            <!-- 유료입장객매출 - 단지- 평균단가 -->
            <div v-if="record.rowIdx === '12'"> 
              <p class="" style="white-space:nowrap;">
                {{ Number(month1PayComplexSalesAverage) + Number(month2PayComplexSalesAverage) + Number(month3PayComplexSalesAverage) + Number(month4PayComplexSalesAverage) + Number(month5PayComplexSalesAverage) +
                  Number(month6PayComplexSalesAverage) + Number(month7PayComplexSalesAverage) + Number(month8PayComplexSalesAverage) + Number(month9PayComplexSalesAverage) + Number(month10PayComplexSalesAverage)
                  + Number(month11PayComplexSalesAverage) + Number(month12PayComplexSalesAverage) }}
              </p>
            </div>
            <!-- 유료입장객매출 - 역사관 -->
            <div v-if="record.rowIdx === '13'"> 
              <p class="" style="white-space:nowrap;">
                {{ payHistoryhallSalesTotal }}
              </p>
            </div>
            <!-- 유료입장객매출 - 역사관- 평균단가 -->
            <div v-if="record.rowIdx === '14'"> 
              <p class="" style="white-space:nowrap;">
                {{ Number(month1PayHistoryhallSalesAverage) + Number(month2PayHistoryhallSalesAverage) + Number(month3PayHistoryhallSalesAverage) + Number(month4PayHistoryhallSalesAverage) + Number(month5PayHistoryhallSalesAverage) +
                  Number(month6PayHistoryhallSalesAverage) + Number(month7PayHistoryhallSalesAverage) + Number(month8PayHistoryhallSalesAverage) + Number(month9PayHistoryhallSalesAverage) + Number(month10PayHistoryhallSalesAverage)
                  + Number(month11PayHistoryhallSalesAverage) + Number(month12PayHistoryhallSalesAverage) }}
              </p>
            </div>
            <!-- 유료입장객매출 - 소계 -->
            <div v-else-if="record.rowIdx === '15'" class="absolute top-0 left-0 bg-[#eeeeee] w-full h-full flex justify-end items-center"> 
              <p class="" style="white-space:nowrap;">
                {{ paySalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 사비로열차 -->
            <div v-if="record.rowIdx === '16'"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalSabiroSalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 대관/대여 -->
            <div v-if="record.rowIdx === '17'"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalRentalSalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 임대관리비 -->
            <div v-if="record.rowIdx === '18'"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalRmeSalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 상품 -->
            <div v-if="record.rowIdx === '19'"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalGoodsSalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 기타(체험) -->
            <div v-if="record.rowIdx === '20'"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalExperienceSalesTotal }}
              </p>
            </div>
            <!-- 부대매출 - 소계 -->
            <div v-else-if="record.rowIdx === '21'" class="absolute top-0 left-0 bg-[#eeeeee] w-full h-full flex justify-end items-center"> 
              <p class="" style="white-space:nowrap;">
                {{ incidentalSalesTotal }}
              </p>
            </div>
            <!-- 임대매출 , 소계 -->
            <div v-if="record.rowIdx === '22' || record.rowIdx === '23'"> 
              <p class="" style="white-space:nowrap;">
                {{ rentalSalesTotal }}
              </p>
            </div>
            <!-- 총 매출 - 합계 -->
            <div v-else-if="record.rowIdx === '24'" class="bg-[#616161] absolute left-0 top-0 w-full h-full flex justify-end items-center text-white"> 
              <p class="" style="white-space:nowrap;">
                {{ salesAllTotal }}
              </p>
            </div>
          </template>
        </a-table>
      </div>      
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';

@Component({ layout: 'navMenu' })
export default class FlashReportAdd extends Vue {
  priceFormatter = priceFormatter
 
  // 유료입장객 - 단지 - 소계
  month1PayComplexVisitorSum = 0;
  month2PayComplexVisitorSum = 0;
  month3PayComplexVisitorSum = 0;
  month4PayComplexVisitorSum = 0;
  month5PayComplexVisitorSum = 0;
  month6PayComplexVisitorSum = 0;
  month7PayComplexVisitorSum = 0;
  month8PayComplexVisitorSum = 0;
  month9PayComplexVisitorSum = 0;
  month10PayComplexVisitorSum = 0;
  month11PayComplexVisitorSum = 0;
  month12PayComplexVisitorSum = 0;

  // 무료입장객 - 단지,역사관 - 소계
  month1FreeVisitorSum = 0;
  month2FreeVisitorSum = 0;
  month3FreeVisitorSum = 0;
  month4FreeVisitorSum = 0;
  month5FreeVisitorSum = 0;
  month6FreeVisitorSum = 0;
  month7FreeVisitorSum = 0;
  month8FreeVisitorSum = 0;
  month9FreeVisitorSum = 0;
  month10FreeVisitorSum = 0;
  month11FreeVisitorSum = 0;
  month12FreeVisitorSum = 0;
  
  // 입장객 - 합계
  month1VisitorTotalSum = 0;
  month2VisitorTotalSum = 0;
  month3VisitorTotalSum = 0;
  month4VisitorTotalSum = 0;
  month5VisitorTotalSum = 0;
  month6VisitorTotalSum = 0;
  month7VisitorTotalSum = 0;
  month8VisitorTotalSum = 0;
  month9VisitorTotalSum = 0;
  month10VisitorTotalSum = 0;
  month11VisitorTotalSum = 0;
  month12VisitorTotalSum = 0;

  // 유료입장객매출 - 단지 - 평균단가
  month1PayComplexSalesAverage = '0';
  month2PayComplexSalesAverage = '0';
  month3PayComplexSalesAverage = '0';
  month4PayComplexSalesAverage = '0';
  month5PayComplexSalesAverage = '0';
  month6PayComplexSalesAverage = '0';
  month7PayComplexSalesAverage = '0';
  month8PayComplexSalesAverage = '0';
  month9PayComplexSalesAverage = '0';
  month10PayComplexSalesAverage = '0';
  month11PayComplexSalesAverage = '0';
  month12PayComplexSalesAverage = '0';

  // 유료입장객매출 - 역사관 - 평균단가
  month1PayHistoryhallSalesAverage = '0';
  month2PayHistoryhallSalesAverage = '0';
  month3PayHistoryhallSalesAverage = '0';
  month4PayHistoryhallSalesAverage = '0';
  month5PayHistoryhallSalesAverage = '0';
  month6PayHistoryhallSalesAverage = '0';
  month7PayHistoryhallSalesAverage = '0';
  month8PayHistoryhallSalesAverage = '0';
  month9PayHistoryhallSalesAverage = '0';
  month10PayHistoryhallSalesAverage = '0';
  month11PayHistoryhallSalesAverage = '0';
  month12PayHistoryhallSalesAverage = '0';

  // 유료입장객매출 - 소계
  month1PaySalesSum = 0;
  month2PaySalesSum = 0;
  month3PaySalesSum = 0;
  month4PaySalesSum = 0;
  month5PaySalesSum = 0;
  month6PaySalesSum = 0;
  month7PaySalesSum = 0;
  month8PaySalesSum = 0;
  month9PaySalesSum = 0;
  month10PaySalesSum = 0;
  month11PaySalesSum = 0;
  month12PaySalesSum = 0;

  // 부대매출 - 소계
  month1IncidentalSalesSum = 0;
  month2IncidentalSalesSum = 0;
  month3IncidentalSalesSum = 0;
  month4IncidentalSalesSum = 0;
  month5IncidentalSalesSum = 0;
  month6IncidentalSalesSum = 0;
  month7IncidentalSalesSum = 0;
  month8IncidentalSalesSum = 0;
  month9IncidentalSalesSum = 0;
  month10IncidentalSalesSum = 0;
  month11IncidentalSalesSum = 0;
  month12IncidentalSalesSum = 0;

  // 임대매출 - 소계
  month1RentalSalesSum = 0;
  month2RentalSalesSum = 0;
  month3RentalSalesSum = 0;
  month4RentalSalesSum = 0;
  month5RentalSalesSum = 0;
  month6RentalSalesSum = 0;
  month7RentalSalesSum = 0;
  month8RentalSalesSum = 0;
  month9RentalSalesSum = 0;
  month10RentalSalesSum = 0;
  month11RentalSalesSum = 0;
  month12RentalSalesSum = 0;

  // 총 매출 - 합계
  month1SalesTotalSum = 0;
  month2SalesTotalSum = 0;
  month3SalesTotalSum = 0;
  month4SalesTotalSum = 0;
  month5SalesTotalSum = 0;
  month6SalesTotalSum = 0;
  month7SalesTotalSum = 0;
  month8SalesTotalSum = 0;
  month9SalesTotalSum = 0;
  month10SalesTotalSum = 0;
  month11SalesTotalSum = 0;
  month12SalesTotalSum = 0;

  selectYear:any = '';
  totalIndex = -1;
  addTargetSlotItems:string[] = [];

  month1datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month2datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month3datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month4datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month5datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month6datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month7datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month8datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month9datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month10datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month11datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
  month12datas:{col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] = [];
 
  inputDatas:any[] = [];

  getDatas:any[] = [];

  // get visitorTotal() {
  //   return priceFormatter(Number(this.month1VisitorTotalSum) + Number(this.month2VisitorTotalSum) + Number(this.month3VisitorTotalSum) + Number(this.month4VisitorTotalSum) + 
  //     Number(this.month5VisitorTotalSum) + Number(this.month6VisitorTotalSum) + Number(this.month7VisitorTotalSum) + Number(this.month8VisitorTotalSum) + 
  //     Number(this.month9VisitorTotalSum) + Number(this.month10VisitorTotalSum) + Number(this.month11VisitorTotalSum) + Number(this.month12VisitorTotalSum));
  // }
  

  columns = [
    {
      title: '구분',
      rowSpan: 3,
      children: [
        {
          title: '1',
          colSpan: 0,
          className: 'column-center',
          // className: 'title-column-center',
          dataIndex: 'totalTypeDivision',
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
          // className: 'title-column-center',
          dataIndex: 'audienceTypeDivision',
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
          // className: 'title-column-center',
          dataIndex: 'itemTypeDivision',
          width: '6%',
          customRender: (value:string, row:any, index:number) => {
            const obj:{children: string, attrs: any} = {
              children: value,
              attrs: {},
            };

            if (value === '소계') {
              obj.attrs.style = 'background-color: #eeeeee; font-weight: 800;';
              // this.subTotalIndex = index;
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
      children: [
        {
          title: '1월',
          className: 'column-center',
          dataIndex: 'targetJanuary',
          // scopedSlots: { customRender: 'addTarget_1' },
          scopedSlots: { customRender: '1' },
        },
        {
          title: '2월',
          className: 'column-center',
          dataIndex: 'targetFebruary',
          // scopedSlots: { customRender: 'addTarget_2' },
          scopedSlots: { customRender: '2' },
        },
        {
          title: '3월',
          className: 'column-center',
          dataIndex: 'targetMarch',
          scopedSlots: { customRender: '3' },
        },
        {
          title: '4월',
          className: 'column-center',
          dataIndex: 'targetApril',
          scopedSlots: { customRender: '4' },
        },
        {
          title: '5월',
          className: 'column-center',
          dataIndex: 'targetMay',
          scopedSlots: { customRender: '5' },
        },
        {
          title: '6월',
          className: 'column-center',
          dataIndex: 'targetJune',
          scopedSlots: { customRender: '6' },
        },
        {
          title: '7월',
          className: 'column-center',
          dataIndex: 'targetJuly',
          scopedSlots: { customRender: '7' },
        },
        {
          title: '8월',
          className: 'column-center',
          dataIndex: 'targetAugust',
          scopedSlots: { customRender: '8' },
        },
        {
          title: '9월',
          className: 'column-center',
          dataIndex: 'targetSeptember',
          scopedSlots: { customRender: '9' },
        },
        {
          title: '10월',
          className: 'column-center',
          dataIndex: 'targetOctober',
          scopedSlots: { customRender: '10' },
        },
        {
          title: '11월',
          className: 'column-center',
          dataIndex: 'targetNovember',
          scopedSlots: { customRender: '11' },
        },
        {
          title: '12월',
          className: 'column-center',
          dataIndex: 'targetDecember',
          scopedSlots: { customRender: '12' },
        },
      ]
    },
    {
      title: '합계',
      dataIndex: 'total',
      className: 'column-right',
      width: '6%',
      // customRender: (value:string, row:any, index:number) => {
      //   const obj:{children: string, attrs: any} = {
      //     children: value,
      //     attrs: {},
      //   };

      //   if(index === this.totalIndex) {
      //     obj.attrs.style = 'background-color: #616161; font-weight: 700; color:white !important;';
      //   }

      //   return obj;
      // },
      scopedSlots: { customRender: 'rowTotalSlot' },
    }
  ];

  data = [
    {
      // key: '0',
      rowIdx: '0',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '유료입장객',
      itemTypeDivision: '단지',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '1',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '유료입장객',
      itemTypeDivision: 'ㄴ 주간',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '2',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '유료입장객',
      itemTypeDivision: 'ㄴ 야간',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '3',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '유료입장객',
      itemTypeDivision: '역사관',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '4',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '유료입장객',
      itemTypeDivision: '소계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '5',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '무료입장객',
      itemTypeDivision: '단지',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '6',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '무료입장객',
      itemTypeDivision: '역사관',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '7',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '무료입장객',
      itemTypeDivision: '소계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '8',
      totalTypeDivision: '총 입장객(명)',
      audienceTypeDivision: '합계',
      itemTypeDivision: '합계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '9',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: '단지',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '10',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: 'ㄴ 주간',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '11',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: 'ㄴ 야간',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '12',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: '평균단가',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '13',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: '역사관',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '14',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: '평균단가',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '15',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '유료입장객매출',
      itemTypeDivision: '소계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '16',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '사비로열차',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '17',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '대관/대여',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '18',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '임대관리비',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '19',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '상품',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '20',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '기타(체험)',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '21',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '부대매출',
      itemTypeDivision: '소계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '22',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '임대매출',
      itemTypeDivision: '임대매출',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '23',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '임대매출',
      itemTypeDivision: '소계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
    {
      rowIdx: '24',
      totalTypeDivision: '총 매출(원)',
      audienceTypeDivision: '합계',
      itemTypeDivision: '합계',
      targetJanuary: '',
      targetFebruary: '',
      targetMarch: '',
      targetApril: '',
      targetMay: '',
      targetJune: '',
      targetJuly: '',
      targetAugust: '',
      targetSeptember: '',
      targetOctober: '',
      targetNovember: '',
      targetDecember: '',
      total: ''
    },
  ];

  pagination = {
    pageSize: 25
  };

  @Watch('month1datas')
  onChangeMonth1datas() {
    // 1월 - 유료입장객 - 단지,역사관 - 소계
    this.month1PayComplexVisitorSum = Number(this.month1datas[1])  + Number(this.month1datas[2]) + Number(this.month1datas[3]);
    // 1월 - 무료입장객 - 단지,역사관 - 소계
    this.month1FreeVisitorSum = Number(this.month1datas[5]) + Number(this.month1datas[6]);
    // 1월 - 입장객 - 합계
    this.month1VisitorTotalSum = this.month1PayComplexVisitorSum + this.month1FreeVisitorSum;
    // 1월 - 유료입장객매출 - 소계
    this.month1PaySalesSum = Number(this.month1datas[10]) + Number(this.month1datas[11]) + Number(this.month1datas[13]);
    // 1월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month1PayComplexSalesAverageCalc = (Number(this.month1datas[10]) + Number(this.month1datas[11])) / (Number(this.month1datas[1]) + Number(this.month1datas[2]));
    this.month1PayComplexSalesAverage = isNaN(month1PayComplexSalesAverageCalc) ? '0.00' : month1PayComplexSalesAverageCalc.toFixed(2);
    // 1월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month1PayHistoryhallSalesAverageCalc = Number(this.month1datas[13]) / Number(this.month1datas[3]);
    this.month1PayHistoryhallSalesAverage = isNaN(month1PayHistoryhallSalesAverageCalc) ? '0.00' : month1PayHistoryhallSalesAverageCalc.toFixed(2);
    // 1월 - 부대매출 - 소계
    this.month1IncidentalSalesSum = Number(this.month1datas[16]) + Number(this.month1datas[17]) + Number(this.month1datas[18]) + Number(this.month1datas[19]) + Number(this.month1datas[20]);
    // 1월 - 임대매출 - 소계
    this.month1RentalSalesSum = Number(this.month1datas[22]); 
    // 1월 - 총 매출 - 합계
    this.month1SalesTotalSum = Number(this.month1PaySalesSum) + Number(this.month1IncidentalSalesSum) + Number(this.month1RentalSalesSum); 
  }

  @Watch('month2datas')
  onChangeMonth2datas() {
    // 2월 - 유료입장객 - 단지,역사관 - 소계
    this.month2PayComplexVisitorSum = Number(this.month2datas[1])  + Number(this.month2datas[2]) + Number(this.month2datas[3]);
    // 2월 - 무료입장객 - 단지,역사관 - 소계
    this.month2FreeVisitorSum = Number(this.month2datas[5]) + Number(this.month2datas[6]);
    // 2월 - 입장객 - 합계
    this.month2VisitorTotalSum = this.month2PayComplexVisitorSum + this.month2FreeVisitorSum;
    // 2월 - 유료입장객매출 - 소계
    this.month2PaySalesSum = Number(this.month2datas[10]) + Number(this.month2datas[11]) + Number(this.month2datas[13]);
    // 2월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month2PayComplexSalesAverageCalc = (Number(this.month2datas[10]) + Number(this.month2datas[11])) / (Number(this.month2datas[1]) + Number(this.month2datas[2]));
    this.month2PayComplexSalesAverage = isNaN(month2PayComplexSalesAverageCalc) ? '0.00' : month2PayComplexSalesAverageCalc.toFixed(2);
    // 2월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month2PayHistoryhallSalesAverageCalc = Number(this.month2datas[13]) / Number(this.month2datas[3]);
    this.month2PayHistoryhallSalesAverage = isNaN(month2PayHistoryhallSalesAverageCalc) ? '0.00' : month2PayHistoryhallSalesAverageCalc.toFixed(2);
    // 2월 - 부대매출 - 소계
    this.month2IncidentalSalesSum = Number(this.month2datas[16]) + Number(this.month2datas[17]) + Number(this.month2datas[18]) + Number(this.month2datas[19]) + Number(this.month2datas[20]);
    // 2월 - 임대매출 - 소계
    this.month2RentalSalesSum = Number(this.month2datas[22]);
    // 2월 - 총 매출 - 합계
    this.month2SalesTotalSum = Number(this.month2PaySalesSum) + Number(this.month2IncidentalSalesSum) + Number(this.month2RentalSalesSum);
  }

  @Watch('month3datas')
  onChangeMonth3datas() {
    // 3월 - 유료입장객 - 단지,역사관 - 소계
    this.month3PayComplexVisitorSum = Number(this.month3datas[1])  + Number(this.month3datas[2]) + Number(this.month3datas[3]);
    // 3월 - 무료입장객 - 단지,역사관 - 소계
    this.month3FreeVisitorSum = Number(this.month3datas[5]) + Number(this.month3datas[6]);
    // 3월 - 입장객 - 합계
    this.month3VisitorTotalSum = this.month3PayComplexVisitorSum + this.month3FreeVisitorSum;
    // 3월 - 유료입장객매출 - 소계
    this.month3PaySalesSum = Number(this.month3datas[10]) + Number(this.month3datas[11]) + Number(this.month3datas[13]);
     // 3월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month3PayComplexSalesAverageCalc = (Number(this.month3datas[10]) + Number(this.month3datas[11])) / (Number(this.month3datas[1]) + Number(this.month3datas[2]));
    this.month3PayComplexSalesAverage = isNaN(month3PayComplexSalesAverageCalc) ? '0.00' : month3PayComplexSalesAverageCalc.toFixed(2);
    // 3월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month3PayHistoryhallSalesAverageCalc = Number(this.month3datas[13]) / Number(this.month3datas[3]);
    this.month3PayHistoryhallSalesAverage = isNaN(month3PayHistoryhallSalesAverageCalc) ? '0.00' : month3PayHistoryhallSalesAverageCalc.toFixed(2);
    // 3월 - 부대매출 - 소계
    this.month3IncidentalSalesSum = Number(this.month3datas[16]) + Number(this.month3datas[17]) + Number(this.month3datas[18]) + Number(this.month3datas[19]) + Number(this.month3datas[20]);
    // 3월 - 임대매출 - 소계
    this.month3RentalSalesSum = Number(this.month3datas[22]);
    // 3월 - 총 매출 - 합계
    this.month3SalesTotalSum = Number(this.month3PaySalesSum) + Number(this.month3IncidentalSalesSum) + Number(this.month3RentalSalesSum); 
  }

  @Watch('month4datas')
  onChangeMonth4datas() {
    // 4월 - 유료입장객 - 단지,역사관 - 소계
    this.month4PayComplexVisitorSum = Number(this.month4datas[1])  + Number(this.month4datas[2]) + Number(this.month4datas[3]);
    // 4월 - 무료입장객 - 단지,역사관 - 소계
    this.month4FreeVisitorSum = Number(this.month4datas[5]) + Number(this.month4datas[6]);
    // 4월 - 입장객 - 합계
    this.month4VisitorTotalSum = this.month4PayComplexVisitorSum + this.month4FreeVisitorSum;
    // 4월 - 유료입장객매출 - 소계
    this.month4PaySalesSum = Number(this.month4datas[10]) + Number(this.month4datas[11]) + Number(this.month4datas[13]);
    // 4월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month4PayComplexSalesAverageCalc = (Number(this.month4datas[10]) + Number(this.month4datas[11])) / (Number(this.month4datas[1]) + Number(this.month4datas[2]));
    this.month4PayComplexSalesAverage = isNaN(month4PayComplexSalesAverageCalc) ? '0.00' : month4PayComplexSalesAverageCalc.toFixed(2);
    // 4월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month4PayHistoryhallSalesAverageCalc = Number(this.month4datas[13]) / Number(this.month4datas[3]);
    this.month4PayHistoryhallSalesAverage = isNaN(month4PayHistoryhallSalesAverageCalc) ? '0.00' : month4PayHistoryhallSalesAverageCalc.toFixed(2);
    // 4월 - 부대매출 - 소계
    this.month4IncidentalSalesSum = Number(this.month4datas[16]) + Number(this.month4datas[17]) + Number(this.month4datas[18]) + Number(this.month4datas[19]) + Number(this.month4datas[20]);
    // 4월 - 임대매출 - 소계
    this.month4RentalSalesSum = Number(this.month4datas[22]);
    // 4월 - 총 매출 - 합계
    this.month4SalesTotalSum = Number(this.month4PaySalesSum) + Number(this.month4IncidentalSalesSum) + Number(this.month4RentalSalesSum); 
  }

  @Watch('month5datas')
  onChangeMonth5datas() {
    // 5월 - 유료입장객 - 단지,역사관 - 소계
    this.month5PayComplexVisitorSum = Number(this.month5datas[1])  + Number(this.month5datas[2]) + Number(this.month5datas[3]);
    // 5월 - 무료입장객 - 단지,역사관 - 소계
    this.month5FreeVisitorSum = Number(this.month5datas[5]) + Number(this.month5datas[6]);
    // 5월 - 입장객 - 합계
    this.month5VisitorTotalSum = this.month5PayComplexVisitorSum + this.month5FreeVisitorSum;
    // 5월 - 유료입장객매출 - 소계
    this.month5PaySalesSum = Number(this.month5datas[10]) + Number(this.month5datas[11]) + Number(this.month5datas[13]);
    // 5월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month5PayComplexSalesAverageCalc = (Number(this.month5datas[10]) + Number(this.month5datas[11])) / (Number(this.month5datas[1]) + Number(this.month5datas[2]));
    this.month5PayComplexSalesAverage = isNaN(month5PayComplexSalesAverageCalc) ? '0.00' : month5PayComplexSalesAverageCalc.toFixed(2);
    // 5월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month5PayHistoryhallSalesAverageCalc = Number(this.month5datas[13]) / Number(this.month5datas[3]);
    this.month5PayHistoryhallSalesAverage = isNaN(month5PayHistoryhallSalesAverageCalc) ? '0.00' : month5PayHistoryhallSalesAverageCalc.toFixed(2);
    // 5월 - 부대매출 - 소계
    this.month5IncidentalSalesSum = Number(this.month5datas[16]) + Number(this.month5datas[17]) + Number(this.month5datas[18]) + Number(this.month5datas[19]) + Number(this.month5datas[20]);
    // 5월 - 임대매출 - 소계
    this.month5RentalSalesSum = Number(this.month5datas[22]);
    // 5월 - 총 매출 - 합계
    this.month5SalesTotalSum = Number(this.month5PaySalesSum) + Number(this.month5IncidentalSalesSum) + Number(this.month5RentalSalesSum); 
  }

  @Watch('month6datas')
  onChangeMonth6datas() {
    // 6월 - 유료입장객 - 단지,역사관 - 소계
    this.month6PayComplexVisitorSum = Number(this.month6datas[1])  + Number(this.month6datas[2]) + Number(this.month6datas[3]);
    // 6월 - 무료입장객 - 단지,역사관 - 소계
    this.month6FreeVisitorSum = Number(this.month6datas[5]) + Number(this.month6datas[6]);
    // 6월 - 입장객 - 합계
    this.month6VisitorTotalSum = this.month6PayComplexVisitorSum + this.month6FreeVisitorSum;
    // 6월 - 유료입장객매출 - 소계
    this.month6PaySalesSum = Number(this.month6datas[10]) + Number(this.month6datas[11]) + Number(this.month6datas[13]);
    // 6월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month6PayComplexSalesAverageCalc = (Number(this.month6datas[10]) + Number(this.month6datas[11])) / (Number(this.month6datas[1]) + Number(this.month6datas[2]));
    this.month6PayComplexSalesAverage = isNaN(month6PayComplexSalesAverageCalc) ? '0.00' : month6PayComplexSalesAverageCalc.toFixed(2);
    // 6월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month6PayHistoryhallSalesAverageCalc = Number(this.month6datas[13]) / Number(this.month6datas[3]);
    this.month6PayHistoryhallSalesAverage = isNaN(month6PayHistoryhallSalesAverageCalc) ? '0.00' : month6PayHistoryhallSalesAverageCalc.toFixed(2);
    // 6월 - 부대매출 - 소계
    this.month6IncidentalSalesSum = Number(this.month6datas[16]) + Number(this.month6datas[17]) + Number(this.month6datas[18]) + Number(this.month6datas[19]) + Number(this.month6datas[20]);
    // 6월 - 임대매출 - 소계
    this.month6RentalSalesSum = Number(this.month6datas[22]);
    // 6월 - 총 매출 - 합계
    this.month6SalesTotalSum = Number(this.month6PaySalesSum) + Number(this.month6IncidentalSalesSum) + Number(this.month6RentalSalesSum); 
  }

  @Watch('month7datas')
  onChangeMonth7datas() {
    // 7월 - 유료입장객 - 단지,역사관 - 소계
    this.month7PayComplexVisitorSum = Number(this.month7datas[1])  + Number(this.month7datas[2]) + Number(this.month7datas[3]);
    // 7월 - 무료입장객 - 단지,역사관 - 소계
    this.month7FreeVisitorSum = Number(this.month7datas[5]) + Number(this.month7datas[6]);
    // 7월 - 입장객 - 합계
    this.month7VisitorTotalSum = this.month7PayComplexVisitorSum + this.month7FreeVisitorSum;
    // 7월 - 유료입장객매출 - 소계
    this.month7PaySalesSum = Number(this.month7datas[10]) + Number(this.month7datas[11]) + Number(this.month7datas[13]);
    // 7월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month7PayComplexSalesAverageCalc = (Number(this.month7datas[10]) + Number(this.month7datas[11])) / (Number(this.month7datas[1]) + Number(this.month7datas[2]));
    this.month7PayComplexSalesAverage = isNaN(month7PayComplexSalesAverageCalc) ? '0.00' : month7PayComplexSalesAverageCalc.toFixed(2);
    // 7월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month7PayHistoryhallSalesAverageCalc = Number(this.month7datas[13]) / Number(this.month7datas[3]);
    this.month7PayHistoryhallSalesAverage = isNaN(month7PayHistoryhallSalesAverageCalc) ? '0.00' : month7PayHistoryhallSalesAverageCalc.toFixed(2);
    // 7월 - 부대매출 - 소계
    this.month7IncidentalSalesSum = Number(this.month7datas[16]) + Number(this.month7datas[17]) + Number(this.month7datas[18]) + Number(this.month7datas[19]) + Number(this.month7datas[20]);
    // 7월 - 임대매출 - 소계
    this.month7RentalSalesSum = Number(this.month7datas[22]);
    // 7월 - 총 매출 - 합계
    this.month7SalesTotalSum = Number(this.month7PaySalesSum) + Number(this.month7IncidentalSalesSum) + Number(this.month7RentalSalesSum); 
  }

  @Watch('month8datas')
  onChangeMonth8datas() {
    // 8월 - 유료입장객 - 단지,역사관 - 소계
    this.month8PayComplexVisitorSum = Number(this.month8datas[1])  + Number(this.month8datas[2]) + Number(this.month8datas[3]);
    // 8월 - 무료입장객 - 단지,역사관 - 소계
    this.month8FreeVisitorSum = Number(this.month8datas[5]) + Number(this.month8datas[6]);
    // 8월 - 입장객 - 합계
    this.month8VisitorTotalSum = this.month8PayComplexVisitorSum + this.month8FreeVisitorSum;
    // 8월 - 유료입장객매출 - 소계
    this.month8PaySalesSum = Number(this.month8datas[10]) + Number(this.month8datas[11]) + Number(this.month8datas[13]);
    // 8월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month8PayComplexSalesAverageCalc = (Number(this.month8datas[10]) + Number(this.month8datas[11])) / (Number(this.month8datas[1]) + Number(this.month8datas[2]));
    this.month8PayComplexSalesAverage = isNaN(month8PayComplexSalesAverageCalc) ? '0.00' : month8PayComplexSalesAverageCalc.toFixed(2);
    // 8월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month8PayHistoryhallSalesAverageCalc = Number(this.month8datas[13]) / Number(this.month8datas[3]);
    this.month8PayHistoryhallSalesAverage = isNaN(month8PayHistoryhallSalesAverageCalc) ? '0.00' : month8PayHistoryhallSalesAverageCalc.toFixed(2);
    // 8월 - 부대매출 - 소계
    this.month8IncidentalSalesSum = Number(this.month8datas[16]) + Number(this.month8datas[17]) + Number(this.month8datas[18]) + Number(this.month8datas[19]) + Number(this.month8datas[20]);
    // 8월 - 임대매출 - 소계
    this.month8RentalSalesSum = Number(this.month8datas[22]);
    // 8월 - 총 매출 - 합계
    this.month8SalesTotalSum = Number(this.month8PaySalesSum) + Number(this.month8IncidentalSalesSum) + Number(this.month8RentalSalesSum); 
  }

  @Watch('month9datas')
  onChangeMonth9datas() {
    // 9월 - 유료입장객 - 단지,역사관 - 소계
    this.month9PayComplexVisitorSum = Number(this.month9datas[1])  + Number(this.month9datas[2]) + Number(this.month9datas[3]);
    // 9월 - 무료입장객 - 단지,역사관 - 소계
    this.month9FreeVisitorSum = Number(this.month9datas[5]) + Number(this.month9datas[6]);
    // 9월 - 입장객 - 합계
    this.month9VisitorTotalSum = this.month9PayComplexVisitorSum + this.month9FreeVisitorSum;
    // 9월 - 유료입장객매출 - 소계
    this.month9PaySalesSum = Number(this.month9datas[10]) + Number(this.month9datas[11]) + Number(this.month9datas[13]);
    // 9월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month9PayComplexSalesAverageCalc = (Number(this.month9datas[10]) + Number(this.month9datas[11])) / (Number(this.month9datas[1]) + Number(this.month9datas[2]));
    this.month9PayComplexSalesAverage = isNaN(month9PayComplexSalesAverageCalc) ? '0.00' : month9PayComplexSalesAverageCalc.toFixed(2);
    // 9월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month9PayHistoryhallSalesAverageCalc = Number(this.month9datas[13]) / Number(this.month9datas[3]);
    this.month9PayHistoryhallSalesAverage = isNaN(month9PayHistoryhallSalesAverageCalc) ? '0.00' : month9PayHistoryhallSalesAverageCalc.toFixed(2);
    // 9월 - 부대매출 - 소계
    this.month9IncidentalSalesSum = Number(this.month9datas[16]) + Number(this.month9datas[17]) + Number(this.month9datas[18]) + Number(this.month9datas[19]) + Number(this.month9datas[20]);
    // 9월 - 임대매출 - 소계
    this.month9RentalSalesSum = Number(this.month9datas[22]);
    // 9월 - 총 매출 - 합계
    this.month9SalesTotalSum = Number(this.month9PaySalesSum) + Number(this.month9IncidentalSalesSum) + Number(this.month9RentalSalesSum); 
  }

  @Watch('month10datas')
  onChangeMonth10datas() {
    // 10월 - 유료입장객 - 단지,역사관 - 소계
    this.month10PayComplexVisitorSum = Number(this.month10datas[1])  + Number(this.month10datas[2]) + Number(this.month10datas[3]);
    // 10월 - 무료입장객 - 단지,역사관 - 소계
    this.month10FreeVisitorSum = Number(this.month10datas[5]) + Number(this.month10datas[6]);
    // 10월 - 입장객 - 합계
    this.month10VisitorTotalSum = this.month10PayComplexVisitorSum + this.month10FreeVisitorSum;
    // 10월 - 유료입장객매출 - 소계
    this.month10PaySalesSum = Number(this.month10datas[10]) + Number(this.month10datas[11]) + Number(this.month10datas[13]);
    // 10월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month10PayComplexSalesAverageCalc = (Number(this.month10datas[10]) + Number(this.month10datas[11])) / (Number(this.month10datas[1]) + Number(this.month10datas[2]));
    this.month10PayComplexSalesAverage = isNaN(month10PayComplexSalesAverageCalc) ? '0.00' : month10PayComplexSalesAverageCalc.toFixed(2);
    // 10월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month10PayHistoryhallSalesAverageCalc = Number(this.month10datas[13]) / Number(this.month10datas[3]);
    this.month10PayHistoryhallSalesAverage = isNaN(month10PayHistoryhallSalesAverageCalc) ? '0.00' : month10PayHistoryhallSalesAverageCalc.toFixed(2);
    // 10월 - 부대매출 - 소계
    this.month10IncidentalSalesSum = Number(this.month10datas[16]) + Number(this.month10datas[17]) + Number(this.month10datas[18]) + Number(this.month10datas[19]) + Number(this.month10datas[20]);
    // 10월 - 임대매출 - 소계
    this.month10RentalSalesSum = Number(this.month10datas[22]);
    // 10월 - 총 매출 - 합계
    this.month10SalesTotalSum = Number(this.month10PaySalesSum) + Number(this.month10IncidentalSalesSum) + Number(this.month10RentalSalesSum); 
  }

  @Watch('month11datas')
  onChangeMonth11datas() {
    // 11월 - 유료입장객 - 단지,역사관 - 소계
    this.month11PayComplexVisitorSum = Number(this.month11datas[1])  + Number(this.month11datas[2]) + Number(this.month11datas[3]);
    // 11월 - 무료입장객 - 단지,역사관 - 소계
    this.month11FreeVisitorSum = Number(this.month11datas[5]) + Number(this.month11datas[6]);
    // 11월 - 입장객 - 합계
    this.month11VisitorTotalSum = this.month11PayComplexVisitorSum + this.month11FreeVisitorSum;
    // 11월 - 유료입장객매출 - 소계
    this.month11PaySalesSum = Number(this.month11datas[10]) + Number(this.month11datas[11]) + Number(this.month11datas[13]);
    // 11월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month11PayComplexSalesAverageCalc = (Number(this.month11datas[10]) + Number(this.month11datas[11])) / (Number(this.month11datas[1]) + Number(this.month11datas[2]));
    this.month11PayComplexSalesAverage = isNaN(month11PayComplexSalesAverageCalc) ? '0.00' : month11PayComplexSalesAverageCalc.toFixed(2);
    // 11월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month11PayHistoryhallSalesAverageCalc = Number(this.month11datas[13]) / Number(this.month11datas[3]);
    this.month11PayHistoryhallSalesAverage = isNaN(month11PayHistoryhallSalesAverageCalc) ? '0.00' : month11PayHistoryhallSalesAverageCalc.toFixed(2);
    // 11월 - 부대매출 - 소계
    this.month11IncidentalSalesSum = Number(this.month11datas[16]) + Number(this.month11datas[17]) + Number(this.month11datas[18]) + Number(this.month11datas[19]) + Number(this.month11datas[20]);
    // 11월 - 임대매출 - 소계
    this.month11RentalSalesSum = Number(this.month11datas[22]);
    // 11월 - 총 매출 - 합계
    this.month11SalesTotalSum = Number(this.month11PaySalesSum) + Number(this.month11IncidentalSalesSum) + Number(this.month11RentalSalesSum); 
  }

  @Watch('month12datas')
  onChangeMonth12datas() {
    // 12월 - 유료입장객 - 단지,역사관 - 소계
    this.month12PayComplexVisitorSum = Number(this.month12datas[1])  + Number(this.month12datas[2]) + Number(this.month12datas[3]);
    // 12월 - 무료입장객 - 단지,역사관 - 소계
    this.month12FreeVisitorSum = Number(this.month12datas[5]) + Number(this.month12datas[6]);
    // 12월 - 입장객 - 합계
    this.month12VisitorTotalSum = this.month12PayComplexVisitorSum + this.month12FreeVisitorSum;
    // 12월 - 유료입장객매출 - 소계
    this.month12PaySalesSum = Number(this.month12datas[10]) + Number(this.month12datas[11]) + Number(this.month12datas[13]);
    // 12월 - 유료입장객매출 - 단지 - 평균단가 (매출금 / 입장객수)
    const month12PayComplexSalesAverageCalc = (Number(this.month12datas[10]) + Number(this.month12datas[11])) / (Number(this.month12datas[1]) + Number(this.month12datas[2]));
    this.month12PayComplexSalesAverage = isNaN(month12PayComplexSalesAverageCalc) ? '0.00' : month12PayComplexSalesAverageCalc.toFixed(2);
    // 12월 - 유료입장객매출 - 역사관 - 평균단가 (매출금 / 입장객수)
    const month12PayHistoryhallSalesAverageCalc = Number(this.month12datas[13]) / Number(this.month12datas[3]);
    this.month12PayHistoryhallSalesAverage = isNaN(month12PayHistoryhallSalesAverageCalc) ? '0.00' : month12PayHistoryhallSalesAverageCalc.toFixed(2);
    // 12월 - 부대매출 - 소계
    this.month12IncidentalSalesSum = Number(this.month12datas[16]) + Number(this.month12datas[17]) + Number(this.month12datas[18]) + Number(this.month12datas[19]) + Number(this.month12datas[20]);
    // 12월 - 임대매출 - 소계
    this.month12RentalSalesSum = Number(this.month12datas[22]);
    // 12월 - 총 매출 - 합계
    this.month12SalesTotalSum = Number(this.month12PaySalesSum) + Number(this.month12IncidentalSalesSum) + Number(this.month12RentalSalesSum); 
  }

  // 유료입장객매출 - 단지 - 주간 총합
  get payComplexDaySalesTotal() {
    const total:number = Number(this.month1datas[10]) + Number(this.month2datas[10]) + Number(this.month3datas[10]) + Number(this.month4datas[10]) + Number(this.month5datas[10]) +
      Number(this.month6datas[10]) + Number(this.month7datas[10]) + Number(this.month8datas[10]) + Number(this.month9datas[10]) + Number(this.month10datas[10]) + 
      Number(this.month11datas[10]) + Number(this.month12datas[10]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 유료입장객매출 - 단지- 야간 총합
  get payComplexNightSalesTotal() {
    const total:number = Number(this.month1datas[11]) + Number(this.month2datas[11]) + Number(this.month3datas[11]) + Number(this.month4datas[11]) + Number(this.month5datas[11]) +
      Number(this.month6datas[11]) + Number(this.month7datas[11]) + Number(this.month8datas[11]) + Number(this.month9datas[11]) + Number(this.month10datas[11]) + 
      Number(this.month11datas[11]) + Number(this.month12datas[11]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 유료입장객매출 - 역사관 총합
  get payHistoryhallSalesTotal() {
    const total:number = Number(this.month1datas[13]) + Number(this.month2datas[13]) + Number(this.month3datas[13]) + Number(this.month4datas[13]) + Number(this.month5datas[13]) +
      Number(this.month6datas[13]) + Number(this.month7datas[13]) + Number(this.month8datas[13]) + Number(this.month9datas[13]) + Number(this.month10datas[13]) + 
      Number(this.month11datas[13]) + Number(this.month12datas[13]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 유료입장객매출 - 소계 총합
  get paySalesTotal() {
    const total:number = Number(this.month1PaySalesSum) + Number(this.month2PaySalesSum) + Number(this.month3PaySalesSum) + Number(this.month4PaySalesSum) + Number(this.month5PaySalesSum) +
      Number(this.month6PaySalesSum) + Number(this.month7PaySalesSum) + Number(this.month8PaySalesSum) + Number(this.month9PaySalesSum) + Number(this.month10PaySalesSum) + 
      Number(this.month11PaySalesSum) + Number(this.month12PaySalesSum);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 부대매출 - 사비로열차 총합
  get incidentalSabiroSalesTotal() {
    const total:number = Number(this.month1datas[16]) + Number(this.month2datas[16]) + Number(this.month3datas[16]) + Number(this.month4datas[16]) + Number(this.month5datas[16]) +
      Number(this.month6datas[16]) + Number(this.month7datas[16]) + Number(this.month8datas[16]) + Number(this.month9datas[16]) + Number(this.month10datas[16]) + 
      Number(this.month11datas[16]) + Number(this.month12datas[16]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 부대매출 - 대관/대여 총합
  get incidentalRentalSalesTotal() {
    const total:number = Number(this.month1datas[17]) + Number(this.month2datas[17]) + Number(this.month3datas[17]) + Number(this.month4datas[17]) + Number(this.month5datas[17]) +
      Number(this.month6datas[17]) + Number(this.month7datas[17]) + Number(this.month8datas[17]) + Number(this.month9datas[17]) + Number(this.month10datas[17]) + 
      Number(this.month11datas[17]) + Number(this.month12datas[17]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 부대매출 - 임대관리비 총합
  get incidentalRmeSalesTotal() {
    const total:number = Number(this.month1datas[18]) + Number(this.month2datas[18]) + Number(this.month3datas[18]) + Number(this.month4datas[18]) + Number(this.month5datas[18]) +
      Number(this.month6datas[18]) + Number(this.month7datas[18]) + Number(this.month8datas[18]) + Number(this.month9datas[18]) + Number(this.month10datas[18]) + 
      Number(this.month11datas[18]) + Number(this.month12datas[18]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }
  
  // 부대매출 - 상품 총합
  get incidentalGoodsSalesTotal() {
    const total:number = Number(this.month1datas[19]) + Number(this.month2datas[19]) + Number(this.month3datas[19]) + Number(this.month4datas[19]) + Number(this.month5datas[19]) +
      Number(this.month6datas[19]) + Number(this.month7datas[19]) + Number(this.month8datas[19]) + Number(this.month9datas[19]) + Number(this.month10datas[19]) + 
      Number(this.month11datas[19]) + Number(this.month12datas[19]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 부대매출 - 기타(체험) 총합
  get incidentalExperienceSalesTotal() {
    const total:number = Number(this.month1datas[20]) + Number(this.month2datas[20]) + Number(this.month3datas[20]) + Number(this.month4datas[20]) + Number(this.month5datas[20]) +
      Number(this.month6datas[20]) + Number(this.month7datas[20]) + Number(this.month8datas[20]) + Number(this.month9datas[20]) + Number(this.month10datas[20]) + 
      Number(this.month11datas[20]) + Number(this.month12datas[20]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 부대매출 - 소계 총합
  get incidentalSalesTotal() {
    const total:number = Number(this.month1IncidentalSalesSum) + Number(this.month2IncidentalSalesSum) + Number(this.month3IncidentalSalesSum) + Number(this.month4IncidentalSalesSum) + 
      Number(this.month5IncidentalSalesSum) + Number(this.month6IncidentalSalesSum) + Number(this.month7IncidentalSalesSum) + Number(this.month8IncidentalSalesSum) + 
      Number(this.month9IncidentalSalesSum) + Number(this.month10IncidentalSalesSum) + Number(this.month11IncidentalSalesSum) + Number(this.month12IncidentalSalesSum);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 임대매출 - 소계 총합
  get rentalSalesTotal() {
    const total:number = Number(this.month1datas[22]) + Number(this.month2datas[22]) + Number(this.month3datas[22]) + Number(this.month4datas[22]) + Number(this.month5datas[22]) +
      Number(this.month6datas[22]) + Number(this.month7datas[22]) + Number(this.month8datas[22]) + Number(this.month9datas[22]) + Number(this.month10datas[22]) + 
      Number(this.month11datas[22]) + Number(this.month12datas[22]);

      return total > 999999999 ? priceFormatter(total / 10000) + '(만)' : priceFormatter(total); 
  }

  // 총 매출 - 합계
  get salesAllTotal() {
    const total:number = this.month1SalesTotalSum + this.month2SalesTotalSum + this.month3SalesTotalSum + this.month4SalesTotalSum + this.month5SalesTotalSum +
      this.month6SalesTotalSum + this.month7SalesTotalSum + this.month8SalesTotalSum + this.month9SalesTotalSum + this.month10SalesTotalSum + this.month11SalesTotalSum +
      this.month12SalesTotalSum;

     return total > 999999999 ? priceFormatter(total / 10000)  + '(만)' : priceFormatter(total); 
  }

  // 영업 속보 조회 페이지 이동
  goFlashreport() {
    this.$router.push({path: '/flashReport', query: { selectYear: this.selectYear }});
  }

  async onSave() {
    if(!confirm('저장하시겠습니까?')) {
      return;
    }

    let isSave = true;

    this.inputDatas.push(this.month1datas);        
    this.inputDatas.push(this.month2datas);
    this.inputDatas.push(this.month3datas);
    this.inputDatas.push(this.month4datas);
    this.inputDatas.push(this.month5datas);
    this.inputDatas.push(this.month6datas);
    this.inputDatas.push(this.month7datas);
    this.inputDatas.push(this.month8datas);
    this.inputDatas.push(this.month9datas);
    this.inputDatas.push(this.month10datas);
    this.inputDatas.push(this.month11datas);
    this.inputDatas.push(this.month12datas);

    for(let i = 0; i < this.inputDatas.length; i++) {
      // if(!isSave) break;
      const monthDatas:any[] = this.inputDatas[i];
      for(let j = 0; j < monthDatas.length; j++) {
        // if(!isSave) break;
        if(isNaN(monthDatas[j])) {
          if(monthDatas[j] !== null) {
            // alert('숫자만 입력해 주세요.');
            isSave = false;
            break;
          }

          // if(!isSave) break;
        }
      }

      // if(!isSave) break;
    }

    if(!isSave) {
      alert('숫자만 입력해 주세요.');
      return;
    }

    const postDatas:{month:number, col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number}[] 
      = [];

    for(let i = 0; i < this.inputDatas.length; i++) {
      const targetMonthList = this.inputDatas[i];

      // const obj:{col1:string,col2:string,col3:string,col4:string,col5:string,col6:string,col7:string,col8:string,col9:string,col10:string,col11:string,col12:string,col13:string,col14:string,col15:string} 
      //   = {col1:'',col2:'',col3:'',col4:'',col5:'',col6:'',col7:'',col8:'',col9:'',col10:'',col11:'',col12:'',col13:'',col14:'',col15:''};
      const obj:{month:number, col1:number,col2:number,col3:number,col4:number,col5:number,col6:number,col7:number,col8:number,col9:number,col10:number,col11:number,col12:number,col13:number,col14:number} 
        = {month:0,col1:0,col2:0,col3:0,col4:0,col5:0,col6:0,col7:0,col8:0,col9:0,col10:0,col11:0,col12:0,col13:0,col14:0};

        obj.month = i + 1;
      
      if(targetMonthList[1] === undefined || targetMonthList[1] === '') {
        obj.col1 = 0;
      } else {
        obj.col1 = targetMonthList[1];
      }

      if(targetMonthList[2] === undefined || targetMonthList[2] === '') {
        obj.col2 = 0;
      } else {
        obj.col2 = targetMonthList[2];
      }

      if(targetMonthList[3] === undefined || targetMonthList[3] === '') {
        obj.col3 = 0;
      } else {
        obj.col3 = targetMonthList[3];
      }

      if(targetMonthList[5] === undefined || targetMonthList[5] === '') {
        obj.col4 = 0;
      } else {
        obj.col4 = targetMonthList[5];
      }

      if(targetMonthList[6] === undefined || targetMonthList[6] === '') {
        obj.col5 = 0;
      } else {
        obj.col5 = targetMonthList[6];
      }

      if(targetMonthList[10] === undefined || targetMonthList[10] === '') {
        obj.col6 = 0;
      } else {
        obj.col6 = targetMonthList[10];
      }

      if(targetMonthList[11] === undefined || targetMonthList[11] === '') {
        obj.col7 = 0;
      } else {
        obj.col7 = targetMonthList[11];
      }

      if(targetMonthList[13] === undefined || targetMonthList[13] === '') {
        obj.col8 = 0;
      } else {
        obj.col8 = targetMonthList[13];
      }

      if(targetMonthList[16] === undefined || targetMonthList[16] === '') {
        obj.col9 = 0;
      } else {
        obj.col9 = targetMonthList[16];
      }

      if(targetMonthList[17] === undefined || targetMonthList[17] === '') {
        obj.col10 = 0;
      } else {
        obj.col10 = targetMonthList[17];
      }

      if(targetMonthList[18] === undefined || targetMonthList[18] === '') {
        obj.col11 = 0;
      } else {
        obj.col11 = targetMonthList[18];
      }

      if(targetMonthList[19] === undefined || targetMonthList[19] === '') {
        obj.col12 = 0;
      } else {
        obj.col12 = targetMonthList[19];
      }

      if(targetMonthList[20] === undefined || targetMonthList[20] === '') {
        obj.col13 = 0;
      } else {
        obj.col13 = targetMonthList[20];
      }

      if(targetMonthList[22] === undefined || targetMonthList[22] === '') {
        obj.col14 = 0;
      } else {
        obj.col14 = targetMonthList[22];
      }
      
      postDatas.push(obj);
    }

    const jsonStr = JSON.stringify(postDatas);

    this.inputDatas = [];

    try {
      
      const respones = await this.$axios.post('http://localhost:5000/api/flashReport', {
        targetYear: Number(this.selectYear),
        json: jsonStr,
      });

      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        alert('저장하였습니다.');
      } else {
        alert('저장 중 오류가 발생하였습니다.');  
      }
    } catch(e) {
      console.log('영업속보 > 연강목표 등록 실패 : ' + e);
      alert('저장 중 오류가 발생하였습니다.');
    }
  }

  async getflashreportTargetYear() {
    try {
      const respones = await this.$axios.get('http://localhost:5000/api/flashReport/flashreportTargetYear', {
        params: {
          targetYear: Number(this.selectYear),
        }
      });

      if(respones.data !== null && respones !== null) {
        this.getDatas = respones.data;
      } else {
        alert('영업속보 연간목표 데이터 조회 실패');
      }
    } catch(e) {
      console.log('영업속보 연간목표 데이터 조회 실패 : ' + e);
      alert('영업속보 연간목표 데이터 조회 실패');
    }
  }

  setDatas() {
    if(this.getDatas.length > 0) {
      for(let i = 0; i < this.getDatas.length; i++) {
        const data:any[] = [ 
          null, 
          this.getDatas[i].col1,
          this.getDatas[i].col2,
          this.getDatas[i].col3,
          null, 
          this.getDatas[i].col4,
          this.getDatas[i].col5, 
          null,
          null,
          null, 
          this.getDatas[i].col6,
          this.getDatas[i].col7,
          null,
          this.getDatas[i].col8,
          null,
          null,
          this.getDatas[i].col9,
          this.getDatas[i].col10,
          this.getDatas[i].col11,
          this.getDatas[i].col12,
          this.getDatas[i].col13,
          null,
          this.getDatas[i].col14,
          null 
        ];
        
        switch(i) {
          case 0 : this.month1datas = data; break;
          case 1 : this.month2datas = data; break;
          case 2 : this.month3datas = data; break;
          case 3 : this.month4datas = data; break;
          case 4 : this.month5datas = data; break;
          case 5 : this.month6datas = data; break;
          case 6 : this.month7datas = data; break;
          case 7 : this.month8datas = data; break;
          case 8 : this.month9datas = data; break;
          case 9 : this.month10datas = data; break;
          case 10 : this.month11datas = data; break;
          case 11 : this.month12datas = data; break;
        }
      }
    } else {
      for(let i = 0; i < 12; i++) {
        const data:any[] = [ 
          null, 
          0,
          0,
          0,
          null, 
          0,
          0, 
          null,
          null,
          null, 
          0,
          0,
          null,
          0,
          null,
          null,
          0,
          0,
          0,
          0,
          0,
          null,
          0,
          null 
        ];

        switch(i) {
          case 0 : this.month1datas = data; break;
          case 1 : this.month2datas = data; break;
          case 2 : this.month3datas = data; break;
          case 3 : this.month4datas = data; break;
          case 4 : this.month5datas = data; break;
          case 5 : this.month6datas = data; break;
          case 6 : this.month7datas = data; break;
          case 7 : this.month8datas = data; break;
          case 8 : this.month9datas = data; break;
          case 9 : this.month10datas = data; break;
          case 10 : this.month11datas = data; break;
          case 11 : this.month12datas = data; break;
        }
      }
    }
  };

  async created() {
    this.selectYear = this.$route.query.getYear;

    for(let i = 1; i <= 12; i++) {
      // this.addTargetSlotItems.push('addTarget_' + i.toString());
      this.addTargetSlotItems.push(i.toString());
    }

    await this.getflashreportTargetYear();
    await this.setDatas();
  }
}
</script>
<style>
.content {
  height: 100vh;
}

#flashReportAdd td.column-right {
  text-align: right !important;
  border-right: 0 !important;
  padding: 0 !important;
  position: relative;
}

#flashReportAdd td.column-center {
  text-align: center !important;
  position: relative !important;
}

#flashReportAdd th {
  text-align: center !important; 
  background-color: #f5f5f5 !important;
  font-weight: 800 !important;
  word-wrap: break-word !important;
}

#flashReportAdd td {
  color:black !important;
}

#flashReportAdd .ant-table-pagination.ant-pagination {
  display: none;
}

</style>
