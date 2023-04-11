<template>
 
  <div :id="chartId" style="height:500px;width:750px; margin: 0 auto"></div>
 
</template>

<script >
import * as echarts from "echarts";
import UUID from '@/lib/UUID.js';
import newwebsocket from '@/lib/NewWebSocket.js';

    export default {
      props: {   
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
          var model_y = Object.getOwnPropertyNames(this.SocketData.temp_list[0]);
          var model_y_title = [];
          for (var i = 0 ; i < 17 ; i++) {
            model_y_title.push("T" + i);
          }
          var data = [];
          var a = 0;
          var ind = 0;
          for( var i = 0 ; i < model_y.length ; i++ ) {
            if (ind == 16) {
              ind = 0;
              a = a + 1;
            }
              data.push([a , ind , this.SocketData.temp_list[0][model_y[i]]]);
            ind = ind + 1;
          }


         
          var option = {
            tooltip: {
              position: 'top'
            },
            grid: {
              height: '60%',
              top: '10%'
            },
            xAxis: {
              type: 'category',
              data: [0,1,2,3],
              // splitArea: {
              //   show: true
              // }
            },
            yAxis: {
              type: 'category',
              data: model_y_title,
              // splitArea: {
              //   show: true
              // }
            },
            visualMap: {
              min: 20,//28
              max: 35,//35
              // calculable: true,
              realtime:true,
              calculable: true,
              orient: 'horizontal',
              left: 'center',
              bottom: '10%',
              inRange: {
                          color: [
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027'
                          ]
                        },
              formatter: "{value}℃"
            },
            series: [
              {
                type: 'heatmap',
                data: data,
                label: {
                  show: true
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
           return option;
        },
      },
        data() {
            return {
              chartId: '', 
              ApiResult: {
                getCabinetRockInfo : {},
              },
              SocketData: {}, 
            };
        },
        mounted(){
          this.websocket();
        },
        unmounted() {
          this.socket.close();
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