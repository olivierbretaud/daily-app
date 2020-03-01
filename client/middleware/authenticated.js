export default function ({ store, redirect }) {
  if (store.state.auth) {
    console.log(store.state.auth)
    return redirect('/secret')
  }
}
