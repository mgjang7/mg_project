<template>
  <div>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container bg-white ml-64 p-5">
              <div class="w-full flex justify-between items-center mb-4">
                <div class="">
                  <p class="text-lg text-black font-notosans font-bold">
                    거래처 등록
                  </p>
                </div>
                <span id="accountAdd" class="hover:cursor-pointer flex items-center" @click="$emit('modalClose')">
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
                          거래처명
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-input v-model="accountName" placeholder="거래처" />
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          거래기간
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2 flex items-center">
                        <div class="basis-[47.5%]">
                          <a-date-picker placeholder="시작일" class="w-full" @change="startDateChange" />
                        </div>
                        <div class="basis-[5%] flex justify-center items-center">
                          <span> - </span>
                        </div>
                        <div class="basis-[47.5%]">
                          <a-date-picker placeholder="종료일" class="w-full" @change="endDateChange" />
                        </div>
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
                      <div class="w-full">
                        <table class="w-full h-full border border-[#e8e8e8]">
                          <colgroup>
                            <col style="width:30%;" />
                            <col style="width:70%;" />
                          </colgroup>
                          <tr>
                            <td class="border-r border-[#e8e8e8] text-center">
                              임대매출
                            </td>
                            <td>
                              <a-checkbox-group @change="leaseCheckBoxChange">
                                <a-row v-for="(item, index) in leaseDatas" :key="index">
                                  <a-col v-if="item.IsUse">
                                    <a-checkbox :value="'lease_' + item.ItemName">
                                      {{item.ItemName}}
                                    </a-checkbox>
                                  </a-col>
                                  <a-col v-else>
                                    <a-checkbox :value="'lease_' + item.ItemName" disabled>
                                      {{item.ItemName}}
                                    </a-checkbox>
                                  </a-col>
                                </a-row>
                              </a-checkbox-group>
                            </td>
                          </tr>
                          <tr class="border-t border-[#e8e8e8]">
                            <td class="border-r border-[#e8e8e8] text-center">
                              관리비매출
                            </td>
                            <td>
                              <div class="w-full flex flex-col">
                                <a-checkbox-group @change="maintenanceCostCheckBoxChange">
                                  <a-row v-for="(item, index) in maintenanceCostDatas" :key="index">
                                    <a-col v-if="item.IsUse">
                                      <a-checkbox :value="'maintenanceCost_' + item.ItemName">
                                        {{item.ItemName}}
                                      </a-checkbox>
                                    </a-col>
                                    <a-col v-else>
                                      <a-checkbox :value="'maintenanceCost_' + item.ItemName" disabled>
                                        {{item.ItemName}}
                                      </a-checkbox>
                                    </a-col>
                                  </a-row>
                                </a-checkbox-group>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          사용여부
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-switch default-checked @change="isUseChange" />
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
                          v-model="note"
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
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class RentSalesAccountAddModal extends Vue {
  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';

  leaseDatas:string[] = [];
  maintenanceCostDatas:string[] = [];

  leaseCheckDatas:string[] = [];
  maintenanceCostCheckDatas:string[] = [];
  salesItemDatas:string[] = []; // 매출항목

  accountName:string = ''; // 거래처명
  transactionStartDate:string = ''; // 거래시작일
  transactionEndDate:string = ''; // 거래종료일
  isUse:boolean = true; // 사용여부
  note:string = ''; // 비고

  startDateChange(date: any, dateString: string) {
    // console.log(date, dateString);
    this.transactionStartDate = dateString;
  }

  endDateChange(date: any, dateString: string) {
    // console.log(date, dateString);
    this.transactionEndDate = dateString;
  }

  isUseChange(checked:boolean) {
    // console.log(`a-switch to ${checked}`);
    this.isUse = checked;
  }

  // 임대매출 항목 체크박스 선택 변경
  leaseCheckBoxChange(checkedValues:any) {
    if(checkedValues.toString() === '') { // 모두 선택 해제
      this.leaseCheckDatas = [];
    } else {
      this.leaseCheckDatas = [];

      const str:string = checkedValues.toString();

      const arr:string[] = str.split(',');

      for(let i = 0; i < arr.length; i++) {
        this.leaseCheckDatas.push(arr[i]);
      }
    }
  }

  // 관리비매출 항목 체크박스 선택 변경
  maintenanceCostCheckBoxChange(checkedValues:any) {
    if(checkedValues.toString() === '') { // 모두 선택 해제
      this.maintenanceCostCheckDatas = [];
    } else {
      this.maintenanceCostCheckDatas = [];

      const str:string = checkedValues.toString();

      const arr:string[] = str.split(',');

      for(let i = 0; i < arr.length; i++) {
        this.maintenanceCostCheckDatas.push(arr[i]);
      }
    }
  }

  async onSave() {
    this.salesItemDatas = [];

    if(this.leaseCheckDatas.length > 0) {  
      for(let i = 0; i < this.leaseCheckDatas.length; i++) {
        this.salesItemDatas.push(this.leaseCheckDatas[i]);
      }
    }

    if(this.maintenanceCostCheckDatas.length > 0) {
      for(let i = 0; i < this.maintenanceCostCheckDatas.length; i++) {
        this.salesItemDatas.push(this.maintenanceCostCheckDatas[i]);
      }
    }

    if(this.accountName === '') {
      alert('거래처를 입력해 주세요.');
      return;
    }

    if(this.salesItemDatas.length === 0) {
      alert('매출항목을 1개 이상 선택해 주세요.');
      return;
    }

    // ["lease_임대비(자판기)","lease_임대비(주막)","maintenanceCost_전기료","maintenanceCost_상하수도"]
    // []
    // 매출항목
    const salesItemsJson:string = JSON.stringify(this.salesItemDatas);

    try {
      
      const respones = await this.$axios.post('http://localhost:5000/api/rentalSalesAccount', {
        SalesItemsJson: salesItemsJson,
        AccountName: this.accountName,
        TransactionStartDate: this.transactionStartDate,
        TransactionEndDate: this.transactionEndDate,
        IsUse: this.isUse,
        Note: this.note
      });

      // if(respones.status === 200 || respones.statusText === 'OK') {
      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        alert('저장하였습니다.');
        this.$emit('refreshClose');
      } else {
        alert('저장 중 오류가 발생하였습니다.');  
      }
    } catch(e) {
      console.log('거래처 등록 실패 : ' + e);
      alert('저장 중 오류가 발생하였습니다.');
    }
  }

  async getRentalSalesItemsByAccount() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItemsByAccount');

      if(respones.data !== null && respones.data !== undefined) {
        for(let i = 0; i < respones.data.length; i++) {
          if(respones.data[i].DivisionCode === 'maintenanceCost') {
            this.maintenanceCostDatas.push(respones.data[i]);
          } else if(respones.data[i].DivisionCode === 'lease') {
            this.leaseDatas.push(respones.data[i]);
          }
        }
      } else {
        alert('등록 대상 매출항목 데이터 조회 실패');
      }
    } catch(e) {
      console.log('등록 대상 매출항목 데이터 조회 실패 : ' + e);
      alert('등록 대상 매출항목 데이터 조회 실패');
    }
  }

  async onLoad() {
    await this.getRentalSalesItemsByAccount();
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

#accountAdd svg {
  width: 20px;
  height: 20px;;
}

</style>

