<template>
  <div class="login-page">
    <div class="login-card">
      <div class="row">
        <div class="left-section col-md-6 col-sm-block d-flex justify-center align-center">
          <div class="image-container">
            <q-img
              src="~assets/generic-logo.jpg"
            />
          </div>
        </div>
        
        <div class="right-section col-md-6 col-sm-12">
          <div class="field-container">
            <div class="q-mb-lg  q-pb-lg">
                <p class="q-pb-lg text-center">Login to access your
                  <br><span class="text-title-login">Exam's Task System</span>
                </p>
              </div>  
            <q-form
              @autocomplete="false"
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                class="login-input"
                outlined
                v-model="username"
                placeholder="Email"
                lazy-rules
                color="black"
                bg-color="secondary"
                label-color="primary"
                no-error-icon
                :rules="[
                  val => val !== null && val !== '' || 'Please type your Email',
                ]"
              >
                <template v-slot:append>
                  <q-avatar>
                    <q-icon color="dark" name="fa fa-envelope" />
                  </q-avatar>
                </template>
              </q-input>
              <q-input
                input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                class="login-input"
                outlined
                type="password"
                v-model="password"
                placeholder="Password"
                lazy-rules
                color="dark"
                bg-color="secondary"
                label-color="primary"
                no-error-icon
                :rules="[
                  val => val !== null && val !== '' || 'Please type your Password',
                ]"
              >
                <template v-slot:append>
                  <q-avatar>
                    <q-icon color="dark" name="fa-solid fa-lock" />
                  </q-avatar>
                </template>
              </q-input>
              <div class="row justify-between">
                <q-btn class="login-btn" label="Log in" type="submit" text-color="secondary" :loading="loader"/>
                <!-- <q-btn label="Forgot Password?" flat @click="forgotPassword()"/> -->
              </div>
              
            </q-form>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{alert_title}}</div>
        </q-card-section>

        <q-card-section>
          {{ this.alert_message }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-if="activeSession" flat label="Cancel" color="red-12" class="text-weight-bolder text-dark" v-close-popup />
          <q-space />
          <q-btn v-if="activeSession" flat label="Okay" color="red-12" class="text-weight-bolder text-dark" @click="forceLogin()"/>
          <q-btn v-if="!activeSession" label="Okay" color="red-12" class="text-weight-bolder text-dark" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  data: () => ({
    loader: false,
    username: '',
    password: '',
    alert: false,
    alert_message: '',
    alert_title: '',
    activeSession: false,
  }),
  computed: {},
  methods: {
    ...mapActions('Auth', [
      'login'
    ]),

    async onSubmit() {
      this.loader = true
      await this.login({
        username: this.username,
        password: this.password,
        forcelogin: false
      })
        .then(response => {
          this.loader = false
          this.activeSession = false
          
          if(response.data.message =="Login successful"){
              this.activeSession = true
              this.alert_title = "Active Session!"
          }
        })
        .catch((error) => {
          this.loader = false
          if(error.status == 500){
            this.alert = true
            this.alert_title = "Error!"
            this.alert_message = error.data.message
          }
        })
    },


    // forgotPassword(){
    //     this.alert = true
    //     this.alert_title = "Forgot Password?"
    //     this.alert_message = "Contact CSI for Assistance.\nhelp@cloudshop.ph"
    // }
  }
})
</script>
