<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders bg-positive text-test">
      <q-header elevated class="bg-white" >
        <q-toolbar class="q-my-sm">
          <!-- <q-btn dense flat round icon="menu" class="row q-pa-md desktop-hide" @click="this.drawerState()" style="color:black"/> -->
          <q-btn color="primary" flat @click="drawer = !drawer" round dense>
            <q-avatar size="50px" square>
              <img src="~assets/generic-logo.jpg">
            </q-avatar>
          </q-btn>
          <q-space />
          <q-btn color="primary q-mx-lg" flat round dense>
          </q-btn>
          <q-btn class="bg-dark text-white text-bold" round dense :label="profile.name.charAt(0)">
            <q-menu>
              <q-list style="min-width: 220px" class="bg-white">
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="account_circle" />
                  </q-item-section>
                  <q-item-section>{{profile.name}}</q-item-section>
                </q-item>
                <q-item @click.capture="logoutUser" clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="logout"/>
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="260"
        :breakpoint="1300"
        bordered
        class="bg-white"
      >
        <q-scroll-area class="fit" :bar-style="{ borderRadius: '5px', background: '#FFF', opacity: 1, width: '5px' }" :thumb-style="{ right: '2px', borderRadius: '5px', background: '#E6E6E6', width: '5px', opacity: 1 }">
          <q-list padding>
            <q-item>
              <q-item-section class="main-title" v-if="!miniState">
                <span class="text-body1 text-weight-bolder text-center">{{profile.name}}</span>
              </q-item-section>
            </q-item> 

            <q-item class="temp-login-img q-mb-sm text-grey-7" v-if="!miniState">
              <q-icon name="account_circle" size="7rem"/>
            </q-item>
            <q-item class="temp-login-username" v-if="!miniState">
              <p class="text-grey-9">{{profile.email}}</p>
            </q-item>

            <div class="sidenav-list">
              <q-item to="/" clickable v-ripple exact  :class="{ 'selected-sidenav': $route.path === '/' }">
                <q-item-section avatar>
                  <q-avatar>
                    <q-tooltip class="bg-dark text-subtitle2" anchor="center right" self="center start" v-if="miniState">
                      Dashboard
                    </q-tooltip>
                    <q-icon name="fa-solid fa-area-chart" size="1.7rem"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-bold">
                  Dashboard
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item to="/task-management" clickable v-ripple exact  :class="{ 'selected-sidenav': $route.path === '/task-management' }">
                <q-item-section avatar>
                  <q-avatar>
                    <q-tooltip class="bg-dark text-subtitle2" anchor="center right" self="center start" v-if="miniState">
                      Task Management
                    </q-tooltip>
                    <q-icon name="fa-solid fa-file" size="1.7rem"/>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-bold">
                  Task Management
                </q-item-section>
              </q-item>

              <q-expansion-item
                expand-separator
                dense-toggle
                
                @click.stop="miniState = false"
                selected-color="dark"
                header-class="text-bold"
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-tooltip class="bg-dark text-subtitle2" anchor="center right" self="center start" v-if="miniState">
                        Settings
                      </q-tooltip>
                      <q-icon name="fa-solid fa-gears" size="1.7rem"/>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="text-bold">
                    Settings
                  </q-item-section>
                </template>
                <q-list>

                  <!-- <q-item v-if="profile.role_id == 3" to="/user-management"  clickable v-ripple exact> -->
                    <q-item  to="/settings/user-management"  clickable v-ripple exact :class="{ 'selected-sidenav': $route.path === '/settings/user-management' }">
                    <q-item-section class="q-item-section">
                      <span class="text-expansion">User Management</span>
                    </q-item-section>
                  </q-item>
                  <q-item  to="/settings/role-management"  clickable v-ripple exact :class="{ 'selected-sidenav': $route.path === '/settings/role-management' }">
                    <q-item-section class="q-item-section">
                      <span class="text-expansion">User Role Management</span>
                    </q-item-section>
                  </q-item>


                </q-list>
              </q-expansion-item>

              <q-separator />

              <q-item clickable v-ripple exact @click.capture="logoutUser" class="selected-sidenav">
                <q-item-section avatar>
                  <q-avatar>
                    <q-tooltip class="bg-dark text-subtitle2" anchor="center right" self="center start" v-if="miniState">
                      Logout
                    </q-tooltip>
                    <q-icon name="fa-solid fa-arrow-right-from-bracket" size="1.7rem"/>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-bold">
                  Logout
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
        <div class="q-mini-drawer-show absolute" style="top: 15px; right: -15px" v-if="miniState">
          <q-btn
            dense
            round
            unelevated
            color="grey-7"
            icon="chevron_right"
            @click="miniState = false"
          />
        </div>
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="grey-7"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>

 

    <q-inner-loading
      :showing="loader"
      :label="loader_text"
      label-class="text-dark"
      label-style="font-size: 1.1em"
    />
  </div>
</template>
<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const miniState = ref(false)

    return {
      drawer: ref(true),
      miniState: ref(true),

      drawerClick (e) {
        if (miniState.value) {
          miniState.value = false
          e.stopPropagation()
        }
      }
    }
  },
  computed: {
    ...mapGetters('Auth', {
      profile: 'GET_PROFILE',
    }),
  },
  data: () => ({
    loader: false,
    // confirm_dialog: false,
    notifLoading: false,
    currentNotifId: -1,
    alert: false,
    alertMessage: '',
    alertBGColor: 'bg-green',
    alertColor: 'text-green',
    loader_text: "",
  }),
  mounted() {
    if(!this.profile){
      this.getProfile();
    }
  },
  methods: {
    ...mapActions('Auth', [
      'logout',
      'getProfile',
    ]),
 
    async logoutUser(){
      console.log("Logout....")
         await this.logout({
        user_id: this.profile.user_id,
      })
    }
  },
  async beforeMount() {
    await this.getProfile();
    if(!this.profile){
      alert("Error retrieving profile details")
      await this.getProfile()
    }
  }
})
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media screen and (max-width: 600px) {
  .q-menu {
    width: 100%!important;
    max-width: 100%!important;
  }
}

.relay-select i{ /* removes carret-down in Store relay select-box*/
  color: transparent;
}
</style>
