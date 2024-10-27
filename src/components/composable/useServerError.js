// this is useServerError.js file
import sendAlert from './useSendAlert.js'
import handleCorsError from './handleCorsError.js'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import store from '@/store'
import router from '@/router.ts'
export default function serverError(error) {
  if (error?.response?.status === 500 || error?.response?.status === 503) {
    sendAlert('Server Error', 'error')
  }
  if (error?.response?.status === 401) {

    store.commit('logOut')

    router.push({
      name: 'Auth',
    })
    return
  }


  if (error?.response?.status === 0 && error.message === 'Network Error') {
    handleCorsError(error)
    return
  }

  if (error?.response?.data?.errors) {
    const keys = Object.keys(error.response.data.errors)
    if (keys.length > 0) {
      sendAlert(error.response.data.errors[keys[0]], 'error')
    }
  }
}
