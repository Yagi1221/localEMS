<template>
  
  <div :id="chartId" style="height:500px;width:750px; margin: 0 auto"></div>
 
</template>

<script >
import * as echarts from "echarts";
import UUID from '@/lib/UUID.js';
import newwebsocket from '@/lib/NewWebSocket.js';

    export default {
      props: {  
        equipment_id: {
          type:String,
          default:''
        }, 
        height: {
          type:String,
          default:'450px'
        },
        equipment_id: {
          type:String,
          default:'',
        },
        ApiFunction: {
          type : Function,
          default:null
        },
        ApiParamater :{
          type: Object,
          default:null,
        },
      },
      components: {
         echarts
      },
      computed: {
        option:function () {
          let _min =  2.75;
          let _max = 3.5;
          var model_y = Object.getOwnPropertyNames(this.SocketData.volt_list[0]);
          var model_y_title = [];
          for (var i = 0 ; i < 17 ; i++) {
            model_y_title.push("v" + i);
          }


          var data = [];
          var a = 0;
          var ind = 0;
          for( var i = 0 ; i < 340 ; i++ ) {
            if (ind == 20) {
              ind = 0;
              a = a + 1;
            }
              data.push([a , ind , this.SocketData.volt_list[0][model_y[i]]]);
            ind = ind + 1;
          }

          return {
            tooltip: {},
            visualMap: {
              min: 3,//3
              max: 4, //4
              // splitNumber: 18,
              realtime:true,
              calculable: true,
              inRange: {
                color: [ '#313695', '#4575b4', '#74add1', '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026' ]
              },
              formatter :"{value}V"
            },
            xAxis3D: { type: 'category' , name: 'Serial', data: model_y_title  },
            yAxis3D: { type: 'category' , name: 'Model' },
            zAxis3D: { type: 'value' , name: 'Voltage' , min:_min , max:_max},
            grid3D: {
              viewControl :{ beta :50 ,alpha: 0},
            },
            series: [
              {
                type: 'bar3D',
                data: data , 
                itemStyle: {
                  opacity: 0.8
                },
              }
            ]
          }
        },
      },
        data() {
            return {
              chartId: '',
              socket: null,
              SocketData: {}, 
            };
        },
        mounted(){
           this.websocket();
        },
        created() {
          this.chartId = UUID();
        },
        watch: {
        },
        methods: {
          websocket() {
            const vm = this;
            
            function MessageCallBack(data) {
              debugger;
              vm.SocketData = JSON.parse(data).find(x=> {return x.equipment_id == vm.equipment_id});
              vm.initChart();
            }

            vm.socket = newwebsocket(MessageCallBack , null , 'thinjs_rack' , true);
          }, 
          initChart(){
            this.$nextTick(function () {
              let chart = echarts.init(document.getElementById(this.chartId));
              chart.setOption( this.option ); 
              chart.resize();
            });
          },
        }
    };
</script>
<style>
</style>