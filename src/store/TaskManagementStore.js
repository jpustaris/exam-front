import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        tasks:[],
        loading: false
    },
    getters: {
        GET_ALL_TASKS (state) {
            return state.tasks
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_TASKS (state, tasks) {
            state.tasks = tasks
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getTasks(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/tasks')
                .then(response => {
                    context.commit("SET_ALL_TASKS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleTask(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/tasks', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleTask(context, payload) {
            await this.$axios.put('/api//tasks/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_TASKS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleTask(context, payload) {
            await this.$axios.delete('/api/tasks/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_TASKS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  