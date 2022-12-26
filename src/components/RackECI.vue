<template>
    <div class="row m-0 p-0" v-loading="ChartDiv.ECIChart.Loading">
      <div class="  col  m-0 p-0 me-2 border-bottom"  >
        <div :id="ChartDiv.ECIChart.Id"  style="width:1000px;height:250px"></div>
      </div>
    </div>
    <div class="row">
      <div class=" col m-0 p-0 border-end" >
        <div :id="ChartDiv.ICIChart.Id" style="height:250px"></div>
      </div>
      <div class=" col m-0 p-0"    >
        <div v-show="isV" :id="ChartDiv.RawChartV.Id" style="width:100%;height:250px;margin:0 15px"></div>
        <!-- <div v-show="!isV" :id="ChartDiv.RawChartT.Id" style="width:100%;height:250px;margin:0 15px"> -->
          <div v-if="!isV" class="row m-0 p-0" style="font-size: xx-small;">
             <div class="col-6">
              <div v-for="(item,ind) in TData.TDataListB" :key="ind" class="row m-0 p-0 border">
                <div class="col-4 p-0 m-0 bg-secondary text-white text-center d-flex align-items-center justify-content-center">{{item.label}}</div>
                <div class="col  p-0 m-0  row">
                  <div v-for="(itemData,indData) in item.data" :key="indData" class="text-center col-6 m-0 p-0">
                    <span :class="itemData == getMax ? 'text-danger' : (itemData == getMin ? 'text-primary' : '')">{{itemData}}</span>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div v-for="(item,ind) in TData.TDataListA" :key="ind" class="row m-0 p-0 border">
                <div class="col-4 p-0 m-0 bg-secondary text-white text-center d-flex align-items-center justify-content-center">{{item.label}}</div>
                <div class="col  p-0 m-0  row">
                  <div v-for="(itemData,indData) in item.data" :key="indData" class="text-center col-6 m-0 p-0">
                    <span :class="itemData == getMax ? 'text-danger' : (itemData == getMin ? 'text-primary' : '')">{{itemData}}</span>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    <!-- </div> -->
</template>
<script>
import moment from 'moment';
import { postCabinetECI } from '@/api/Api.js';
import { computed } from 'vue';
import Plotly from 'plotly.js/dist/plotly';
import UUID from '@/lib/UUID.js';
import * as echarts from "echarts";
import echartsGL from 'echarts-gl';

