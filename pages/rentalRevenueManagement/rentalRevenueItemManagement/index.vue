<template>
<!-- 임대 매출 관리 > 임대 매출 항목 관리 -->
  <div class="w-full">
    <div class="w-full flex justify-center content overflow-scroll">
      <div class="container-box">
        <div class="w-full mb-16">
          <p class="main-title font-notosans">임대매출 항목관리</p>
        </div>
        <div class="w-full flex justify-between items-center mb-8">
          <div class="flex items-center gap-x-2">
            <a-select default-value="all" style="width: 120px" @change="divisionChange">
              <a-select-option value="all">
                전체
              </a-select-option>
              <a-select-option v-for="(item, index) in divisionCodeDatas" :key="index" :value="item.Code">
                {{item.CodeName}}
              </a-select-option>
            </a-select> 
            <!-- <a-select default-value="매출유형" style="width: 120px" @change="handleChange">
              <a-select-option value="all">
                전체
              </a-select-option>
              <a-select-option value="1">
                임대매출
              </a-select-option>
              <a-select-option value="2">
                관리비매출
              </a-select-option>
            </a-select>  -->
            <a-input v-model="searchKeyword" placeholder="매출 항목" class="w-48" />
            <button class="search-btn" @click="getRentalSalesItems">
              조회
            </button>
          </div>
          <div class="flex">
            <button class="add-btn" @click="showModal = true">
              매출 항목 등록
            </button>
          </div>
        </div>
        <!-- 테이블 -->
        <div id="rentalRevenueItemManagement" class="w-full mb-5">
          <a-table
            :columns="columns"
            :data-source="tableDatas"
            bordered
            :pagination="pagination"
            :scroll="{ x: 1280 }"
            class="font-notosans text-black"
          >
            <!-- <template slot="isUseSlot" slot-scope="text, record">
              <a-switch v-if="record.isUse" default-checked disabled="disabled" @change="isUseChange" />
              <a-switch v-else disabled="disabled" @change="isUseChange" />
            </template> -->
            <template slot="isUseSlot" slot-scope="text, record">
              <a-switch v-if="record.IsUse" :checked="true" disabled="disabled" @change="isUseChange" />
              <a-switch v-else disabled="disabled" @change="isUseChange" />
            </template>

            <template slot="salesItemSlot" slot-scope="text, record">
              <p class="underline hover:cursor-pointer" @click="salesItemEdit(record.Seq)">
                {{text}}
              </p>
              <!-- <p>{{record.salesItem}}</p> -->
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- 등록 -->
    <RentSalesItemAddModal v-if="showModal" :table-datas="tableDatas" @modalClose="showModal = false" @refreshClose="refresh">
      
    </RentSalesItemAddModal>
    <!-- 수정 -->
    <RentSalesItemEditModal v-if="showEditModal" :table-datas="tableDatas" :edit-id="editId" @editModalClose="showEditModal = false" @refreshClose="refresh">
      
    </RentSalesItemEditModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';
import RentSalesItemAddModal from '@/components/modals/RentSalesItemAddModal.vue';
import RentSalesItemEditModal from '@/components/modals/RentSalesItemEditModal.vue';

@Component({ 
  layout: 'navMenu',
  components: {
    RentSalesItemAddModal,
    RentSalesItemEditModal,
  },
})
export default class RentSalesItemManagement extends Vue {
  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';

  showModal:boolean = false;
  showEditModal:boolean = false;

  editId:string = '';

  columns = [
    {
      title: 'No',
      className: 'column-center',
      dataIndex: 'Order',
      width: '5%',
    },
    {
      title: '구분',
      className: 'column-center',
      dataIndex: 'DivisionName',
      width: '19%',
    },
    {
      title: '항목명',
      className: 'column-center',
      dataIndex: 'ItemName',
      width: '19%',
      scopedSlots: { customRender: 'salesItemSlot' },
    },
    {
      title: '등록일자',
      className: 'column-center',
      dataIndex: 'RegDate',
      width: '19%',
    },
    {
      title: '사용여부',
      className: 'column-center',
      dataIndex: 'IsUse',
      width: '19%',
      scopedSlots: { customRender: 'isUseSlot' },
    },
    {
      title: '비고',
      className: 'column-center',
      dataIndex: 'Note',
      width: '19%',
      customRender: (value:string, row:any, index:number) => {
        const obj:{children: string, attrs: any} = {
          children: value,
          attrs: {},
        };

        obj.attrs.style = 'border-right: 0;';

        return obj;
      },
    },
  ];

  tableDatas: {
    Order: number,
    Seq: string,
    DivisionCode: string,
    DivisionName: string,
    ItemName: string,
    IsUse:boolean,
    Note:string,
    RegDate: string,
    UpdateDate: string,
  }[] = [];

  divisionCodeDatas = [];

  divisionCode = 'all';
  searchKeyword = '';

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

  async getRentalSalesItems() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItems', {
        params: {
          divisionCode: this.divisionCode,
          searchKeyword: this.searchKeyword
        }
      });

      if(respones.data !== null && respones.data !== undefined) {
        this.tableDatas = respones.data;

      } else {
        alert('임대매출 항목 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('임대매출 항목 데이터 조회 실패');
    }
  }

  @Emit()
  refresh() {
    this.showModal = false;
    this.showEditModal = false;
    this.getRentalSalesItems();
  }

  async onLoad() {
    await this.getRentalSalesItemTypes();
    await this.getRentalSalesItems();
  }

  created() {
   // this.setOrder();
  }

  mounted() {
    this.onLoad();
  }

  // setOrder() {
  //   const orders:number[] = [];
    
  //   for(let i = this.tableDatas.length; i >= 1; i--) {
  //     orders.push(i);
  //   }
    
  //   for(let i = 0; i < this.tableDatas.length; i++) {
  //     this.tableDatas[i].idx = orders[i];
  //   }
  // }

  priceFormatter = priceFormatter

  pagination = {
    pageSize: 10
  };
 
  salesItemEdit(seq:string) {
    this.editId = seq;
    this.showEditModal = true;
  }
  

  // handleChange(value: any) {
  //   console.log(`selected ${value}`);
  // }
  divisionChange(value: string) {
    this.divisionCode = value;
  }

  isUseChange(checked:boolean) {
    // console.log(`[isUse] a-switch to ${checked}`);
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

#rentalRevenueItemManagement td {
  color:black !important;
  word-wrap: break-word !important;
  padding: 6px !important;
  padding-top: 17px !important;
  padding-bottom: 17px !important;
}

button, [type='button'], [type='reset'], [type='submit'] {
  background-color: gray;
}
.ant-switch-checked {
  background-color: #1890ff !important;
}
</style>