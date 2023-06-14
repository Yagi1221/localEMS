<template>
    <div class="row"    >
       <el-tabs  v-model="TabActiveName" @tab-change="TabChange" :lazy="true">
        <el-tab-pane  label="ECI" name="ECI">
              <RackECI :equipment_id="equipment_id"></RackECI>
        </el-tab-pane>
        <el-tab-pane  label="電壓" name="v">
          <myChartV :equipment_id="equipment_id"></myChartV>
        </el-tab-pane>
        <el-tab-pane  label="溫度" name="t">
              <myChartT :equipment_id="equipment_id"></myChartT>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script >
import { getCabinetRockInfo } from '@/api/Api.js';
 import Plotly from 'plotly.js/dist/plotly';
import myChartV from '@/components/ChartV.vue';
import myChartT from '@/components/ChartT.vue';
import RackECI from '@/components/RackECI.vue';

    export default {
      props: {
        equipment_id: String,
        ClickPlace: String,
      }, 
      components: {
        myChartV,myChartT,RackECI
      },
        data() {
            return { 
              Drawed: {
                v: false,
                t: false,
              },
              TabActiveName: this.ClickPlace,
              ApiRequest: {
                getCabinetRockInfo : {
                  field_id: this.$store.getters.getField,
                  rack_id: this.equipment_id,
                  datetime: '',
                  query_type: '1',
                },
              },
              ApiResult: {
                getCabinetRockInfo_V : {},
                getCabinetRockInfo_T : {},
              },
              colorscale: [
                [0, 'darkblue'],
                [0.5, 'orange'],
                [1, 'darkred']
              ],
              plotlyLayout: {
                margin: { t:50 , b:25 },
              },
              plotlyConfig: {
                responsive: true,
                displaylogo: false,
                displayModeBar: false,
              },
            }
        },
        created() {
          // this.getData();
        },
        watch: {
        },
        computed:{ 
          ChartDataV:function () { 
            var tempLength = this.ApiResult.getCabinetRockInfo_V[Object.getOwnPropertyNames(this.ApiResult.getCabinetRockInfo_V)[0]].length;
            var x1 = [];
            for(var i = 0 ; i < tempLength; i++){
              x1.push(i+1);
            }
            var data = Object.getOwnPropertyNames(this.ApiResult.getCabinetRockInfo_V).map((item) =>　{
                  return {
                    x : [ x1.map(()=> {return item}), x1 ],
                    y: this.ApiResult.getCabinetRockInfo_V[item],
                    name: item,
                    type: 'bar'
                  }
              }); 
            return data;
          } ,
          ChartDataT:function () { 
            return [{
              colorscale : this.colorscale,
              z: Object.getOwnPropertyNames(this.ApiResult.getCabinetRockInfo_T).map((item) =>　{
                  return this.ApiResult.getCabinetRockInfo_T[item];
              }),
              y: Object.getOwnPropertyNames(this.ApiResult.getCabinetRockInfo_T ),
              type: 'heatmap',
              zsmooth: 'best',
              connectgaps: true,
            }];
          } 
        },
        methods: {
          TabChange(name) {
            if (name == 't' ) {
              if (!this.Drawed[name]) {
                 
                  this.Drawed[name] = true;
                  // this.getT();
            
              }
            }
          },
          getT() {
            const vm = this;
            // vm.ApiResult.getCabinetRockInfo_T = vm.DemoRackInfoTemp.data;
            // Plotly.newPlot("ChartT", vm.ChartDataT, {}, vm.plotlyConfig);
            vm.ApiRequest.getCabinetRockInfo.query_type = "0";
            getCabinetRockInfo(vm.ApiRequest.getCabinetRockInfo)
              .then((response) => {
                if (response.data.message.toLowerCase() == "success") {
                  vm.ApiResult.getCabinetRockInfo_T = response.data.data;
                  Plotly.newPlot("ChartT", vm.ChartDataT,vm.plotlyLayout, vm.plotlyConfig);
                } else {
                  vm.$message({ type:'error' , message:response.data.message });
                } 
              })
              .catch((response) => {})
              .finally(() => { });
          },
          getData() {
            const vm = this;
            // vm.ApiResult.getCabinetRockInfo_V = vm.DemoRackInfo.data;
            // this.$nextTick(function () {
            //   Plotly.newPlot("ChartV", this.ChartDataV,this.plotlyLayout, this.plotlyConfig);
            // });
            
            vm.ApiRequest.getCabinetRockInfo.query_type = "1";
            getCabinetRockInfo(vm.ApiRequest.getCabinetRockInfo)
              .then((response) => {
                if (response.data.message.toLowerCase() == "success") {
                  vm.ApiResult.getCabinetRockInfo_V = response.data.data;
                  
                  Plotly.newPlot("ChartV", vm.ChartDataV,{}, vm.plotlyConfig);
                } else {
                  vm.$message({ type:'error' , message:response.data.message });
                } 
              })
              .catch((response) => {})
              .finally(() => { });

            
          },
        },
    };
</script>
<style> 
</style>