<template>
  <div :id="ChartId" style="height:150px"></div>
</template>

<script >
import * as echarts from "echarts";
import echartsGL from 'echarts-gl';

    export default {
      props: {
         chartObj: {
          type:Object,
          default:{  }
         }
      },
      components: {
         echarts
      },
        data() {
            return {
              ChartId: '',
              Chart: null,
              max_A:1587,
              max_V:550,
              max_K:1575,
            };
        },
        mounted(){
           this.initChart();
        },
        created() {
          this.ChartId = this.getUUID();
        },
        watch: {
           "chartObj" :  {
            handler: function () {
              this.reSetData();
            },
            deep:true,
            immediate:false,
          }
        },
        computed:{ 
          setOption:function () { 
            return {
                      series: [  
                        {
                          radius: '100%',
                          data: [{
                                  value: this.chartObj.kW ? (this.chartObj.kW / this.max_K) * 100 : 0,
                                  name: (this.chartObj.kW ? this.chartObj.kW.toFixed(2).toLocaleString() : 0) +' kW',
                                  title: { offsetCenter: ['0%', '-30%'] ,color:"#00a8ff" },
                                  itemStyle: { color: '#00a8ff'  },
                                },
                                {
                                  value: this.chartObj.voltage ? (this.chartObj.voltage / this.max_V) * 100 : 0,
                                  name: (this.chartObj.voltage ? this.chartObj.voltage.toFixed(2).toLocaleString() : 0) +' V',
                                  title: { offsetCenter: ['0%', '0%'],color:"#fbc531" },
                                  itemStyle: { color: '#fbc531'  },
                                },
                                {
                                  value: this.chartObj.ampere ? (this.chartObj.ampere / this.max_A) * 100 : 0,
                                  name: (this.chartObj.ampere ? this.chartObj.ampere.toFixed(2).toLocaleString() : 0) +' A',
                                  title: { offsetCenter: ['0%', '30%'],color:"#4cd137" },
                                  itemStyle: { color: '#4cd137'  },
                                }],
                          type: 'gauge',
                          startAngle: 90,
                          endAngle: -270,
                          pointer: {
                            show: false
                          },
                          progress: {
                            show: true,
                            overlap: false,
                            roundCap: true,
                            clip: false,
                            itemStyle: {
                              borderWidth: 0, 
                            }
                          },
                          axisLine: {
                            lineStyle: {
                              width: 10, 
                            }
                          },
                          splitLine: {
                            show: false,
                            distance: 0,
                            length: 10
                          },
                          axisTick: {
                            show: false
                          },
                          axisLabel: {
                            show: false,
                            distance: 50
                          },
                          
                          title: {
                            fontSize: 12
                          },
                          detail: {
                            show:false,
                          }
                        }
                      ]
                    }
          }
        },
        methods: {
          getUUID() {
            var d = Date.now();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
              d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
          },
          initChart(){
            this.$nextTick(function () {
              this.Chart = echarts.init(document.getElementById(this.ChartId));
              this.Chart.setOption( this.setOption ); 
              this.Chart.resize();
            });
          },
          reSetData() {
              this.Chart.setOption( this.setOption ); 
              this.Chart.resize();
          }
        }
    };
</script>
<style>
</style>