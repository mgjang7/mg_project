<template>
  <div>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container bg-white ml-64 p-5">
              <div class="w-full flex justify-between items-center mb-4">
                <div class="">
                  <p class="text-lg text-black font-notosans font-bold">
                    매출등록
                  </p>
                </div>
                <span id="incidentalSalesAdd" class="hover:cursor-pointer flex items-center" @click="$emit('modalClose')">
                  <a-icon type="close" />
                </span>
              </div>
              <div class="w-full mb-1 flex justify-end items-center">
                <p class="text-red-500">
                  '*' 필수 입력 항목
                </p>
              </div>
              <div class="w-full border border-[#e8e8e8] rounded overflow-hidden mb-4">
                <!-- 테이블 -->
                <table class="w-full font-notosans">
                  <colgroup>
                    <col style="width:30%;" />
                    <col style="width:70%;" />
                  </colgroup>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          매출항목
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2 flex gap-x-2">
                        <a-select default-value='' class="basis-[50%]" @change="divisionCodeChange">
                          <a-select-option  value=''>
                            선택
                          </a-select-option>
                          <a-select-option v-for="(item, index) in divisionCodeDatas" :key="index" :value="item.Code">
                            {{ item.CodeName }}
                          </a-select-option>
                        </a-select>
                        <a-select v-model="defaultValue" class="basis-[50%]" @change="itemChange">
                          <a-select-option  value=''>
                            선택
                          </a-select-option>
                          <a-select-option v-for="(item, index) in itemDatas" :key="index" :value="item.ItemName">
                            {{ item.ItemName }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          매출일자
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-date-picker placeholder="매출일자" class="w-full" @change="salesDateChange" />
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          매출액
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="w-full h-full">
                        <table class="w-full h-full border border-[#e8e8e8]">
                          <colgroup>
                            <col style="width:33.3%;" />
                            <col style="width:33.3%;" />
                            <col style="width:33.3%;" />
                          </colgroup>
                          <thead>
                            <tr class="bg-[#f5f5f5]">
                              <th class="border-r border-b border-[#e8e8e8]">공급가액</th>
                              <th class="border-r border-b border-[#e8e8e8]">부가세</th>
                              <th class="border-r border-b border-[#e8e8e8]">합계</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="border-r border-[#e8e8e8]">
                                <a-input v-model="supplyPriceParam" placeholder="공급가액" />
                              </td>
                              <td class="border-r border-[#e8e8e8]">
                                <a-input v-model="taxParam" placeholder="부가세" />
                              </td>
                              <td class="border-r border-[#e8e8e8]">
                                <a-input v-model="sumParam" placeholder="합계" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <p class="text-black font-bold py-2">
                        비고
                      </p>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-textarea
                          v-model="noteParam"
                          placeholder="비고"
                          :auto-size="{ minRows: 3, maxRows: 5 }"
                        />
                      </div>
                    </td>
                  </tr>
                  
                </table>
              </div>
              <div class="w-full flex justify-center items-center gap-x-2">
                <button class="cancle-btn" @click="$emit('modalClose')">
                  취소
                </button>
                <button class="add-btn" @click="onSave">
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";

@Component({})
export default class RentSalesAddModal extends Vue {
  SalesItemUrl = 'http://localhost:5000/api/incidentalSalesItem';
  SalesUrl = 'http://localhost:5000/api/incidentalSales';

  divisionCodeDatas = [];

  divisionCode = '';

  itemDatas = [];

  itemOptions:any[] = [];
  defaultValue = '';

  divisionCodeParam = '';
  itemNameParam = '';
  salesDateParam = '';
  supplyPriceParam = 0;
  taxParam = 0;
  sumParam = 0;
  noteParam = '';

  @Watch('supplyPriceParam')
  onChangeSupplyPriceParam() {
    if(!isNaN(this.supplyPriceParam) && !isNaN(this.taxParam)) {
      this.sumParam = Number(this.supplyPriceParam) + Number(this.taxParam);
    }
  }

  @Watch('taxParam')
  onChangeTaxParam() {
    if(!isNaN(this.supplyPriceParam) && !isNaN(this.taxParam)) {
      this.sumParam = Number(this.supplyPriceParam) + Number(this.taxParam);
    }
  }

  divisionCodeChange(value: string) {
    // console.log(`selected ${value}`);
    this.divisionCode = value;
    this.divisionCodeParam = value;
    this.getIncidentalSalesItems();
  }

  itemChange(value: any) {
    // console.log(`selected ${value}`);
    this.itemNameParam = value;
  }

  salesDateChange(date: any, dateString: string) {
    // console.log(date, dateString);
    this.salesDateParam = dateString;
  }

  async getIncidentalSalesItemTypes() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/incidentalSalesItemTypes');

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

  async getIncidentalSalesItems() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/incidentalSalesItems', {
        params: {
          divisionCode: this.divisionCode,
          searchKeyword: ''
        }
      });

      if(respones.data !== null && respones.data !== undefined) {
        // this.defaultValue = respones.data[0].ItemName;
        this.defaultValue = '';
        this.itemDatas = respones.data;
      } else {
        alert('부대매출 항목 데이터 조회 실패');
      }
    } catch(e) {
      console.log('부대매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('부대매출 항목 데이터 조회 실패');
    }
  }

  // 저장
  async onSave() {
    if(this.divisionCodeParam === '') {
      alert('매출항목 구분을 선택해 주세요.');
      return;
    }

    if(this.itemNameParam === '') {
      alert('매출항목 아이템을 선택해 주세요.');
      return;
    }

    if(this.salesDateParam === '') {
      alert('매출일자를 선택해 주세요.');
      return;
    }

    if(this.supplyPriceParam.toString() === '' || this.supplyPriceParam === 0) {
      alert('공급가액을 입력해 주세요.');
      return;
    } else if(isNaN(this.supplyPriceParam)) {
      alert('공급가액은 숫자만 입력 가능합니다.');
      return;
    }

    if(this.taxParam.toString() === '') {
      alert('부가세를 입력해 주세요.');
      return;
    } else if(isNaN(this.taxParam)) {
      alert('부가세는 숫자만 입력 가능합니다.');
      return;
    }
    
    if(this.sumParam.toString() === '' || this.sumParam === 0) {
      alert('합계 금액을 입력해 주세요.');
      return;
    } else if(isNaN(this.sumParam)) {
      alert('합계는 숫자만 입력 가능합니다.');
      return;
    }

    if((Number(this.supplyPriceParam) + Number(this.taxParam)) !== Number(this.sumParam)) {
      alert('합계 금액이 일치하지 않습니다.');
      return;
    }

    try {
      const respones = await this.$axios.post(this.SalesUrl, {
        DivisionCode: this.divisionCodeParam,
        ItemName: this.itemNameParam,
        SalesDate: this.salesDateParam,
        SupplyPrice: this.supplyPriceParam,
        Surtax: this.taxParam,
        SumPrice: this.sumParam,
        Note: this.noteParam,
      });

      // if(respones.status === 200 || respones.statusText === 'OK') {
      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        alert('저장하였습니다.');
        this.$emit('modalCloseRefresh');
        // this.$emit('refreshClose');
      } else {
        alert('저장 중 오류가 발생하였습니다.');  
      }
    } catch(e) {
      console.log('부대매출 등록 실패 : ' + e);
      alert('저장 중 오류가 발생하였습니다.');
    }
  }

  async onLoad() {
    await this.getIncidentalSalesItemTypes();
  }

  created() {
    
  }

  mounted() {
    this.onLoad();
  }
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#incidentalSalesAdd svg {
  width: 20px;
  height: 20px;;
}

</style>
