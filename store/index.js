export const state = () => ({
  isAuthenticated: false,
  accessToken: '',
  localStorageToken: '',
})


export const mutations = {
  // logIn(state, obj) {
  //   //state.isAuthenticated = true;
  // },
  // logOut(state) {
    
  // },
  setToken(state, token) {
    state.accessToken = token;
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  // getToken(state) {
  //   state.localStorageToken = this. window.localStorage.getItem("access-token");
  // },
}


export const actions = {
  // getToken() {
  //   this.storage();
  //   // state.localStorageToken = window.localStorage.getItem("access-token");
  //   return localStorage.getItem("access-token");
  // },

  // async login({ commit }, loginObj) {
  //   if (loginObj.id === null || loginObj.id === "") {
  //     alert("아이디를 입력 바랍니다.");
  //     return;
  //   }
  //   if (loginObj.pw === null || loginObj.pw === "") {
  //     alert("비밀번호를 입력 바랍니다.");
  //     return;
  //   }

  //     await this.$axios.post(
  //       'https://localhost:44382/api/account' + "/login",
  //       {
  //         Id: this.id,
  //         Password: this.pw
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.msg === "PasswordWrong") {
  //         // commit('loginFail');
  //         alert("비밀번호가 일치하지 않습니다.");
          
  //       } else if (response.data.msg === "NoUsers") {
  //         // commit('loginFail');
  //         alert("관리자 계정이 아닙니다.");
          
  //       } else {
  //         // 발행된 토큰을 로컬 스토리지에 저장
  //         localStorage.setItem("access-token", response.data.token);
  //         // state.accessToken = response.data.token;

  //         // 발행된 토큰을 state에 저장
  //         commit('setToken', response.data.token);

  //         alert('로그인! : ' + state.accessToken);

          

  //         // dispatch로 getMemberInfo() 호출
  //         // dispatch("getMemberInfo");

  //         // 로컬 스토리지에 저장된 token을 가져옴
  //         // let token = localStorage.getItem("access-token");

  //         // 로컬 스토리지에 토큰이 존재하면
  //         // if (token != null) {
  //         //   let config = {
  //         //     headers: {
  //         //       "Authorization": "Bearer " + token // jwt get header format
  //         //     }
  //         //   }

  //         //   apiLogin
  //         //     .getUserInfo(config)
  //         //     .then((response) => {
  //         //       let selectedUser = null;

  //         //       selectedUser = {
  //         //         loginUserId: response.data.UserId,
  //         //         loginUserName: response.data.UserName
  //         //       }

  //         //       commit('loginSuccess', selectedUser);
  //         //       // 로그인 성공시 home 화면으로 라우팅
  //         //       router.push("/");
  //         //     })
  //         //     .catch((e) => {
  //         //       console.log("login error : " + e);
  //         //       commit('loginFail');
  //         //       alert("로그인 중 오류가 발생하였습니다.");
  //         //     });
  //         // }
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("login error : " + e);
  //       commit('loginFail');
  //       alert("로그인 중 오류가 발생하였습니다.");
  //     });
  // },
}

// export const actions = {
//   logIn(state, obj) {
//     alert('store id : ' + obj.id + ', pw : ' + obj.pw);

//     if(obj.id === 'jinjoo' && (obj.pw === '1234' || obj.pw === 1234)) {
//       state.isAuthenticated = true;
//       state.auth = 'ok';
//       alert('store state.auth : ' + state.auth);
//     } else {
//       state.isAuthenticated = false;
//       alert('store isAuthenticated : ' + state.isAuthenticated);
//     }
//   }
// }

export const getters = {
  getAuthenticated(state) {
    return state.isAuthenticated;
  }
}