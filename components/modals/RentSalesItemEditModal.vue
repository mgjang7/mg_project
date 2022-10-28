<template>
  <div>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container bg-white ml-64 p-5">
              <div class="w-full flex justify-between items-center mb-4">
                <div class="">
                  <p class="text-lg text-black font-notosans font-bold">
                    매출항목 수정
                    <!-- 임대 매출항목 수정 -->
                  </p>
                </div>
                <span id="accountAdd" class="hover:cursor-pointer flex items-center" @click="$emit('editModalClose')">
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
                          항목명
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-input v-model="editItemName" placeholder="항목 이름" />
                      </div>
                    </td>
                  </tr>
                  <tr class="border-t border-[#e8e8e8]">
                    <td class="bg-[#f5f5f5] border-r border-[#e8e8e8] text-center">
                      <div class="flex justify-center items-center">
                        <p class="text-black font-bold py-2">
                          항목구분
                        </p>
                        <p class="text-red-500">
                          *
                        </p>
                      </div>
                    </td>
                    <td class="py-4">
                      <div class="p-2">
                        <a-select :value="divisionCode" class="w-full" @change="divisionCodeChange">
                          <a-select-option v-for="(item, index) in divisionCodeDatas" :key="index" :value="item.Code">
                            {{ item.CodeName }}
                          </a-select-option>
                        </a-select>
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
                        <a-switch :checked="editIsUse" default-checked @change="isUseChange" />
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
                          v-model="editNote"
                          placeholder="비고"
                          :auto-size="{ minRows: 3, maxRows: 5 }"
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="w-full flex justify-center items-center gap-x-2">
                <button class="cancle-btn" @click="$emit('editModalClose')">
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
import { Component, Vue, Prop  } from "nuxt-property-decorator";

@Component({})
export default class RentSalesEditModal extends Vue {
  @Prop({type: String, required: true}) 
  editId!: string;

  @Prop({type: Array, required: true}) 
  tableDatas!: any[];

  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';
  // 항목명
  editItemName = '';
  // 항목구분
  editDivisionCode = '';
  // 사용여부
  editIsUse = false;
  // 비고
  editNote = '';

  divisionCodeDatas = [];

  divisionCodeChange(value: any) {
    this.editDivisionCode = value;
  }

  isUseChange(checked:boolean) {
    // console.log(`a-switch to ${checked}`);
    this.editIsUse = checked;
  }

  // 저장
  async onSave() {
    if(!confirm('변경된 내용을 저장하시겠습니까?')) {
      return;
    }

    if(this.editItemName === '') {
      alert('항목명을 입력해 주세요.');
      return;
    }

    // 자기 자신은 비교 대상에서 제외
    this.tableDatas = this.tableDatas.filter(x => x.Seq !== this.editId);

    let isSaved:boolean = false;

    isSaved = this.tableDatas.some(x => x.DivisionCode === this.editDivisionCode);

    if(isSaved) {
      isSaved =  this.tableDatas.some(x => x.ItemName === this.editItemName);

      if(isSaved) {
        alert('해당 항목명은 이미 등록되어 있습니다. 다른 항목명으로 등록 바랍니다.');
        return;
      }
    }

    if(this.editDivisionCode === '') {
      alert('매출항목 구분을 선택해 주세요.');
      return;
    }

    try {
      const id:string = this.editId;

      const respones = await this.$axios.put(this.SalesItemUrl+ `/${id}`, {
        DivisionCode: this.editDivisionCode,
        DivisionName: '',
        ItemName: this.editItemName,
        IsUse: this.editIsUse,
        Note: this.editNote,
      });

      if(respones.status === 200 || respones.statusText === 'OK') {
        alert('저장하였습니다.');
        this.$emit('refreshClose');
      } else {
        alert('저장 중 오류가 발생하였습니다.');  
      }
    } catch(e) {
      console.log('부대매출 항목 수정 실패 : ' + e);
      alert('저장 중 오류가 발생하였습니다.');
    }
  }

  async getRentalSalesItem() {
    try {
      const id:string = this.editId;

      const respones = await this.$axios.get(this.SalesItemUrl + `/${id}`);

      if(respones.data !== null && respones.data !== undefined) {
        this.editItemName = respones.data.ItemName;
        this.editDivisionCode = respones.data.DivisionCode;
        this.editIsUse = respones.data.IsUse;
        this.editNote = respones.data.Note;
      } else {
        alert('임대매출 항목 수정 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 항목 수정 데이터 조회 실패 : ' + e);
      alert('임대매출 항목 수정 데이터 조회 실패');
    }
  }

  async getRentalSalesItemTypes() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItemTypes');

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

  async onLoad() {
    await this.getRentalSalesItem();
    await this.getRentalSalesItemTypes();  
  }

  get divisionCode() {
    return this.editDivisionCode;
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
