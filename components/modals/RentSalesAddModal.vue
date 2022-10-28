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
                <span id="rentSalesAdd" class="hover:cursor-pointer flex items-center" @click="$emit('close')">
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

                  <tr>
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          거래처
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-select default-value='' class="w-full" @change="accountChange">
                          <a-select-option  value=''>
                            선택
                          </a-select-option>
                          <a-select-option v-for="(item, index) in accountDatas" :key="index" :value="item.AccountName">
                            {{ item.AccountName }}
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
                          매출항목
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2 flex gap-x-2">
                        <a-select v-model='divisionDefaultValue' class="basis-[50%]" @change="divisionCodeChange">
                          <a-select-option  value=''>
                            선택
                          </a-select-option>
                          <a-select-option v-for="(item, index) in salesDivisionDatas" :key="index" :value="item.value">
                            {{ item.label }}
                          </a-select-option>
                        </a-select>

                        <a-select v-model='itemDefaultValue' class="basis-[50%]" @change="itemChange">
                          <a-select-option  value=''>
                            선택
                          </a-select-option>
                          <a-select-option v-for="(item, index) in salesItemSelectDatas" :key="index" :value="item.value">
                            {{ item.label }}
                          </a-select-option>
                        </a-select>
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
                                <a-input v-model="surtaxParam" placeholder="부가세" />
                              </td>
                              <td class="border-r border-[#e8e8e8]">
                                <a-input v-model="sumPriceParam" placeholder="합계" />
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
                <button class="cancle-btn" @click="$emit('close')">
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
  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';
  SalesUrl = 'http://localhost:5000/api/rentalSales';

  divisionCodeDatas = [];
  itemDatas = [];
  accountDatas = [];

  salesDivisionDatas:{ label:string, value:string }[] = [];
  salesItemDatas:string[] = [];
  salesItemSelectDatas:{ label:string, value:string }[] = [];

  divisionCode = '';
  divisionCodeParam = '';
  itemNameParam = '';
  accountParam = '';
  salesDateParam = '';
  supplyPriceParam = 0;
  surtaxParam = 0;
  sumPriceParam = 0;
  noteParam = '';

  divisionDefaultValue = '';
  itemDefaultValue = '';

  @Watch('supplyPriceParam')
  onChangeSupplyPriceParam() {
    if(!isNaN(this.supplyPriceParam) && !isNaN(this.surtaxParam)) {
      this.sumPriceParam = Number(this.supplyPriceParam) + Number(this.surtaxParam);
    }
  }

  @Watch('surtaxParam')
  onChangeTaxParam() {
    if(!isNaN(this.supplyPriceParam) && !isNaN(this.surtaxParam)) {
      this.sumPriceParam = Number(this.supplyPriceParam) + Number(this.surtaxParam);
    }
  }
  
  async accountChange(value: string) {
    this.accountParam = value;

    this.salesDivisionDatas = [];
    this.salesItemDatas = [];
    this.salesItemSelectDatas = [];

    this.divisionDefaultValue = '';
    this.itemDefaultValue = '';

    if(value !== '') {
      await this.getRentalSalesItems();
    }
  }

  divisionCodeChange(value: string) {
    
    this.divisionCode = value;
    this.divisionCodeParam = value;

    this.itemDefaultValue = '';

    this.setSalesItemData(value);
  }

  itemChange(value: string) {
    // console.log(`selected ${value}`);
    this.itemNameParam = value;
  }

  salesDateChange(date: any, dateString: string) {
    // console.log(date, dateString);
    this.salesDateParam = dateString;
  }

  setSalesItemData(divisionCode:string) {
    // alert('divisionCode : ' + divisionCode);
    this.salesItemSelectDatas = [];
    if(divisionCode !== '') {
      for(let i = 0; i < this.salesItemDatas.length; i++) {
        if(this.salesItemDatas[i].includes(divisionCode)) {
          const arr:string[] = this.salesItemDatas[i].split('_');

          this.salesItemSelectDatas.push({ label: arr[1], value: arr[1] });
        }
      }
    }
  }

  // 저장
  async onSave() {
    if(this.accountParam === '') {
      alert('거래처를 선택해 주세요.');
      return;
    }

    if(this.salesDateParam === '') {
      alert('매출일자를 선택해 주세요.');
      return;
    }

    if(this.divisionCodeParam === '') {
      alert('매출항목 구분을 선택해 주세요.');
      return;
    }

    if(this.itemNameParam === '') {
      alert('매출항목 아이템을 선택해 주세요.');
      return;
    }

    if(this.supplyPriceParam.toString() === '' || this.supplyPriceParam === 0) {
      alert('공급가액을 입력해 주세요.');
      return;
    } else if(isNaN(this.supplyPriceParam)) {
      alert('공급가액은 숫자만 입력 가능합니다.');
      return;
    }

    if(this.surtaxParam.toString() === '') {
      alert('부가세를 입력해 주세요.');
      return;
    } else if(isNaN(this.surtaxParam)) {
      alert('부가세는 숫자만 입력 가능합니다.');
      return;
    }
    
    if(this.sumPriceParam.toString() === '' || this.sumPriceParam === 0) {
      alert('합계 금액을 입력해 주세요.');
      return;
    } else if(isNaN(this.sumPriceParam)) {
      alert('합계는 숫자만 입력 가능합니다.');
      return;
    }

    if((Number(this.supplyPriceParam) + Number(this.surtaxParam)) !== Number(this.sumPriceParam)) {
      alert('합계 금액이 일치하지 않습니다.');
      return;
    }

    try {
      const respones = await this.$axios.post(this.SalesUrl, {
        AccountName: this.accountParam,
        SalesDate: this.salesDateParam,
        DivisionCode: this.divisionCodeParam,  
        ItemName: this.itemNameParam,
        SupplyPrice: this.supplyPriceParam,
        Surtax: this.surtaxParam,
        SumPrice: this.sumPriceParam,
        Note: this.noteParam,
      });

      // if(respones.status === 200 || respones.statusText === 'OK') {
      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        alert('저장하였습니다.');
        this.$emit('modalCloseRefresh');
      } else {
        alert('저장 중 오류가 발생하였습니다.');  
      }
    } catch(e) {
      console.log('임대매출 등록 실패 : ' + e);
      alert('저장 중 오류가 발생하였습니다.');
    }
  }

  async getRentalSalesItems() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItemAddByAccount', {
        params: {
          accountName: this.accountParam,
        }
      });

      if(respones !== null && respones !== undefined) {
        if(respones.data === '') {
          this.salesDivisionDatas = [];
          this.salesItemDatas = [];
          this.salesItemSelectDatas = [];
        } else {
          const division:string = respones.data.Division;

          if(division.includes(',')) {
            const arr:string[] = division.split(',');

            let obj:{ label:string, value:string } = { label:'', value:'' };

            for(let i = 0; i < arr.length; i++) {
              const arr2:string[] = arr[i].split('_');

              obj = { label:'', value:'' };

              obj.label = arr2[1];
              obj.value = arr2[0];

              this.salesDivisionDatas.push(obj);
            } 

          } else {
            const arr:string[] = division.split('_');

            let obj:{ label:string, value:string } = { label:'', value:'' };

            obj = { label:'', value:'' };

            obj.label = arr[1];
            obj.value = arr[0];

            this.salesDivisionDatas.push(obj);
          }

          const item:string = respones.data.Item;

          if(item.includes(',')) {
            const arr:string[] = item.split(',');

            for(let i = 0; i < arr.length; i++) {
              this.salesItemDatas.push(arr[i]);
            }
          } else {
              this.salesItemDatas.push(item);
          }
        }
      } else {
        alert('매출 항목 데이터 조회 실패');
      }

    } catch(e) {
      console.log('매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('매출 항목 데이터 조회 실패');
    }
  }

  // async getRentalSalesItems() {
  //   try {
  //     const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItems', {
  //       params: {
  //         divisionCode: this.divisionCode,
  //         searchKeyword: ''
  //       }
  //     });

  //     if(respones.data !== null && respones.data !== undefined) {
  //       this.defaultValue = '';
  //       this.itemDatas = respones.data;
  //     } else {
  //       alert('부대매출 항목 데이터 조회 실패');
  //     }
  //   } catch(e) {
  //     console.log('부대매출 항목 구분 데이터 조회 실패 : ' + e);
  //     alert('부대매출 항목 데이터 조회 실패');
  //   }
  // }

  async getRentalSalesItemTypes() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItemTypes');

      if(respones.data !== null && respones.data !== undefined) {
        this.divisionCodeDatas = respones.data;
      } else {
        alert('임대매출 항목 구분 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('임대매출 항목 구분 데이터 조회 실패');
    }
  }

  async getRentalSalesAccounts() {
    try {
      // const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesAccounts');
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesAccountItems', {
        params: {
          divisionCode: 'all',
          salesItem: 'all',
          searchKeyword: '',
        }
      });

      if(respones.data !== null && respones.data !== undefined) {
        this.accountDatas = respones.data;
      } else {
        alert('임대매출 거래처 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 거래처 데이터 조회 실패 : ' + e);
      alert('임대매출 거래처 데이터 조회 실패');
    }
  }

  async onLoad() {
    await this.getRentalSalesItemTypes();
    await this.getRentalSalesAccounts();
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

#rentSalesAdd svg {
  width: 20px;
  height: 20px;;
}

</style>
