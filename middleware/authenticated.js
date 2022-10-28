// export default function({ store, redirect, route }) {
//   if(typeof window !== 'undefined') {
//     const accessToken = window.localStorage.getItem("access-token");

//     if(accessToken === '' || accessToken === undefined || accessToken === null) {
//       return redirect('/login');
//     } else {

//       alert('access-token : ' + accessToken);
//     }
//   }
// }

// export default function ({ app }) {
//   app.router.beforeResolve((to, from, next) => {
//     alert('로그인');
//     next('/login');
//       // if (app.store.getters.isLoggedIn) {
//       //     next('/resource')
//       // } else {
//       //     next();
//       // }
//   });
// }

// export default function ({ store, redirect }) {
//   // const token: string | null = store.state.AccountStoreModule.token;
//   // const token = store.state.accessToken;
//   // const isAuthenticated = store.state.isAuthenticated;

//   if (!isAuthenticated) {

//     // 로컬 스토리지에 저장된 token을 가져옴
//     // const localStorageToken = this.localStorage.getItem("access-token");
//     // const localStorageToken = store.dispatch('getToken');

//     // console.log('[localStorageToken]');
//     // console.log(localStorageToken);
//     // console.log(store.state.localStorageToken);

//     return redirect('/login');
//   }
//   // if (!store.state.isAuthenticated) {
//   //   return redirect('/login')
//   // }
// }
