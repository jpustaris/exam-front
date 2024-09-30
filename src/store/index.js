/* eslint-disable no-prototype-builtins */
import { createApp } from 'vue'
import { createStore } from 'vuex'
import Vuex from 'vuex'
import { axiosInstance } from 'src/utilities/axios'
import _ from 'lodash'

Vuex.Store.prototype.$axios = axiosInstance
Vuex.Store.prototype.$_ = _

const app = createApp({})
app.use(createStore)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */



export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Auth: require('./AuthStore').default,
      TaskStatus: require('./TaskStatusStore').default,
      TaskManagement: require('./TaskManagementStore').default,
      Dashboard: require('./DashboardStore').default,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
