import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        healthworkers:[],
        loading: false
    },
    getters: {
        GET_ALL_HEALTHWORKERS (state) {
            return state.healthworkers
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_HEALTHWORKERS (state, healthworkers) {
            state.healthworkers = healthworkers
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getHealthWorkers(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/healthworkers')
                .then(response => {
                    context.commit("SET_ALL_HEALTHWORKERS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleHealthWorker(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/healthworkers', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleHealthWorker(context, payload) {
            await this.$axios.put('/api/settings/healthworkers/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_HEALTHWORKERS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleHealthWorker(context, payload) {
            await this.$axios.delete('/api/settings/healthworkers/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_HEALTHWORKERS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  