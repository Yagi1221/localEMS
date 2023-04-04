2<template>
<h5 class="text-center mt-3 mb-0">SOH</h5>
  <div id="TASCO_ChartGaugeSOH" style="height:250px;"></div>
</template>

<script >
import * as echarts from "echarts";
 
    export default {
      props: {
        socketData: {
          type: Object,
          default: {},
        }
      },
      components: {
         echarts
      },
      data() {
          return {
              ChartObj: null,
              
          };
      },
      computed : {
        setOption: function () {
          return  {
                    series: [
                      {
                        type: 'gauge',
                        axisLine: {
                          lineStyle: {
                            width: 10,
                            color: [
                              
                              [1, 'limegreen']
                            ]
                          }
                        },
                        pointer: {
                          itemStyle: {
                            color: 'auto'
                          }
                        },
                        axisTick: {
                          distance: -10,
                          length: 4,
                          lineStyle: {
                            color: '#fff',
                            width: 1
                          }
                        },
                        splitLine: {
                          distance: -30,
                          length: 30,
                          lineStyle: {
                            color: '#fff',
                            width: 2
                          }
                        },
                        axisLabel: {
                          color: 'auto',
                          distance: 15,
                          fontSize: 10
                        },
                        detail: {
                          valueAnimation: true,
                          formatter: '{value}%',
                          color: 'auto',
                          fontSize: 20,
                          offsetCenter: [0, '70%'],
                        },
                        data: [
                          {
                            value: this.socketData.SOH?.toFixed(2), 
                          }
                        ]
                      }
                    ]
                  }
        } 
        
      },
      mounted(){
          this.initChart();
      },
      created() {
      },
        watch: {
          "socketData" :  {
            handler: function () {
              this.initChart();
            },
            deep:true,
            immediate:false,
          }
        },
      
        methods: {
      
          initChart(){
            const vm = this;
            this.$nextTick(function () {
              if (!vm.ChartObj){
                vm.ChartObj = echarts.init(document.getElementById("TASCO_ChartGaugeSOH"));
              }
              vm.ChartObj.setOption( this.setOption ); 
            });
          },
        }
    };
</script>
<style>
</style>