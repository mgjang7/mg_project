<template>
<!-- 임대 매출 관리 > 거래처 관리 -->
  <div class="w-full">
    <div class="w-full flex justify-center content overflow-scroll">
      <div class="container-box">
        <div class="w-full mb-16">
          <p class="main-title font-notosans">거래처 관리</p>
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
            <a-select default-value="all" style="width: 120px" @change="salesItemChange">
              <a-select-option value="all">
                전체
              </a-select-option>
              <a-select-option v-for="(item, index) in salesItems" :key="index" :value="item.DivisionCode + '_' + item.ItemName">
                {{ item.ItemName }}
              </a-select-option>
            </a-select>
            <a-input v-model="searchKeyword" placeholder="거래처" class="w-48" />
            <button class="search-btn" @click="getRentalSalesAccountItems">
              조회
            </button>
          </div>
          <div class="flex">
            <button class="add-btn" @click="showModal = true">
              거래처 등록
            </button>
          </div>
        </div>
        <!-- 테이블 -->
        <div id="accountManagement" class="w-full mb-5">
          <a-table
            :columns="columns"
            :data-source="tableDatas"
            bordered
            :scroll="{ x: 1280 }"
            :pagination="pagination"
            class="font-notosans text-black"
          >
            <!-- <template slot="isUseSlot" slot-scope="text, record">
              <a-switch v-if="record.isUse" default-checked disabled="disabled" @change="onChange" />
              <a-switch v-else disabled="disabled" @change="onChange" />
            </template> -->
            <template slot="isUseSlot" slot-scope="text, record">
              <a-switch v-if="record.IsUse" :checked="true" disabled="disabled" @change="onChange" />
              <a-switch v-else disabled="disabled" @change="onChange" />
            </template>
            <template slot="customerNameSlot" slot-scope="text, record">
              <p class="underline hover:cursor-pointer" @click="customerEdit(record.Seq)">
                {{text}}
              </p>
              <!-- <p>{{record.customer}}</p> -->
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- 거래처 등록 -->
    <AccountAddModal v-if="showModal" @modalClose="showModal = false" @refreshClose="refresh">
      
    </AccountAddModal>
    <!-- 거래처 수정 -->
    <AccountEditModal v-if="showEditModal" :edit-id="editId" @eidtModalClose="showEditModal = false" @refreshClose="refresh">
      
    </AccountEditModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "nuxt-property-decorator";
import { priceFormatter } from '@/utils/priceFormatter';
import AccountAddModal from '@/components/modals/AccountAddModal.vue';
import AccountEditModal from '@/components/modals/AccountEditModal.vue';

@Component({ 
  layout: 'navMenu',
  components: {
    AccountAddModal,
    AccountEditModal,
  },
})
export default class AccountManagement extends Vue {
  SalesItemUrl = 'http://localhost:5000/api/rentalSalesItem';
  editId:string = '';
  showModal:boolean = false;
  showEditModal:boolean = false;
  divisionCodeDatas = [];
  divisionCode = 'all';
  salesItems = [];
  salesItem = 'all';
  searchKeyword = '';

  columns = [
    {
      title: 'No',
      className: 'column-center',
      dataIndex: 'Order',
      width: '5%',
    },
    {
      title: '거래처명',
      className: 'column-center',
      dataIndex: 'AccountName',
      // width: '16%',
      width: '14%',
      scopedSlots: { customRender: 'customerNameSlot' },
    },
    {
      title: '거래기간',
      className: 'column-center',
      dataIndex: 'TransactionPeriod',
      // width: '16%',
      width: '22%',
    },
    {
      title: '매출항목',
      rowSpan: 2,
      children: [
        {
          title: '매출항목',
          className: 'column-center',
          dataIndex: 'DivisionCode',
          colSpan: 0,
          // width: '8%',
          width: '13%',
        },
        {
          title: '매출항목',
          className: 'column-center',
          dataIndex: 'ItemName',
          colSpan: 0,
          // width: '8%',
          width: '13%',
        },
      ],
    },
    {
      title: '등록일',
      className: 'column-center',
      dataIndex: 'RegDate',
      // width: '16%',
      width: '9%',
    },
    {
      title: '사용여부',
      className: 'column-center',
      dataIndex: 'IsUse',
      // width: '16%',
      width: '9%',
      scopedSlots: { customRender: 'isUseSlot' },
    },
    {
      title: '비고',
      className: 'column-center',
      dataIndex: 'Note',
      width: '16%',
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

  tableDatas = [];

  @Emit()
  refresh() {
    this.showModal = false;
    this.showEditModal = false;
    this.getRentalSalesAccountItems();
  }

  priceFormatter = priceFormatter

  pagination = {
    pageSize: 10
  };
  
  customerEdit(seq:string) {
    this.editId = seq;
    this.showEditModal = true;
  }

  divisionChange(value: any) {
    // console.log(`selected ${value}`);
    this.divisionCode = value;
    this.getRentalSalesItems();
  }

  salesItemChange(value: any) {
    this.salesItem = value;
  }

  onChange(checked:boolean) {
    // console.log(`a-switch to ${checked}`);
  }

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

  async getRentalSalesItems() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesItems', {
        params: {
          divisionCode: this.divisionCode,
          searchKeyword: ''
        }
      });

      if(respones.data !== null && respones.data !== undefined) {
        this.salesItems = respones.data;

      } else {
        alert('임대매출 항목 데이터 조회 실패');
      }
    } catch(e) {
      console.log('임대매출 항목 구분 데이터 조회 실패 : ' + e);
      alert('임대매출 항목 데이터 조회 실패');
    }
  }

  async getRentalSalesAccountItems() {
    try {
      const respones = await this.$axios.get(this.SalesItemUrl + '/rentalSalesAccountItems', {
        params: {
          divisionCode: this.divisionCode,
          salesItem: this.salesItem,
          searchKeyword: this.searchKeyword
        }
      });

      if(respones.data !== null && respones.data !== undefined && respones !== null) {
        this.tableDatas = respones.data;

      } else {
        alert('거래처 데이터 조회 실패');
      }
    } catch(e) {
      console.log('거래처 데이터 조회 실패 : ' + e);
      alert('거래처 데이터 조회 실패');
    }
  }

  async onLoad() {
    await this.getRentalSalesItemTypes();
    await this.getRentalSalesItems();
    await this.getRentalSalesAccountItems();
  }

  created() {
   
  }

  mounted() {
    this.onLoad();
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

#accountManagement td {
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