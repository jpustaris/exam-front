import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        blotters:[],
        loading: false
    },
    getters: {
        GET_ALL_BLOTTERS (state) {
            return state.blotters
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_BLOTTERS (state, blotters) {
            state.blotters = blotters
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getBlotters(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/blotters')
                .then(response => {
                    context.commit("SET_ALL_BLOTTERS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleBlotter(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/blotters', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleBlotter(context, payload) {
            await this.$axios.put('/api/settings/blotters/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_BLOTTERS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleBlotter(context, payload) {
            await this.$axios.delete('/api/settings/blotters/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_BLOTTERS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  