export default {
  name: 'RackECI',
  setup() { },
  props: {
    equipment_id: {
      type:String,
      default:''
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
  },
  data() {
    return {
      moment,
      _max : 0,
      _min : 9999,
      isV : true,
      chartIdECI:'',
      chartIdICI:'',
      threshold: 70,
      plotlyConfig: {
            responsive: true,
            displaylogo: false,
            displayModeBar: false,
      },
      getMax :computed(() => {
        return this._max.toFixed(2);

       }),
       getMin :computed(() => {
        return this._min.toFixed(2);

       }),
       TData:computed(() => {
        const vm = this;
        var TDataListA = [];
        var TDataListB = [];
        var _max = 0;
        var _min = 9999;
        var find = this.ApiResult.postCabinetECI.RAW.find((item) => { return item.key2 == 'T' && item.key == vm.ChartDiv.ECIChart.ClickValue});
       var tempdata = [];
       find.data.forEach((item,ind) => {
        if (item > vm._max) {
          vm._max = item;
        }
        if (item < vm._min) {
          vm._min = item;
        }
        tempdata.push(item.toFixed(2))
        if (tempdata.length == 4) {
          var tempname = ('0' + (parseInt( (ind /4),10) + 1));
          var data = {data: JSON.parse(JSON.stringify(tempdata)) , label: "CSC" + tempname };
          if (ind >= 36 ) {
            
            TDataListB.push( data );
          } else {
            TDataListA.push( data );
          }
          tempdata = [];
        }
        });
        TDataListA.reverse();
        return { TDataListA,TDataListB }
       }),
      ChartDiv: {
        ECIChart: {
          Id:'',
          Loading: false,
          Drawed: false,
          ChartData: [{
            x: computed(() => { return this.ApiResult.postCabinetECI.ECI.map((item) => { return item.key; }).slice(-20); }),
            y: computed(() => { return this.ApiResult.postCabinetECI.ECI.map((item) => { return item.value * 100}).slice(-20); }),
            name: 'ECI',
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              width: 1,
            },
          },
          {
            x: computed(() => { return this.ApiResult.postCabinetECI.ECI.map((item) => { return item.key; }).slice(-20); }),
            y: computed(() => { return this.ApiResult.postCabinetECI.ECI.map(() => { return this.threshold; }).slice(-20); }),
            name: 'Threshold',
            mode: 'lines',
            type: 'scatter',
            line: {
              width: 1,
              opacity: 0.6,
              color:'#44bd32',
            },
          }
          ],
          ChartLayout: {
            title: { text: 'ECI' },
            margin: {
                t:25,
                l:22,
                r:10,
                b:10,//有legend(threshold)時用這個
                // b:50,
            },
            // legend: {"orientation": "h"},
            xaxis: {
              automargin: true,
              type: 'category',
              zeroline: false,
              showline: false,
            },
            yaxis: {
              range: [0, 100],
              zeroline: false,
              showline: false,
            },
          },
          ClickValue: '',
        },
        ICIChart: {
          Id:'',
          Loading: false,
          Drawed: false,
          ChartData: computed(() => {
            const find = this.ApiResult.postCabinetECI.ICI.find((item) => { return item.key == this.ChartDiv.ECIChart.ClickValue; });
            
            
            const take10 = find.value.slice(0,10).reverse();
            // const take10 = find.value.reverse();
            // find.value.sort((a,b) => {
            //   return a.value - b.value;
            // });
            // let ABS = [];
            // ABS = ABS.concat(find.value.slice(0,8)).concat(find.value.slice(-8));

            // ABS.sort((a,b) => {
            //   if ( a.key > b.key) return -1;
            //   if ( a.key < b.key) return 1;
            //   return 0;
            // });

            return [{
            //   x: ABS.map((item) => { return item.value; }),
            //   y: ABS.map((item) => { return item.key; }),
                x: take10.map((item) => { return item.value; }),
                y: take10.map((item) => { return item.key; }),
                marker:{
                    color: take10.map((item) => { return item.value > 0 ? '#44bd32' : '#c23616'; })
                },
              name: 'ICI',
              type: 'bar',
              orientation: 'h',
            }];
          }),
          ChartLayout: {
            title: {
              text: computed(() => { return 'ICI-' + this.ChartDiv.ECIChart.ClickValue; }),
            },
            margin: {
                t:55,
                l:30,
                r:30,
                b:20,
            },
            yaxis: {
              automargin: true,
              type: 'category',
              showline: false,
            },
            xaxis: {
              tickformat: ',.0%',
              range: [-1, 1],
              showline: false,
            },
          },
          ClickValue: '',
        },
        RawChartV:{
          Id :'',
          ChartData: computed(() => { 
            const vm = this;
             var find = this.ApiResult.postCabinetECI.RAW.find((item)=> {
              return item.key2 == vm.ChartDiv.ICIChart.ClickValue && item.key == vm.ChartDiv.ECIChart.ClickValue
             });
            
            var result = {x:[], y:[],type: 'bar'};
            find.data.forEach((item,ind) => {
              result.x.push(ind+1);
              result.y.push(item);
            });
            return [result];
          }),
          ChartLayout:{
             title: {
                text:computed(() => { return this.ChartDiv.ICIChart.ClickValue }),
                 
              },
            margin: {
                t:55,
                l:50,
                r:30,
                b:20,
            },
            yaxis: {
              range: [0,5],
              // title :"V",
            },
            xaxis: {
              type: 'category',
            },
          },
        },
        RawChartT:{
          Id :'',
          ChartData: computed(() => { 
            const vm = this;
              var _max = 0;
              var _min = 9999;
              var data = [];
              var model_y = [];
              for (var i = 0 ; i <= 17 ; i++) {
                var tempname = ('0' + i);
                model_y.push('CSC' + tempname.substr(tempname.length - 2));
              }
              var serial_x = [1,2,3,4];
              var find = this.ApiResult.postCabinetECI.RAW.find((item) => { return item.key2 == 'T' && item.key == vm.ChartDiv.ECIChart.ClickValue});
              var tempValue = [];
              find.data.forEach((item,ind) => {
                if (item > _max) {
                  _max = item
                }
                if (item < _min) {
                  _min = item
                }

                data.push([parseInt((ind)/17),ind % 17,item.toFixed(2)]);
                // tempValue.push(item);
                
                // if (tempValue.length == 4) {
                //   data.push(
                //     JSON.parse(JSON.stringify(tempValue))
                //   );
                //   tempValue = [];
                // }

              });
                
                

              // var model_y = Object.getOwnPropertyNames(this.ApiResult.getCabinetRockInfo);
              // var serial_x = this.ApiResult.getCabinetRockInfo[model_y[0]].map((item,ind) => { return ind + 1});
              // var serial_len = this.ApiResult.getCabinetRockInfo[model_y[0]].length;
              
              // for( var i = 0 ; i < serial_len ; i++ ) {
              //   model_y.forEach((item, ind) => {
              //   if (this.ApiResult.getCabinetRockInfo[item][i] > _max) {
              //     _max = this.ApiResult.getCabinetRockInfo[item][i]
              //   }
              //   if (this.ApiResult.getCabinetRockInfo[item][i] < _min) {
              //     _min = this.ApiResult.getCabinetRockInfo[item][i]
              //   }
                      
              //     data.push([i , ind , this.ApiResult.getCabinetRockInfo[item][i].toFixed(2) ])
              //   });
              // }
            
              var option = {
                tooltip: {
                  position: 'top'
                },
                grid: {
                  height: '90%',
                  top: '10px'
                },
                xAxis: {
                  type: 'category',
                  data: serial_x,
                },
                yAxis: {
                  type: 'category',
                  data: model_y,
                },
                visualMap: {
                  show:false,
                  min: 20,//28
                  max: 35,//35
                  realtime:true,
                  calculable: true,
                  // orient: 'horizontal',
                  left: '20px',
                  bottom: '0%',
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

          })
        },
      }, 
      ApiRequest: {
        postCabinetECI: {
          equipment_id: [this.equipment_id],
          datetime:"20221222053000",//moment().format("YYYYMMDDhhmmss"),
        },
      },
      ApiResult: {
        postCabinetECI: null, 
        getCabinetRockInfo:null,
      },
    };
  },
  methods: {
    postCabinetECI(){
      const vm = this;
      Plotly.purge(this.ChartDiv.ECIChart.Id);
      Plotly.purge(this.ChartDiv.ICIChart.Id);
      vm.ChartDiv.ECIChart.Loading = true;
      
      const ApiFn = this.ApiFunction ? this.ApiFunction : postCabinetECI;
      const ApiPars = this.ApiParamater ? this.ApiParamater : vm.ApiRequest.postCabinetECI;
      ApiPars.equipment_id[0] = this.equipment_id;
      ApiFn(ApiPars)
        .then((response) => {
          if (response.data.message.toLowerCase() == "success") {
            vm.ApiResult.postCabinetECI = response.data.data;
            vm.Draw('ECIChart');

          } else {
            vm.$message({ type:'error' , message:response.data.message });
          } 
        })
        .catch((response) => {
          vm.$message({ type:'error' , message:response.message });
        })
        .finally(() => {
          vm.ChartDiv.ECIChart.Loading = false;
        });	
    }, 
    Draw(ChartName) {
      const vm = this;
      vm.$nextTick(function() {
        const ChartObj = this.ChartDiv[ChartName];
        if (ChartName !== 'IndicatorChart') {
          Plotly.purge(ChartObj.Id);
          Plotly.newPlot(ChartObj.Id, ChartObj.ChartData, ChartObj.ChartLayout , vm.plotlyConfig);
        }
        if (ChartName === 'ECIChart') {
          const myPlot = document.getElementById(ChartObj.Id);
          myPlot.on('plotly_click', (data) => {
            vm.ECIChart_Click(data);
          });
        } else if (ChartName === 'ICIChart'){
          const myPlot = document.getElementById(ChartObj.Id);
          myPlot.on('plotly_click', (data) => {
            vm.ICIChart_Click(data);
          });
        } else if (ChartName === 'IndicatorChart'){
          if (vm.isV) {
            Plotly.purge(vm.ChartDiv.RawChartV.Id);
            Plotly.newPlot(vm.ChartDiv.RawChartV.Id, vm.ChartDiv.RawChartV.ChartData, vm.ChartDiv.RawChartV.ChartLayout , vm.plotlyConfig);
          } else {
            this.$nextTick(function () {
              // let chart = echarts.init(document.getElementById(vm.ChartDiv.RawChartT.Id));
              // chart.setOption( vm.ChartDiv.RawChartT.ChartData ); 
              // chart.resize();
            });
          }
        }
      });
    },
    ECIChart_Click(data) {
      this.ChartDiv.ECIChart.ClickValue = data.points[0].x;
      this.Draw("ICIChart");
    },
    ICIChart_Click(data) {
      this.ChartDiv.ICIChart.ClickValue = data.points[0].label;
      // this.ChartDiv.ICIChart.ClickValue = "T"
      this.isV = this.ChartDiv.ICIChart.ClickValue != 'T';
      this.Draw("IndicatorChart");
    }, 
  },
  watch: {
  },
  mounted() {
    this.postCabinetECI();
  },
  computed: {
  },
  created() {
    this.ChartDiv.ECIChart.Id = UUID();
    this.ChartDiv.ICIChart.Id = UUID();
    this.ChartDiv.RawChartT.Id = UUID();
    this.ChartDiv.RawChartV.Id = UUID();
  },
};
</script>