import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        certificates:[],
        loading: false
    },
    getters: {
        GET_ALL_CERTIFICATES (state) {
            return state.certificates
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_ALL_CERTIFICATES (state, certificates) {
            state.certificates = certificates
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
        async getCertificate(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/settings/certificates')
                .then(response => {
                    context.commit("SET_ALL_CERTIFICATES", response.data.data)
                })
                .catch(error => {
                })
            context.commit("SET_LOADING", false)
        },

        async addSingleCertificate(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/settings/certificates', {
                name: payload.name,
              }).then(response => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
            context.commit("SET_LOADING", false)
        },

        async editSingleCertificate(context, payload) {
            await this.$axios.put('/api/settings/certificates/'+ payload.selected_id , {
                name: payload.editName,
            }).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_CERTIFICATES", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },

        async disableSingleCertificate(context, payload) {
            await this.$axios.delete('/api/settings/certificates/'+ payload.selected_id).then(response => {
                    console.log(response.data)
                    context.commit("SET_ALL_CERTIFICATES", response.data.data)
            }).catch((error) => {
                    console.log(error)
                })
        },
    }
  }
  