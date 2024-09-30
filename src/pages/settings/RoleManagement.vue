
<template>
  <div style="overflow: auto; height: 86vh;">
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Settings > Role Management</b></div>
                </div>
                <div class="col-6">
                    <div style="font-size: 15px; text-align: right"><b>Date: </b>{{this.todate}}</div>
                </div>
            </div>
      </div>
      <div style="margin-left: 15px; margin-top: 15px; font-size: 15px">
        <b>Filters:</b>
      </div>
      <div class="items-start q-pa-md row">
          <div class="col-sm-3 col-xs-6 q-pa-sm">
            <q-input class="textbox" rounded outlined v-model="filter" placeholder="Search" >
              <template v-slot:append>
                <q-avatar>
                    <q-icon name="search" />
                </q-avatar>
              </template>
            </q-input>
          </div>
          <div class="col-sm-3 col-xs-6 q-pa-sm">
            <div>
              <q-btn 
              :disabled="loading"
              :loading="loading" 
              class="q-mx-sm q-pa-md" 
              rounded  
              color="green" 
              icon-right="add" 
              label="Add User" 
              @click="openAddUserForm()" />
            </div>

          </div>
      </div> 

        
          <div class="q-pa-md" style="padding-top:20px">
              <q-table
                class="table"
                title="Role Management"
                :rows="rows"
                :columns="columns"
                row-key="name"
                :pagination="pagination"
                :filter="filter"
              >
              <template v-slot:body-cell-active="props">
                  <q-td :props="props">
                    <q-btn 
                    :disabled="loading"
                    :loading="loading" 
                    class="q-mx-sm bg-teal text-white" 
                    icon-right="edit" 
                    label="Edit User" 
                    @click="openEditUserForm(props)" />

                    <q-btn 
                    :disabled="loading"
                    :loading="loading" 
                    class="q-mx-sm bg-blue text-white" 
                    icon-right="fa-solid fa-eye" 
                    label="View User" 
                    @click="openViewUserForm(props)" />

                    <q-btn 
                    :disabled="loading"
                    :loading="loading" 
                    class="q-mx-sm" 
                    color="red" 
                    icon-right="delete" 
                    label="Disable User" 
                    @click="disableUserMethod(props)" />
                    <!-- <div>
                        <div v-if="props.value == 1">
                            <q-btn color="positive" icon="check" @click="clickToggle(props)" />
                        </div>
                        <div v-else>
                            <q-btn color="secondary" icon="close" @click="clickToggle(props)" />
                        </div>
                    </div> -->
                  </q-td>
                </template>
              </q-table>


              <!-- <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
                  <q-card class="bg-green text-white" style="width: 300px">
                    <q-card-section>
                      <div class="text-h6">Success</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        Updated Succesfully
                    </q-card-section>

                    <q-card-actions align="right" class="bg-white text-black">
                      <q-btn flat label="OK" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog> -->

                
                <q-dialog v-model="addUserForm" transition-show="scale" transition-hide="scale">
                  <q-card class="bg-green text-white" style="min-width: 400px">
                    <q-card-section>
                      <div class="text-h6">Add User Form</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <q-form
                        @submit="addUserMethod"
                        class="q-gutter-md"
                      >
                      <q-input
                          input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                          class="login-input"
                          outlined
                          v-model="name"
                          placeholder="Name"
                          lazy-rules
                          color="black"
                          bg-color="secondary"
                          label-color="primary"
                          no-error-icon
                        >
                        
                          <template v-slot:append>
                            <q-avatar>
                              <q-icon color="dark" name="fa-solid fa-user" />
                            </q-avatar>
                          </template>
                        </q-input>

                        <q-input
                          input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                          class="login-input"
                          outlined
                          v-model="email"
                          placeholder="Email"
                          lazy-rules
                          color="black"
                          bg-color="secondary"
                          label-color="primary"
                          no-error-icon
                        >
                          <template v-slot:append>
                            <q-avatar>
                              <q-icon color="dark" name="fa fa-envelope" />
                            </q-avatar>
                          </template>
                        </q-input>

                        <q-select 
                        class="select text-no-wrap" 
                        v-model="userRole" 
                        :options="roles" 
                        option-value="role_id" 
                        option-label="role_name" 
                        label="Role" 
                        emit-value 
                        map-options 
                        borderless/>

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
                         
                        >
                          <template v-slot:append>
                            <q-avatar>
                              <q-icon color="dark" name="fa-solid fa-lock" />
                            </q-avatar>
                          </template>
                        </q-input>
                        <q-card-actions align="right" >
                          <q-btn 
                          :disabled="loading"
                          :loading="loading" 
                          id="addSubmitBtn" 
                          class="text-center" 
                          label="Create New User" 
                          type="submit"/>
                        </q-card-actions>
                        
                      </q-form>
                    </q-card-section>

                    
                  </q-card>
                </q-dialog>

                <q-dialog v-model="editUserForm">
                <q-card class="bg-teal text-white" style="min-width: 400px">
                  <q-card-section>
                    <div class="text-h6">Edit User</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll" >
                    <q-form
                      @submit="editUserMethod"
                      class="q-gutter-md"
                    >
                      <q-input
                        color="black"
                        bg-color="secondary"
                        outlined
                        class="login-input"
                        v-model="editName"
                        label="Name"
                        hint="Name and surname"
                      />

                      <q-input
                        color="black"
                        bg-color="secondary"
                        outlined
                        class="login-input"
                        v-model="editEmail"
                        label="Email"
                      />

                      <q-select 
                        class="select text-no-wrap" 
                        v-model="editUserRole" 
                        :options="roles" 
                        option-value="role_id" 
                        option-label="role_name" 
                        label="Role" 
                        emit-value 
                        map-options 
                        borderless/>


                      <div>
                        <q-btn 
                        :disabled="loading"
                        :loading="loading" 
                        id="editSubmitBtn" 
                        label="Submit" 
                        type="submit" 
                        style="background-color: #006596"
                        />
                        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                      </div>
                    </q-form>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions align="right">
                    <q-btn flat label="Close" class="bg-teal text-white" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
          </div>
  </div>

  <q-dialog v-model="viewProductDialog">
    <q-card class="bg-blue text-white" style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">User Details</div>
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll" >

        <div>
          Name : {{ editName }}
        </div>
        <div>
          Email : {{ editEmail }}
        </div>
        <div>
          role : {{ editUserRoleName }}
        </div>

        

      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Close" style="background-color: #006596" class="text-white" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
 
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import { ref } from 'vue'
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
export default defineComponent({
  name: 'User Management',
  data: () => ({
      selected: ref([]),
      editUserRoleName:'',  
      filter: ref(''),
      name:'',
      email:'',
      editName:'',
      editEmail:'',
      password:'',
      userRole:'',
      editUserRole:'',
      addUserForm:false,
      editUserForm:false,
      rows:[],
      status:0,
      todate:date,
      prodFilter:ref(''),
      viewProductDialog:false,
      persistent: ref([false]),
      pagination: {
        page: 1,
        rowsPerPage: 25
      },
      columns : [
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          },
          { name: 'Email', label: 'Email',  field: row => row.email,align: 'left', sortable: true },
          { name: 'Role', label: 'Role',  field: row => row.user_role.role_name,align: 'center', sortable: true },
          {
            name: 'active',
            required: true,
            label: 'ACTION',
            align: 'center',
            field: row => row.id,
            format: val => `${val}`,
            sortable: true
          },
        ]
      }),
  computed: {
    ...mapGetters('Auth', {
      user: 'GET_PROFILE',
    }),    
    ...mapGetters('UserManagement', {
      users: 'GET_ALL_USERS',
      loading: "GET_LOADING",
    }),
    ...mapGetters('RoleManagement', {
      roles: 'GET_ALL_ROLES',
    }),
    ...mapActions('UserManagement',[
      'getUsers',
      'addSingleUser',
      'editSingleUser',
      'disableSingleUser',
    ]),
    ...mapActions('RoleManagement',[
      'getRoles',
    ])
  },
  methods: {

    async clickToggle(prop){
      if(prop.row.is_active==1){
        this.status=0;
      }else{
        this.status=1;
      }
    },

    async disableUserMethod(prop){
      console.log(prop);
      this.selected_id = prop.row.id;    
      await this.disableSingleUser({
        selected_id: this.selected_id,
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async openAddUserForm(){
      this.addUserForm = true;
    },

    async addUserMethod() {
      await this.addSingleUser({
        name: this.name,
        email: this.email,
        password: this.password,
        role_id: this.userRole
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        this.refresh()
    },

    async editUserMethod(){
      await this.editSingleUser({
        editName: this.editName,
        editEmail: this.editEmail,
        role_id: this.editUserRole,
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.refresh()
    },

    async refresh(){
      await this.getUsers;
      await this.getRoles;
      this.rows = this.users;
      this.addUserForm = false;
      this.editUserForm = false;
    },

    async openViewUserForm(prop){
      await this.setSelected(prop);
      this.viewProductDialog = true;
    },

    async setSelected(prop){
      console.log(prop);
      this.selected_id = prop.row.id;
      this.editName = prop.row.name;
      this.editEmail = prop.row.email;
      this.editUserRole = prop.row.role_id;
      this.editUserRoleName = prop.row.user_role.role_name;
    },

    async openEditUserForm(prop){
      console.log(prop);
      await this.setSelected(prop);
      this.editUserForm = true;
    },
  },
  // watch: { 

  // },
  async beforeMount(){
      // await this.getAllUsers;
        this.refresh()
        // console.log(this.users)
      
  },
})
</script>