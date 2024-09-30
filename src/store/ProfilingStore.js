import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        categories:[],
        loading: false
    },
    getters: {
        GET_ALL_PRODUCTS (state) {
            return state.categories
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_PRODUCTS (state, categories) {
            state.categories = categories
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getProducts(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/products')
                .then(response => {
                    context.commit("SET_ALL_PRODUCTS", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleProduct(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/products', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleProduct(context, payload) {
            await this.$axios.put('/api/settings/products/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_PRODUCTS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleProduct(context, payload) {
            await this.$axios.delete('/api/settings/products/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_PRODUCTS", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  