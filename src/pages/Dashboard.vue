
<template>
  <div style="overflow: auto; height: 86vh;">
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b> Dashboard </b></div>
                </div>
                <div class="col-6">
                    <div style="font-size: 15px; text-align: right"><b>Date: </b>{{this.todate}}</div>
                </div>
            </div>
      </div>
      <!-- <div style="margin-left: 15px; margin-top: 15px; font-size: 15px">
        <b>Filters:</b>
      </div> -->
      <!-- <div class="items-start q-pa-md row">
          <div class="col-sm-3 col-xs-6 q-pa-sm">
            <q-input class="textbox" rounded outlined v-model="filter" placeholder="Search" >
              <template v-slot:append>
                <q-avatar>
                    <q-icon name="search" />
                </q-avatar>
              </template>
            </q-input>
          </div>  
      </div>  -->

          
          <!-- <div class="q-pa-md" style="padding-top:20px">
              <q-table
                flat bordered
                color="primary"
                class="table"
                title="All Products"
                :rows="rows"
                :columns="columns"
                row-key="name"
                :pagination="pagination"
                :filter="filter"
                :loading="loading"
              >
              <template v-slot:body-cell-active="props">
                  <q-td :props="props">
                    <div>
                        <div v-if="props.value == 1">
                            <q-btn color="positive" icon="check" @click="clickToggle(props)" />
                        </div>
                        <div v-else>
                            <q-btn color="secondary" icon="close" @click="clickToggle(props)" />
                        </div>
                    </div>
                  </q-td>
                </template>
              </q-table>
                <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
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
                </q-dialog>
          </div> -->
  </div>

</template>

<script>
 
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import { ref } from 'vue'
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
export default defineComponent({
  name: 'All Products',
  data: () => ({
      selected: ref([]),
       filter: ref(''),
      rows:[],
      status:0,
      todate:date,
      prodFilter:ref(''),
      persistent: ref([false]),
      pagination: {
        page: 1,
        rowsPerPage: 25
      },
      columns : [
          {
            name: 'name',
            required: true,
            label: 'Product Name',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          },
          { name: 'Description', label: 'Description',  field: row => row.description, sortable: true,align: 'left' },
          { name: 'Price', label: 'Price',  field: row => row.price, sortable: true },
          { name: 'Category', label: 'Category',  field: row => row.category.name, sortable: true },
          {
            name: 'active',
            required: true,
            label: 'ACTION',
            align: 'left',
            field: row => row.is_active,
            format: val => `${val}`,
            sortable: true
          },
        ]
      }),
  computed: {
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    }),

  },
  methods: {
    //  ...mapActions('ProductAvailability', [
    //   'getStoreItems',
    //   'updateProductStatus',
    //   'getStoreItemsWithStatus'
    // ]),
    async clickToggle(prop){
      if(prop.row.is_active==1){
        this.status=0;
      }else{
        this.status=1;
      }
       console.log(prop.row.is_active);
        this.updateProductStatus({
            store_id: this.user.store_id,
            productID: prop.row.id,
            status: this.status
        }).then(async() => {
          this.persistent=true;
          //  await this.getStoreItems({
          //   store_id: this.user.store_id
          // }).then(() => {
          //   this.rows = this.storeProducts
          //   console.log(this.storeProducts)
          // })
              
        })
    },
    async toggleFilter(){
      console.log(this.prodFilter);

      if(this.prodFilter.value==1 || this.prodFilter.value==0 ){
        await this.getStoreItemsWithStatus({
        store_id: this.user.store_id,
        status: this.prodFilter.value
        }).then(() => {
          this.rows = this.storeProducts
        })

      }else{  
          // await this.getStoreItems({
          //   store_id: this.user.store_id
          // }).then(() => {
          //   this.rows = this.storeProducts
          //   console.log(this.storeProducts)
          // })
      }
    }
  },
  watch: { 
    user: {
      async handler(val){
        // do stuff
        // await this.getStoreItems({
        //   store_id: this.user.store_id
        // }).then(() => {
        //   this.rows = this.storeProducts
        //   console.log(this.storeProducts)
        // })
        },
      deep: true
    }
  },
  async beforeMount(){
      // await this.getStoreItems({
      //   store_id: this.user.store_id
      // }).then(() => {
      //   this.rows = this.storeProducts
      //   console.log(this.storeProducts)
      // })
     
  },
})
</script>

<style scoped>
</style>