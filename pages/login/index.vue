<template>
  <div class="relative w-full main">
    <img
      src="~/assets/images/login.png"
      class="absolute top-0 left-0 w-full background-img z-0"
    />
    <div
      class="
        absolute
        top-0
        left-0
        w-full
        h-full
        z-10
        flex
        justify-center
        items-center
      "
    >
      <div
        class="
          w-[384px]
          h-[384px]
          flex
          justify-center
          items-center
          border border-[#e0e0e0]
          rounded-lg
          bg-white
        "
      >
        <div class="w-full flex flex-col">
          <div class="w-full flex justify-center items-center mb-4">
            <img src="~/assets/images/home-logo-color.png" class="w-64" />
          </div>
          <div class="w-full flex justify-center items-center mb-4 px-8">
            <input
              v-model="id"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              type="text"
              placeholder="아이디"
              @keyup.enter="logIn"
            />
          </div>
          <div class="w-full flex justify-center items-center mb-4 px-8">
            <input
              v-model="pw"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                mb-3
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              type="password"
              placeholder="비밀번호"
              @keyup.enter="logIn"
            />
          </div>
          <div class="w-full flex justify-center items-center px-8 mb-5">
            <button
              class="
                w-full
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none focus:shadow-outline
              "
              type="button"
              @click="logIn"
            >
              로그인
            </button>
          </div>
          <div class="w-full flex justify-end items-center pr-8">
            <p
              class="underline cursor-pointer mr-1 text-black"
              @click="goManagerPage"
            >
              POS 관리자 페이지 바로가기
            </p>
            <p class="cursor-pointer text-black" @click="goManagerPage">></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      pw: '',
    }
  },
  methods: {
    // async login({ commit }, loginObj) {
    async logIn() {
      if (this.id === null || this.id === '') {
        alert('아이디를 입력 바랍니다.')
        return
      }
      if (this.pw === null || this.pw === '') {
        alert('비밀번호를 입력 바랍니다.')
        return
      }

      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            Id: this.id,
            Password: this.pw,
          },
        })

        if (response.data.msg === 'PasswordWrong') {
          alert('비밀번호가 일치하지 않습니다.')
        } else if (response.data.msg === 'NoUsers') {
          alert('관리자 계정이 아닙니다.')
        } else {
          
          await this.$auth.setUser({
            id: this.id,
            password: '',
          });
            
          await this.$router.push({ path: '/' });
        }
      } catch (e) {
        alert('로그인 실패')
      }

      /*  await this.$axios
        .post('https://localhost:44382/api/account' + '/login', {
          Id: this.id,
          Password: this.pw,
        })
        .then((response) => {
          if (response.data.msg === 'PasswordWrong') {
            // commit('loginFail');
            alert('비밀번호가 일치하지 않습니다.')
          } else if (response.data.msg === 'NoUsers') {
            // commit('loginFail');
            alert('관리자 계정이 아닙니다.')
          } else {
            // 발행된 토큰을 로컬 스토리지에 저장
            localStorage.setItem('access-token', response.data.token)
            // state.accessToken = response.data.token;

            // 발행된 토큰을 state에 저장
            this.$store.commit('setToken', response.data.token)
            // alert('로그인! : ' + this.$store.state.accessToken);
            this.$store.commit('setAuthenticated', true)

            this.$router.push({ path: '/' })

            // dispatch로 getMemberInfo() 호출
            // dispatch("getMemberInfo");

            // 로컬 스토리지에 저장된 token을 가져옴
            // let token = localStorage.getItem("access-token");

            // 로컬 스토리지에 토큰이 존재하면
            // if (token != null) {
            //   let config = {
            //     headers: {
            //       "Authorization": "Bearer " + token // jwt get header format
            //     }
            //   }

            //   apiLogin
            //     .getUserInfo(config)
            //     .then((response) => {
            //       let selectedUser = null;

            //       selectedUser = {
            //         loginUserId: response.data.UserId,
            //         loginUserName: response.data.UserName
            //       }

            //       commit('loginSuccess', selectedUser);
            //       // 로그인 성공시 home 화면으로 라우팅
            //       router.push("/");
            //     })
            //     .catch((e) => {
            //       console.log("login error : " + e);
            //       commit('loginFail');
            //       alert("로그인 중 오류가 발생하였습니다.");
            //     });
            // }
          }
        })
        .catch((e) => {
          console.log('login error : ' + e)
          // commit('loginFail');
          alert('로그인 중 오류가 발생하였습니다.')
        }) */
      // await this.$store.commit('logIn', { id: this.id, pw: this.pw });
      // await this.$router.push({path: '/'});
    },
    // async logOut() {
    //   await this.$auth.logOut();
    // },

    goManagerPage() {
      window.open('https://asp.upsolution.co.kr', '_blank')
    },
  },
}
</script>

<style scoped>
.background-img {
  height: 100vh;
}

.main {
  height: 100vh;
}
</style>
