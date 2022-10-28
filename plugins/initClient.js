export default function ({ store, redirect, route }) {
  if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('access-token')
    // const loggedStatus = store.getters['isLoggedIn']

    if (
      accessToken === '' ||
      accessToken === undefined ||
      accessToken === null
    ) {
      alert('access-token : ' + accessToken)
      return redirect('/login')
    } else {
      alert('access-token : ' + accessToken)
    }
  }

  // if (user) {
  //   if (route.path == '/login' || route.path == '/user/temporary') {
  //     return redirect('/')
  //   }
  //   return
  // }

  // if (!user) {
  //   return redirect('/login')
  // }
}
