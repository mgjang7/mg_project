<template>
  <div>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container bg-white ml-64 p-5">
              <div class="w-full flex justify-between items-center mb-4">
                <div class="">
                  <p class="text-lg text-black font-notosans font-bold">
                    거래처 수정
                  </p>
                </div>
                <span id="accountAdd" class="hover:cursor-pointer flex items-center" @click="$emit('eidtModalClose')">
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
                          <a-date-picker placeholder="시작일" :value="transactionStartDate" class="w-full" @change="startDateChange" />
                        </div>
                        <div class="basis-[5%] flex justify-center items-center">
                          <span> - </span>
                        </div>
                        <div class="basis-[47.5%]">
                          <a-date-picker placeholder="종료일" :value="transactionEndDate" class="w-full" @change="endDateChange" />
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
                              <!-- <a-checkbox-group :value="checkedList" @change="leaseCheckBoxChange"> --> 
                              <a-checkbox-group v-model:value="checkedList" @change="leaseCheckBoxChange">
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
                              <!-- <a-checkbox-group  v-model:value="checkedList" :options="checkOptions" /> -->
                            </td>
                          </tr>
                          <tr class="border-t border-[#e8e8e8]">
                            <td class="border-r border-[#e8e8e8] text-center">
                              관리비매출
                            </td>
                            <td>
                              <div class="w-full flex flex-col">
                                <!-- <a-checkbox-group :value="checkedList2" @change="maintenanceCostCheckBoxChange"> -->
                                <a-checkbox-group v-model:value="checkedList2" @change="maintenanceCostCheckBoxChange">
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
                                <!-- <a-checkbox-group v-model:value="checkedList2" :options="checkOptions2" /> -->
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
                        <a-switch :checked="isUse" @change="isUseChange" />
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
                <button class="cancle-btn" @click="$emit('eidtModalClose')">
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
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class RentSalesAccountEditModal extends Vue {
  @Prop({type: String, required: true}) 
  editId!: string;

  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';

  checkedList:any[] = [];
  checkedList2:any[] = [];
  checkOptions:any[] = [];
  checkOptions2:any[] = [];
  leaseDatas:any[] = [];
  maintenanceCostDatas:any[] = [];
  leaseCheckDatas:string[] = [];
  maintenanceCostCheckDatas:string[] = [];
  salesItemDatas:string[] = []; // 매출항목
  accountName:string = ''; // 거래처명
  transactionStartDate:string = ''; // 거래시작일
  transactionEndDate:string = ''; // 거래종료일
  isUse:boolean = true; // 사용여부
  note:string = ''; // 비고

  selectedItemNameStr = '';
  isValueChange = false;

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
    this.isValueChange = true;

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
    this.isValueChange = true;

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
    if(this.isValueChange) {
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
      const id:string = this.editId;
      
      const respones = await this.$axios.put('http://localhost:5000/api/rentalSalesAccount/' + `${id}`, {
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
        // DivisionCode : "lease"
        // ItemName : "임대료"
      } else {
        alert('등록 대상 매출항목 데이터 조회 실패');
      }
    } catch(e) {
      console.log('등록 대상 매출항목 데이터 조회 실패 : ' + e);
      alert('등록 대상 매출항목 데이터 조회 실패');
    }
  }

  async getRentalSalesAccountItem() {
    try {
      const id:string = this.editId;

      const respones = await this.$axios.get('http://localhost:5000/api/rentalSalesAccount' + `/${id}`);

      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        this.accountName = respones.data.AccountName;
        this.transactionStartDate = respones.data.TransactionStartDate;
        this.transactionEndDate = respones.data.TransactionEndDate;
        this.isUse = respones.data.IsUse;
        this.note = respones.data.Note;

        this.selectedItemNameStr = respones.data.ItemName;
      } else {
        alert('거래처 수정 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 항목 수정 데이터 조회 실패 : ' + e);
      alert('거래처 수정 데이터 조회 실패');
    }
  }

  // 저장된 매출항목 체크
  setCheckedList() {
    const itemNameArr:any[] = this.selectedItemNameStr.split(','); // [ "maintenanceCost_임대관리비", "maintenanceCost_전기료" ]
    // maintenanceCostDatas : "임대관리비"
    // 임대매출
    for(let i = 0; i < this.leaseDatas.length; i++) {
      for(let j = 0; j < itemNameArr.length; j++) {
        const arr:any[] = itemNameArr[j].split('_');

        if(this.leaseDatas[i].ItemName === arr[1]) {
          this.checkedList.push(itemNameArr[j]);
          this.leaseCheckDatas.push(itemNameArr[j]);
        }
      }
    }

    // 관리비매출
    for(let i = 0; i < this.maintenanceCostDatas.length; i++) {
      for(let j = 0; j < itemNameArr.length; j++) {
        const arr:any[] = itemNameArr[j].split('_');

        if(this.maintenanceCostDatas[i].ItemName === arr[1]) {
          this.checkedList2.push(itemNameArr[j]);
          this.maintenanceCostCheckDatas.push(itemNameArr[j]);
        }
      }
    }
    
    if(this.checkedList.length > 0) {  
      for(let i = 0; i < this.checkedList.length; i++) {
        this.salesItemDatas.push(this.checkedList[i]);
      }
    }

    if(this.checkedList2.length > 0) {  
      for(let i = 0; i < this.checkedList2.length; i++) {
        this.salesItemDatas.push(this.checkedList2[i]);
      }
    }
  }

  async onLoad() {
    // 거래처 전체 매출항목
    await this.getRentalSalesItemsByAccount();
    // 선택 거래처 매출항목
    await this.getRentalSalesAccountItem();
    // 선택 매출항목 체크
    await this.setCheckedList();
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

