import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        task_status:[],
        loading: false
    },
    getters: {
        GET_ALL_TASK_STATUS (state) {
            return state.task_status
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_TASK_STATUS (state, task_status) {
            state.task_status = task_status
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getTaskStatus(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/task-status')
                .then(response => {
                    context.commit("SET_ALL_TASK_STATUS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleTaskStatus(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/task-status', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleTaskStatus(context, payload) {
            await this.$axios.put('/api/task-status/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_TASK_STATUS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleTaskStatus(context, payload) {
            await this.$axios.delete('/api/tasks-status/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_TASK_STATUS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  