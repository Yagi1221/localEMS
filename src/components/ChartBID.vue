<template>
  <div class="pt-3 ps-3">
    <div v-if="socketData.length == 0">
      <p class="text-center">無得標排程</p>
    </div>
    <div class="border-bottom" v-else  v-for="item in socketData" :key="item.case_id">
      <p class="text-center fs-4">{{socketData.length == 1 ? "得標執行狀態" : item.case_id}}</p>
      <div :id="item.case_id" style="height:30vh"></div>
    </div>
  </div>
</template>

<script >
import newwebsocket from '@/lib/NewWebSocket.js';
import * as echarts from "echarts";
import moment from 'moment';

    export default {
      props :{
         
      },
      components:{
      },
        data() {
          this.ChartObj = [];
          return {
            moment,
            socket:null,
            socketData:[],
            CaseList: [],
            plotlyConfig: {
                responsive: true,
                displaylogo: false,
                displayModeBar: false,
            }, 
            PlotlyLayoutSBSPM: {
              margin: { t:50  },
              legend:{
                xanchor:'right',
                x:1.2,
                yanchor:'middle',
                y:1.2,
              },
              yaxis: {
                range:[0,3],
                dtick: 0.5,
                title: '得標容量', 
              }, 
              yaxis2: {
                range:[0,100],
                title: 'SBSPM',
                overlaying: 'y',
                side:'right', 
              },
              legend:{ x:1.2, xanchor:'right', y:1.2, },
            }, 

          };
        },
        computed: {
           
        },
        created() {
            this.CreateSocket();
        },
        mounted(){
             
        },
        unmounted() {
            this.socket.close();
        },
        watch: {
          socketData: {
            handler(newVal) {
              this.DrawSBSPM();
            },
            immediate: false,
            deep:true,

          }
        },
        methods: {  
          getChartData(SocketDataItem){
              var nowHour = ("0" + moment().hour()).substr(-2);
              var beforeInd = SocketDataItem.bid_info.time.findIndex((x) => {return x == nowHour }) ;
              
              var BIDData = SocketDataItem.bid_info.y2.map((x,ind) => {
                if (SocketDataItem.bid_info.is_abandon[ind]) {
                  return {
                          value: x,
                          itemStyle: {
                            color: 'gray',
                          }
                        };
                } else if (ind <= beforeInd ) {
                  return {
                          value: x,
                          itemStyle: {
                            color: 'steelblue',
                          }
                        };
                } else {
                  return {
                          value: x,
                          itemStyle: {
                            color: 'skyblue',
                          }
                        };
                }
              })
              debugger;
              var SPSBPMData = SocketDataItem.bid_info.y1.map((x,ind) => {
                if (ind <= beforeInd) {
                  return x * 100;
                } else {
                  return null;
                }
              })

              var option = {
                 tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['得標容量', '執行率']
                },
                xAxis: {
                  type: 'category',
                  data: SocketDataItem.bid_info.time
                },
                yAxis:  [
                  {
                    type: 'value',
                    name: '執行率',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                      formatter: '{value} %'
                    }
                  },
                  {
                    type: 'value',
                    name: '得標容量',
                    interval: 1,
                    axisLabel: {
                      formatter: '{value} MW'
                    }
                  },
                ] ,
                series: [
                  {
                    name:"執行率",
                    data: SPSBPMData,
                    type: 'line',
                    smooth: true,
                    // showSymbol:false,
                    itemStyle: {
                      color: 'green'
                    },
                    tooltip: {
                      valueFormatter: function (value) {
                        return value ? value?.toFixed(2) + ' %' : "未執行";
                      }
                    },
                  },
                  {
                    name:"得標容量",
                    yAxisIndex: 1,
                    data: BIDData,
                    type: 'bar',
                    itemStyle: {
                      color: 'steelblue'
                    },
                    tooltip: {
                      valueFormatter: function (value) {
                        return value + ' MW';
                      }
                    },
                  }
                ]
              };
 
            return option;
          },
          DrawSBSPM() {
            const vm = this;
            vm.$nextTick(function () {
              vm.socketData.forEach(x=>{
                var findChart = vm.ChartObj.find(x=> { return x.case_id == x.case_id });
                if (findChart ) {
                  if (findChart.chart) {
                   findChart.chart.setOption( vm.getChartData(x) ); 
                  } else {
                    let chart = echarts.init(document.getElementById(x.case_id));
                    chart.setOption( vm.getChartData(x) ); 
                    findChart.push({case_id : x.case_id , chart : chart})
                  }
                } else {
                  let chart = echarts.init(document.getElementById(x.case_id));
                  chart.setOption( vm.getChartData(x) ); 
                  vm.ChartObj.push({case_id : x.case_id , chart : chart})
                }
              });
            });
          },
            CreateSocket() {
              const vm = this;
              function MessageCallBack(SocketData) {
                vm.socketData =   JSON.parse(SocketData);
              }

              vm.socket = newwebsocket(MessageCallBack , null , 'bids');
            },
        },
    };
</script>