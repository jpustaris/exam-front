import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        seniors:[],
        loading: false
    },
    getters: {
        GET_ALL_SENIORS (state) {
            return state.seniors
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_SENIORS (state, seniors) {
            state.seniors = seniors
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getSeniors(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/seniors')
                .then(response => {
                    context.commit("SET_ALL_SENIORS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleSenior(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/seniors', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleSenior(context, payload) {
            await this.$axios.put('/api/settings/seniors/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_SENIORS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleSenior(context, payload) {
            await this.$axios.delete('/api/settings/seniors/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_SENIORS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  