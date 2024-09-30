<template>
  <div>
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Alert!</div>
        </q-card-section>

        <q-card-section>
          {{ dialogMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :loading="loading" flat label="Okay" color="red-12" class="text-weight-bolder text-dark" @click="dialog = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <router-view />
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
// import isOnline from 'is-online';

export default defineComponent({
  name: 'App',
  async beforeMount () { 
    await this.getProfile()
    // await this.getNotifications()
    if (this.profile.store_id && !this.islogout) {
      this.hasQue = true
      await this.getCurrentHubDec();
      await this.getHubDecList();
      this.hasQue = false
    }

    if (!this.hasQue && this.profile.store_id && !this.islogout) {
      setInterval(() => {
        this.checkAndMakeRequestCheckAuth()
        // console.log("CA", this.isRequestInProgress.checkAuth)
      }, this.setIntervals.checkAuth);


      setInterval(() => {
        this.checkAndMakeRequestNotification()
        // console.log("Notif", this.isRequestInProgress.notification)
      }, this.setIntervals.notification);
    }
  },
  data: () => ({
    hasQue: false,
    // audio: new Audio(require('assets/sounds/sound.mp3')),
    dialog: false,
    dialogMessage: '',
    loading: false,
    access_token: localStorage.getItem('access_token'),
    setIntervals: {
      // notification: process.env.NOTIFICATION_INTERVAL,
      // checkAuth: process.env.CHECK_AUTH_INTERVAL,
    },
    isRequestInProgress: {
      checkAuth: false,
      notification: false
    }
  }),

  computed: {
  
    ...mapGetters('Auth', {
      profile: 'GET_PROFILE',
      islogout: 'GET_LOGOUT_STATUS'
    }),
  },
  methods: {
    ...mapActions('Auth', [
      'getProfile',
      'checkAuth',
      'logout'
    ]),


    async clearTokens(){
        this.loading = true

        // Clear cookies
        document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });

        // Clear local storage
        localStorage.clear();

        this.loading = false

        // Redirect
        this.$router.go()
    },

    logoutUser(error){
        if (error.response) {
            // An authenticated user
            if(error.response.status === 401 && error.response.data.message === "Unauthenticated."){
                this.dialogMessage = 'You are being logout. Either your session has expired, or a new user has logged in.'
            }
            // User is locked by other user
            if(error.response.status === 403 && error.response.data.is_locked){
                this.dialogMessage = error.response.data.message
            }
        }
    },

    async makeRequestCheckAuth(){
      // if (this.access_token) {
      //   if (await isOnline() == false) {
      //     this.dialogMessage = "You are currently offline. Please check your network connection."
      //     this.dialog = true
      //   } else if (await isOnline() == true) {
      //     this.dialogMessage = ""
      //     this.dialog = false
      //   }
      // }

      this.hasQue = true

      this.isRequestInProgress.checkAuth = true
      await this.checkAuth().catch((error) => {
        if(!this.islogout){
          this.dialog = true
          this.logoutUser(error)
        }
      }).finally(() => {
        this.isRequestInProgress.checkAuth = false
      });

      this.hasQue = false
    },


    // async makeRequestNotification(){
    //   this.hasQue = true
    //   if (this.profile.role_id != 3) {
    //     this.isRequestInProgress.notification = true
    //     await this.getNotifications()
    //     .finally(() => {
    //       this.isRequestInProgress.notification = false
    //     })
    //   }
    //   this.hasQue = false
    // },

    // Function to check if we can make a request
    checkAndMakeRequestCheckAuth() {
      if (!this.isRequestInProgress.checkAuth) {
        this.makeRequestCheckAuth().finally(() => {
          this.isRequestInProgress.checkAuth = false //reset value again
        });
      }
    },


  },

})
</script>
