/* eslint-disable no-prototype-builtins */
import { LocalStorage } from 'quasar'
import axios from 'axios';

export default {
    namespaced: true,
    state: {
      name: '',
      user_id:'',
      role: '',
      email: '',
      logout: false,
    },
    getters: {
      GET_PROFILE(state) {
        return {
          user_id: state.user_id,
          name: state.name,
          role: state.role,
          email: state.email,
        }
      },
      GET_LOGOUT_STATUS(state){
        return state.logout
      }
    },
    mutations: {
      SET_ACCESS_TOKEN(state, token) {
        localStorage.setItem("access_token", token);
      },
     SET_PROFILE(state, data) {
      state.user_id    = data.id
      state.name    = data.name
      state.role  = data.role
      state.email   = data.email
     },
     RESET(state) {
      state = {
        role_id: null,
        role_name: '',
        name: '',
        email: ''
      }
     },
     LOGOUT_USER(state){
        state.logout    = true
     },
     LOGIN_USER(state){
        state.logout    = false
     }
    },
    actions: {
      async login(context, payload) {
        try {
          context.commit('LOGIN_USER')
          const response = await this.$axios.post('/api/login', {
            email: payload.username,
            password: payload.password,
          });
          if (response.data.access_token) {
            context.commit("SET_ACCESS_TOKEN", response.data.access_token);
            // console.log(response.data.access_token)
            this.$router.push('/').then(() => {
              this.$router.go()
            });
          }
          return Promise.resolve(response);
        } catch (error) {
          return Promise.reject(error.response);
        }
      },
      async logout(context, payload) {
        context.commit('LOGOUT_USER')
        // console.log("Logout payload",payload)
          await this.$axios.post('/api/logout',  {
           user_id: payload.user_id,
         })
           .then(response => {
             if (response.data.status == 'success') {
               context.commit("RESET");
               localStorage.removeItem("access_token");
                this.$router.push('/').then(() => {
                  this.$router.go()
                });
             }            
           })
           .catch(error => {
             console.log(error)
           })
       },
 
      async getProfile (context) {
        if (localStorage.getItem('access_token')) {
          await this.$axios.get('/api/user')
              .then(response => {
                console.log(response.data)
                context.commit("SET_PROFILE", response.data)
              })
              .catch(error => {
              })
          return true;
        } else {
          this.$router.push('/login')
        }
      },
      async checkAuth(context){
        await this.$axios.post('/api/check_auth')
        .then(response => {
            if(response.data.expire){
                context.commit("SET_ACCESS_TOKEN", response.data.new_access_token);
            }
        })
        .catch(error => {
            return Promise.reject(error)
        })
      }
    }
  }
