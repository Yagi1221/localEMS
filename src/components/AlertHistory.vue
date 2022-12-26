<template>


        <!-- 選擇bar -->
          <div class="d-flex justify-content-between align-items-center mt-3" style="">
              <el-form :model="Search" label-width="auto" inline>
                  <el-form-item label="起始時間" prop="start_time">
                      <el-date-picker v-model="Search.start_time" type="datetime" placeholder="請選擇日期時間" value-format="YYYYMMDDHHmmss"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="結束時間" prop="end_time">
                      <el-date-picker v-model="Search.end_time" type="datetime" placeholder="請選擇日期時間" value-format="YYYYMMDDHHmmss"></el-date-picker>
                  </el-form-item>
                  <el-form-item >
                    <el-button @click="SearchClick" class="ms-2">
                      <font-awesome-icon icon="search" />
                    </el-button>
                    <el-button @click="ExportClick" class="ms-2">
                      <font-awesome-icon icon="file-arrow-down" />
                    </el-button>
                  </el-form-item>
              </el-form>
          </div>
      <el-table  id="exTable" :data="DataList" size="small" stripe border class="rounded-3" header-cell-class-name="tableHeaderStyle" >
        <el-table-column width="100" label="告警" sortable prop="done_time">
          <template #default="scope">
            <font-awesome-icon v-if="scope.row.done_time == '-'" icon="lightbulb" class="text-danger"/>
            <font-awesome-icon v-else icon="lightbulb" class=""/>
          </template>
        </el-table-column>
        <el-table-column width="180" label="告警時間" sortable prop="time">
            <template #default="scope">
            {{ scope.row.time ? moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') : '' }}
          </template>
        </el-table-column>
        <el-table-column label="訊息" sortable prop="message"></el-table-column>
        <el-table-column width="180" label="解除時間" sortable prop="done_time">
            <template #default="scope">
            {{ scope.row.done_time != '-' ? moment(scope.row.done_time).format('YYYY-MM-DD HH:mm:ss') : '' }}
          </template>
        </el-table-column>
        <el-table-column width="150" label="持續時間" sortable prop="spend_time">
          <template #default="scope">
            {{ getDuration(scope.row.time,scope.row.done_time) }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination layout="prev, pager, next" class="d-flex justify-content-end"
          :total="DataCount" :current-page="Query.page" :page-size="Query.limit"
          @current-change="PageOnChange" 
      ></el-pagination>

</template>

<script >
import moment from 'moment';
import { getAlertHistorical , getEquipments , getAlertHistoricalExport , getFields } from '@/api/Api.js';
import libDownloadTxtCSV from '@/lib/libDownloadTxtCSV.js';

    export default {
      components:{
      },
        data() {
            return {
              moment,
              DataCount : 0,
              Query : {
                  start_time :'',
                  end_time :'',
                  limit :10,
                  page :1,
              },
              Api: {
                getEquipments: {
                  field_id:  this.$store.getters.getField,
                  parent_id:"",
                  type:"",
                  name:"",
                  status:"",
                  geo_location:"",
                  code:"",
                }
              },
              Search: {
                start_time: moment().add(-2, 'months').startOf('day').format("YYYYMMDDhhmmss") ,
                end_time: moment().endOf('day').format("YYYYMMDDhhmmss") ,
              }, 
              Option : {
                Level: [
                  {label:'全部',value:''},
                  {label:'事件',value:'1'},
                  {label:'一級警報',value:'2'},
                  {label:'二級警報',value:'3'},
                  {label:'三級警報',value:'4'},
                ],
                Equipment: [
                  {name:'全部', _id:''},
                ],
              },
              DataList: [],
              ApiResult: {
                getFields: [],
              }
            };
        },
        created() {
          this.SearchClick();
          this.getFields();
        },
        watch: {
        },
        methods: {
          getFields() {
            const vm = this;
            getFields()
            .then(response => {
              if (response.data.message == 'Success' ) {
                  vm.ApiResult.getFields = response.data.data;
              } else {
                  vm.$message({ type:'error' , message:response.data.message });
              }
            })
            .catch(response => {

            })
            .finally(() => {});
          },
          getDuration(begin, end) {
              var now = end != "-" ? moment(end) : moment();
              var beginTime = moment(begin);
              var duration = moment.duration(now.diff(beginTime));
              var hours = duration.asHours();
              return parseInt(hours).toLocaleString() + "小時";
          },
          ExportClick(){
            const vm = this;
            getAlertHistoricalExport(vm.Query)
            .then((response) => {
               libDownloadTxtCSV(response.data.data[0].data , 'AlerList');
            })
            .catch(() => {
              vm.$message({ type:'error' , message:"Error" });
            }).finally(() => {
            });
          },
          SearchClick() {
            this.Query = Object.assign(this.Query,this.Search);
            this.Query.page = 1;
            this.getDataList();
          },
          getEquipment(){
            const vm = this;
            //vm.$loading();  vm.$loading().close();
            var a =  this.$store.getters.getField;
            getEquipments(vm.Api.getEquipments)
            .then((response) => {
              this.Option.Equipment = this.Option.Equipment.concat(response.data.data) ;
            })
            .catch(() => {
              vm.$message({ type:'error' , message:"Error" });
            }).finally(() => {
            });
          },
          getLevelName (typeVal) {
            if (typeVal) {
              return this.Option.Level.find((item) => {return item.value == typeVal})?.label;
            }
            return typeVal;
          },
          getDataList() {
            const vm = this;
            getAlertHistorical(this.Query).then((response) => {
               if (response.data.message.toLowerCase() == "success") {
                  vm.DataList = response.data.data.data;
                  vm.DataCount = response.data.data.total_count;
               }  else {
                  vm.$message({ type:'error' , message:response.data.message });
               }
            })
            .catch(() => {
              vm.$message({ type:'error' , message:"Error" });
            }).finally(() => {
              vm.$loading().close();
            });
          },
          PageOnChange(currentPage){
                this.Query.page = currentPage;
                this.getDataList();
            }, 
        },
    };
</script>
<style>

</style>