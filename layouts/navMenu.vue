<template>
  <div class="w-full flex justify-start">
    <div>
      <div class="w-full h-20 bg-[#001529] flex justify-start items-center">
        <span class="hover:cursor-pointer text-white mt-2" @click="goHome">
          <img src="~/assets/images/home-logo.png"  class="w-[200px] desktop:w-64 tablet:w-[200px]" />
        </span>
      </div>
    <a-menu
      mode="inline"
      theme="dark"
       class="menu w-[200px] desktop:w-64 tablet:w-[200px]"
       @click="handleClick"
    > 
      <a-menu-item key="1">
        <span>대시보드</span>
      </a-menu-item>
      <a-menu-item key="2">
        <span>경리일보</span>
      </a-menu-item>
      <a-menu-item key="3">
        <span>영업속보</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><span>부대매출 관리</span></span>
        <a-menu-item key="4">
          부대매출 현황
        </a-menu-item>
        <a-menu-item key="5">
          부대매출 항목관리
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><span>임대매출 관리</span></span>
        <a-menu-item key="6">
          임대매출 현황
        </a-menu-item>
        <a-menu-item key="7">
          거래처 관리
        </a-menu-item>
        <a-menu-item key="8">
          임대매출 항목관리
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <!-- <div class="w-full pl-4 h-20 bg-[#001529] flex justify-center items-center"> -->
    <div class="w-full h-20 bg-[#001529] flex justify-center items-center">
      <button class="cancle-btn" @click="logout">로그아웃</button>
    </div>
  </div>

    <Nuxt />
  </div>
</template>
<script>
// import { Component, Vue } from "nuxt-property-decorator";
export default {
  methods: {
    // handleClick(e: any) {
    handleClick(e) {
      // const menuKey: string = e.key;
      const menuKey = e.key;

      switch(menuKey) {
        // 대시보드
        case '1': this.$router.push({path: '/dashBoard'}); break;
        // 경리일보
        case '2': this.$router.push({path: '/accountingRecord'}); break;
        // 영업속보
        case '3': this.$router.push({path: '/flashReport'}); break;
        // 부대매출 관리 > 부대매출 현황
        case '4': this.$router.push({path: '/incidentalRevenueManagement/incidentalSalesStatus'}); break;
        // 부대매출 관리 > 부대매출 항목 관리
        case '5': this.$router.push({path: '/incidentalRevenueManagement/incidentalRevenueItemManagement'}); break;
        // 임대 매출 관리 > 임대 매출 현황
        case '6': this.$router.push({path: '/rentalRevenueManagement/rentalSalesStatus'}); break;
        // 임대 매출 관리 > 거래처 관리
        case '7': this.$router.push({path: '/rentalRevenueManagement/accountManagement'}); break;
        // 임대 매출 관리 > 임대매출 항목 관리
        case '8': this.$router.push({path: '/rentalRevenueManagement/rentalRevenueItemManagement'}); break;
      }
    },

    async logout() {
      if(confirm('로그아웃 하시겠습니까?')) {
        // await this.$auth.logout()
        await this.$auth.logout();
        await this.$router.push({path: '/login'});
        // await this.$router.replace({path: '/login'});
      }
    },

    goHome() {
      this.$router.push({path: '/'});
    }
  }
}

// @Component({})
// export default class Default extends Vue {
//   handleClick(e: any) {
//     // 메뉴 클릭
//     const menuKey: string = e.key;

//     switch(menuKey) {
//       // 경리일보 -  상세 매출 구분
//       case '3': this.$router.push({path: '/accountingdaily/detailedsales'}); break;
//       // 경리일보 - 결제수단별 매출
//       case '4': this.$router.push({path: '/accountingdaily/salespaymentmethod'}); break;
//     }
//   }

//   goHome() {
//     this.$router.push({path: '/'});
//   }
// }
</script>

<style scoped>
.menu {
  height: calc(100vh - 160px);
}
</style>