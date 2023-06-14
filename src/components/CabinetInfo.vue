<template>
    <div> 
       <div class="p-0 rounded-3  m-0">
          <div class=" p-0 d-flex justify-content-between align-items-end border-bottom">
            
            <div class="col-1"  >
              <ChartGauge title="BMS平均電量狀態" unit="%" :val="(socketData?.SOC)?.toFixed(2)" :color="ColorList.SOC.Percentage"></ChartGauge>
              </div>
            <div class="col-1"  >
              <ChartGauge title="環境溫度" unit="℃"  :val="socketData?.internal_temperature?.toFixed(1)" :color="ColorList.TemperatureEnv.Percentage"></ChartGauge>
            </div>
          
            <div class="col-1"  >
              <ChartGauge title="環境濕度" unit="%" :val="socketData?.internal_temperature?.toFixed(1)" :color="ColorList.Humidity.Percentage"></ChartGauge>
            </div>
           
            

            <div class=" rounded-3 p-1  col-1 ms-3 pb-5">
              <h5 class="text-center"> 消防系統 </h5>
              <div class="ps-1 pe-1 mt-auto"> <el-tag type="success" class="w-100 fs-5"> {{socketData?.fire_abnormal == false ? '正常' : "異常"}} </el-tag> </div>
            </div>
            <div class=" rounded-3 p-1  col-1 ms-3 pb-5">
              <h5 class="text-center"> 門禁系統 </h5>
              <div class="ps-1 pe-1 mt-auto"> <el-tag type="success" class="w-100 fs-5"> {{socketData?.door_abnormal == false ? '正常' : "異常"}} </el-tag> </div>
            </div>

            <div class=" rounded-3 p-1  col-1 ms-3  pb-4"    >
              <h5 class="text-center"> 直流電 </h5>
              <div class="ps-1 pe-1 mt-auto">
                <el-tag type="success" class="w-100 fs-5"> {{socketData?.dc_voltage?.toFixed(2)}} V</el-tag> 
                <el-tag type="success" class="w-100 fs-5"> {{socketData?.dc_ampere?.toFixed(2)}} A</el-tag> 
              </div>
            </div>
          </div>

          <div class=" p-0 d-flex mt-2 m-0 justify-content-between">

            <!-- pcs 資訊 -->
            <div class=" border-end rounded-3 p-1 col-3 pe-3 " style="min-width:300px"  >
              <p class="text-center fs-4"  >PCS</p>
              <div class="ms-2" style="">
                <ul class="list-group list-group-flush"> 
                  <li class="list-group-item"><b>PCS型號：</b>{{socketData?.equipment_id}}</li>
                  <li class="list-group-item"><b>系統頻率：</b>{{socketData?.frequency?.toFixed(2)}} Hz</li>
                  <li class="list-group-item"><b>視在功率：</b>{{socketData?.apparent_power?.toFixed(2)}} kWh</li>
                  <li class="list-group-item"><b>實功率：</b>{{socketData?.active_power?.toFixed(2)}} W</li>
                  <li class="list-group-item"><b>虛功率：</b>{{socketData?.reactive_power?.toFixed(2)}} W</li>
                  <li class="list-group-item"><b>三項電壓U：</b>{{socketData?.voltage_u?.toFixed(2)}} V / {{socketData?.ampere_u?.toFixed(2)}} A</li>
                  <li class="list-group-item"><b>三項電壓V：</b>{{socketData?.voltage_v?.toFixed(2)}} V / {{socketData?.ampere_w?.toFixed(2)}} A</li>
                  <li class="list-group-item"><b>三項電壓W：</b>{{socketData?.voltage_w?.toFixed(2)}} V / {{socketData?.ampere_v?.toFixed(2)}} A</li>
                </ul>
              </div>
            </div>
            <div class=" border-end rounded-3 p-3 col-7 me-3 " >
              <CabinetESSCI :equipment_id="socketData?.rack_info?.map(x=> {return x.eq_id})" v-if="socketData?.rack_info?.length" ></CabinetESSCI>
            </div>
            <!-- 電池資訊 -->
            <div class="   col-2">
              <div @click="outerVisible = true" class=""  >
                  <div class="m-0" style="flex-wrap:wrap;">
                    <div v-for="(item, ind) in socketData?.rack_info"  :key="ind" 
                          @click="ShowRackDetail(item.eq_id , ind)" class="rounded-2 col mb-3" style="" >
                      <div class="m-0 text-center">
                        <div>Rack {{ind + 1}}</div>
                      </div>
                      <div class="p-1 row m-0 p-0" @click="ClickPlace='v'">
                        <div style="width:20px"  >
                          <font-awesome-icon icon="battery-full" />
                        </div>
                        <div class="col" >
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="item.soc" :color="ColorList.SOC.Progress">
                              {{(item.soc ).toFixed(1)}}%
                          </el-progress>
                        </div>
                      </div>
                      <div class="p-1 row m-0 p-0" @click="ClickPlace='t'">
                        <div style="width:20px"  >
                          <font-awesome-icon icon="temperature-low" />
                        </div>
                        <div class="col" >
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="item.temp" :color="ColorList.TemperatureBMS.Progress">
                              {{item.temp.toFixed(1)}}&deg;C
                          </el-progress>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

        </div>
    </div>

      <el-dialog :title="RackDetailTitle" v-model="outerVisible" top="10px"  width="1100px" destroy-on-close="true" >
        <CabinetDetail :equipment_id="Rack_equipment_id" :ClickPlace=ClickPlace></CabinetDetail>
      </el-dialog>
</template>

<script >
import CabinetDetail from '@/components/CabinetDetail.vue';
import {computed} from 'vue';
import myBattary from '@/components/Battary.vue';
import ChartGauge from '@/components/ChartGauge.vue';
import CabinetESSCI from '@/components/CabinetESSCI.vue';
import ColorList from '@/JSON/ColorRange.json';

    export default {
      props: {
        socketData: Object,
      },
      components: {
        CabinetDetail,myBattary,ChartGauge,CabinetESSCI
      },
      data() {
          return {
            ColorList,
            equipment_id:'',
            ClickPlace:'ECI',
            CurrentTitle: computed(() => { return 

            }) ,
            Api: {
              getCabinetInfo: {
                field_id: this.$store.getters.getField,
                equipment_id: this.equipment_id,
              }
            },
            ApiResult : null,
            outerVisible: false,
            Rack_equipment_id:'',
            RackDetailTitle: '',
          };
        },
        computed:{
          RackList:function () {
             if (this.ApiResult?.bms[0]?.rack_list) {
                return this.ApiResult?.bms[0]?.rack_list.map(item => { return item.equipment_id});
             } else {
                return []
             }
          }
        },
        created() {
        
        },
        watch: {
        },
        methods: {
          ShowRackDetail(equipment_id , ind) {
            this.Rack_equipment_id = equipment_id;
            this.RackDetailTitle = 'Rack ' + (ind + 1);
            this.outerVisible = true;
          },
         
         
        },
    };
</script>
<style>

 
ul li {
    border-radius: unset;
}
/* .animate{
  animation: fadeInUp; 
  animation-duration: 1s;
 
} */
</style>