import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        pwds:[],
        loading: false
    },
    getters: {
        GET_ALL_PWDS (state) {
            return state.pwds
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_PWDS (state, pwds) {
            state.pwds = pwds
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getPWDs(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/PWDs')
                .then(response => {
                    context.commit("SET_ALL_PWDS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSinglePWD(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/PWDs', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSinglePWD(context, payload) {
            await this.$axios.put('/api/settings/PWDs/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_PWDS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSinglePWD(context, payload) {
            await this.$axios.delete('/api/settings/PWDs/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_PWDS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  