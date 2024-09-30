
<template>
  <div style="overflow: auto; height: 86vh;">
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Task Management</b></div>
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
              label="Add Task" 
              @click="openAddTaskForm()" />
            </div>

          </div>
      </div> 

        
          <div class="q-pa-md" style="padding-top:20px">
              <q-table
                class="table"
                title="Task Management"
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
                    label="Edit Task" 
                    @click="openEditTaskForm(props)" />

                    <q-btn 
                    :disabled="loading"
                    :loading="loading" 
                    class="q-mx-sm bg-blue text-white" 
                    icon-right="fa-solid fa-eye" 
                    label="View Task" 
                    @click="openViewTaskForm(props)" />

                    <q-btn 
                    :disabled="loading"
                    :loading="loading" 
                    class="q-mx-sm" 
                    color="red" 
                    icon-right="delete" 
                    label="Disable Task" 
                    @click="disableTaskMethod(props)" />
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

                
                <q-dialog v-model="addTaskForm" transition-show="scale" transition-hide="scale">
                  <q-card class="bg-green text-white" style="min-width: 400px">
                    <q-card-section>
                      <div class="text-h6">Add Task Form</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <q-form
                        @submit="addTaskMethod"
                        class="q-gutter-md"
                      >
                      <q-input
                          input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                          class="login-input"
                          outlined
                          v-model="title"
                          placeholder="Title"
                          lazy-rules
                          color="black"
                          bg-color="secondary"
                          label-color="primary"
                          no-error-icon
                          :rules="[val => !!val || 'Field is required']"
                        >
                        
                          <template v-slot:append>
                            <q-avatar>
                              <q-icon color="dark" name="fa-solid fa-file" />
                            </q-avatar>
                          </template>
                        </q-input>

                        <q-input
                          input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                          class="login-input"
                          outlined
                          v-model="description"
                          placeholder="Description"
                          lazy-rules
                          color="black"
                          bg-color="secondary"
                          label-color="primary"
                          no-error-icon
                          :rules="[val => !!val || 'Field is required']"
                        >
                          <template v-slot:append>
                            <q-avatar>
                              <q-icon color="dark" name="fa fa-envelope" />
                            </q-avatar>
                          </template>
                        </q-input>
                        
                        <q-date
                          v-model="due_date"
                          title="Select Task Due Date"
                          :subtitle="due_date"
                          dark flat bordered
                          :rules="[val => !!val || 'Field is required']"
                        />

                        <q-file 
                        input-style="font-size: 18px; font-weight: 900; padding-left: 20px;"
                        outlined round
                        class="login-input"
                        bg-color="secondary"
                        color="teal-10"
                        label-color="teal-10"
                        v-model="taskAttachment" label="Task Attachment" />

                        <q-select 
                        class="select text-no-wrap" 
                        v-model="taskStatus" 
                        :options="taskStatusList" 
                        option-value="id" 
                        option-label="status_name" 
                        label="Task Status" 
                        emit-value 
                        map-options 
                        borderless/>

                        
                        <q-card-actions align="right" >
                          <q-btn 
                          :disabled="loading"
                          :loading="loading" 
                          id="addSubmitBtn" 
                          class="text-center" 
                          label="Create New Task" 
                          type="submit"/>
                        </q-card-actions>
                        
                      </q-form>
                    </q-card-section>

                    
                  </q-card>
                </q-dialog>

                <q-dialog v-model="editTaskForm">
                <q-card class="bg-teal text-white" style="min-width: 400px">
                  <q-card-section>
                    <div class="text-h6">Edit Task</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll" >
                    <q-form
                      @submit="editTaskMethod"
                      class="q-gutter-md"
                    >
                      <q-input
                        color="black"
                        bg-color="secondary"
                        outlined
                        class="login-input"
                        v-model="editTaskTitle"
                        label="Title"
                      />

                      <q-input
                        color="black"
                        bg-color="secondary"
                        outlined
                        class="login-input"
                        v-model="editTaskDescription"
                        label="Description"
                      />

                      <q-select 
                        class="select text-no-wrap" 
                        v-model="editTaskStatus" 
                        :options="taskStatusList" 
                        option-value="id" 
                        option-label="status_name" 
                        label="Task Status" 
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

  <q-dialog v-model="viewTaskDialog">
    <q-card class="bg-blue text-white" style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Task Details</div>
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll" >

        <div>
          Title : {{ editTaskTitle }}
        </div>
        <div>
          Description : {{ editTaskDescription }}
        </div>
        <div>
          Status : {{ editTaskStatusName }}
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
  name: 'Task Management',
  data: () => ({
      selected: ref([]),
      editTaskTitle:'', 
      editTaskDescription:'', 
      editTaskStatus:'',
      filter: ref(''),
      due_date: ref('2024/01/01'),
      taskTitle:'',
      taskDescription:'',
      taskStatus:'',
      
      
      addTaskForm:false,
      editTaskForm:false,
      rows:[],
      status:0,
      todate:date,
      prodFilter:ref(''),
      viewTaskDialog:false,
      persistent: ref([false]),
      pagination: {
        page: 1,
        rowsPerPage: 25
      },
      columns : [
          {
            name: 'Title',
            required: true,
            label: 'Title',
            align: 'left',
            field: row => row.title,
            format: val => `${val}`,
            sortable: true
          },
          { name: 'Description', label: 'description',  field: row => row.description,align: 'left', sortable: true },
          { name: 'Due Date', label: 'Due Date',  field: row => row.due_date == null ? 'N/A': row.due_date,align: 'left', sortable: true },
          { name: 'Status', label: 'Status',  field: row => row.status.status_name,align: 'left', sortable: true },
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
    ...mapGetters('TaskManagement', {
      tasks: 'GET_ALL_TASKS',
      loading: "GET_LOADING",
    }),
    ...mapGetters('TaskStatus', {
      taskStatusList: 'GET_ALL_TASK_STATUS',
    }),
    ...mapActions('TaskManagement',[
      'getTasks',
      'addSingleTask',
      'editSingleTask',
      'disableSingleTask',
    ]),
    ...mapActions('TaskStatus',[
      'getTaskStatus',
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

    async disableTaskMethod(prop){
      this.selected_id = prop.row.id;    
      await this.disableSingleTask({
        selected_id: this.selected_id,
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async openAddTaskForm(){
      this.addTaskForm = true;
    },

    async addTaskMethod() {
      await this.addSingleTask({
        title: this.title,
        description: this.description,
        status_id: this.status_id
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        this.refresh()
    },

    async editTaskMethod(){
      await this.editSingleTask({
        editTaskTitle: this.editTaskTitle,
        editTaskDescription: this.editTaskDescription,
        editTaskDueDate: this.editTaskDueDate,
        editTaskAttachment:this.taskAttachment,
        editTaskStatus : this.editTaskStatus,
      }).then(response => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.refresh()
    },

    async refresh(){
      await this.getTasks;
      await this.getTaskStatus;
      this.rows = this.tasks;
      this.addTaskForm = false;
      this.editTaskForm = false;
    },

    async openViewTaskForm(prop){
      await this.setSelected(prop);
      this.viewTaskDialog = true;
    },

    async setSelected(prop){
      console.log(prop);
      this.selected_id = prop.row.id;
      this.editTaskTitle = prop.row.title;
      this.editTaskDescription = prop.row.description;
      this.editTaskDueDate = prop.row.due_date;
      this.editTaskStatusName = prop.row.status.status_name;
    },

    async openEditTaskForm(prop){
      await this.setSelected(prop);
      this.editTaskForm = true;
    },
  },
  // watch: { 

  // },
  async beforeMount(){
    this.refresh()
  },
})
</script>