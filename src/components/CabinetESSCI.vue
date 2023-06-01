<template>
  <div class="row m-0 p-0" v-loading="ChartDiv.ECIChart.Loading">
    <div class="  col  m-0 p-0 me-2 " >
      <div :id="ChartDiv.ECIChartShow.Id"  style="width:100%;height:400px">
      </div>
    </div>
  </div>
    
  <el-dialog title="ESSCI" v-model="outerVisible" top="10px"  width="1100px" destroy-on-close="true" >
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
        <div v-show="isV" :id="ChartDiv.RawChartV.Id" style="width:100%;height:250px;"></div>
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
  </el-dialog>

</template>
<script>
import moment from 'moment';
import { postCabinetESSCI } from '@/api/Api.js';
import { computed } from 'vue';
import Plotly from 'plotly.js/dist/plotly';
import UUID from '@/lib/UUID.js';

export default {
  name: 'RackECI',
  setup() { },
  props: {
    equipment_id: {
      type:Array,
      default:["62b5348bd5836f5ed7e7fbac", "62b534a4d5836f5ed7e7fbaf", "62b534b6d5836f5ed7e7fbb2", "62b534c7d5836f5ed7e7fbb5"]
    }, 
  },
  components: {
  },
  data() {
    return {
      moment,
      outerVisible: false,
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
        var find = this.ApiResult.postCabinetESSCI.RAW.flat().find((item) => { return item.key == vm.ChartDiv.ECIChart.ClickValue && item.key2 == vm.ChartDiv.ICIChart.ClickValue});
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
        ECIChartShow: {
          Id:'',
          Loading: false,
          Drawed: false,
          ChartData: [{
            x: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map((item) => { return item.key; }); }),
            y: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map((item) => { return item.value * 100}); }),
            text: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map(item => {return 'Rack ' + ( this.equipment_id.indexOf(item.rack_key) + 1 )}); }),

            name: 'ECI',
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              width: 1,
            },
            hovertemplate:"%{y:.2f}-<b>%{text}</b><extra></extra>"
          },
          {
            x: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map((item) => { return item.key; }); }),
            y: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map(() => { return this.threshold; }); }),
            name: 'Threshold',
            mode: 'lines',
            type: 'scatter',
            line: {
              width: 1,
              opacity: 0.6,
              color:'#44bd32',
            },
            hovertemplate:"%{y:.0f}<br><extra></extra>"
          }
          ],
          ChartLayout: {
            title: { text: 'ESSCI' },
            margin: {
                t:40,
                // l:40,
                // r:40,
                b:50,//有legend(threshold)時用這個
                // b:50,
            },
            legend: {orientation: "h" , xanchor:'center',yanchor:'bottom' , y:-0.4, x:0.5},
            xaxis: {
              automargin: true,
              type: 'category',
              zeroline: false,
              showline: true,
            },
            yaxis: {
              range: [0, 105],
              zeroline: false,
              showline: true,
            },
          },
          ClickValue: '',
        },
        ECIChart: {
          Id:'',
          Loading: false,
          Drawed: false,
          ChartData: [{
            x: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.map((item) => { return item.key; }).slice(-30); }),
            y: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.map((item) => { return item.value * 100}).slice(-30); }),
            text: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.slice(-30).map(item => {return 'Rack ' + ( this.equipment_id.indexOf(item.rack_key) + 1 )}); }),
            name: 'ESSCI',
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              width: 1,
            },
            hovertemplate:"%{y:.2f}-<b>%{text}</b><extra></extra>"
          },
          {
            x: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.map((item) => { return item.key; }).slice(-30); }),
            y: computed(() => { return this.ApiResult.postCabinetESSCI.ECI.map(() => { return this.threshold; }).slice(-30); }),
            name: 'Threshold',
            mode: 'lines',
            type: 'scatter',
            line: {
              width: 1,
              opacity: 0.6,
              color:'#44bd32',
            },
            hovertemplate:"%{y:.0f}<br><extra></extra>"
          }
          ],
          ChartLayout: {
            title: { text: 'ESSCI' },
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
              showline: true,
            },
            yaxis: {
              range: [0, 105],
              zeroline: false,
              showline: true,
            },
          },
          ClickValue: '',
        },
        ICIChart: {
          Id:'',
          Loading: false,
          Drawed: false,
          ChartData: computed(() => {
            const find = this.ApiResult.postCabinetESSCI.ICI.find((item) => { return item.key == this.ChartDiv.ECIChart.ClickValue; });
            
            
            const take10 = find.value.slice(0,10).reverse();
           

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
              showline: true,
            },
            xaxis: {
              tickformat: ',.0%',
              range: [-1, 1],
              showline: true,
            },
          },
          ClickValue: '',
        },
        RawChartV:{
          Id :'',
          ChartData: computed(() => { 
            const vm = this;
             var find = this.ApiResult.postCabinetESSCI.RAW.flat().find((item)=> {
              return  item.key == vm.ChartDiv.ECIChart.ClickValue && item.key2 == vm.ChartDiv.ICIChart.ClickValue
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
              var find = this.ApiResult.postCabinetESSCI.RAW.flat().find((item) => { return item.key == vm.ChartDiv.ECIChart.ClickValue && item.key2 == vm.chartIdICI.ClickValue });
              var tempValue = [];
              find.data.forEach((item,ind) => {
                if (item > _max) {
                  _max = item
                }
                if (item < _min) {
                  _min = item
                }

                data.push([parseInt((ind)/17),ind % 17,item.toFixed(2)]);
                

              });
                
                
 
            
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
        postCabinetESSCI: computed(() => {
          return {
            field_id: this.$store.getters.getField,
            equipment_id: this.equipment_id,
            datetime: "20221222053000",//moment().format("YYYYMMDDhhmmss"),
          }
        }),
      },
      ApiResult: {
        postCabinetESSCI: null, 
      },
    };
  },
  methods: {
    postCabinetESSCI(){
      const vm = this;
      vm.ChartDiv.ECIChart.Loading = true;
      postCabinetESSCI(vm.ApiRequest.postCabinetESSCI)
        .then((response) => {
          if (response.data.message.toLowerCase() == "success") {
            vm.ApiResult.postCabinetESSCI = response.data.data;
            vm.ApiResult.postCabinetESSCI.ECI.forEach(item => {
              item.RackName ="Rack " + (vm.equipment_id.indexOf(item.rack_key) + 1);
            });
            // vm.Draw('ECIChart');
            vm.Draw('ECIChartShow');
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

        if (ChartName === 'ECIChartShow') {
          const myPlot = document.getElementById(ChartObj.Id);
          myPlot.on('plotly_click', (data) => {
            vm.ECIChartShow_Click(data);
          });
        } else if (ChartName === 'ECIChart') {
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
    ECIChartShow_Click(data) {
      this.outerVisible = true;
      this.ChartDiv.ECIChart.ClickValue = data.points[0].x;
      this.Draw("ECIChart");
      this.Draw("ICIChart");
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
    equipment_id:{ 
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0 && (!oldVal || newVal.join('') != oldVal.join('')) ) {
        //  if (newVal && newVal.length > 0 ) {
          this.postCabinetESSCI();
        }
      }, 
      immediate: true,
    }
  },
  mounted() {
    // this.postCabinetESSCI();
  },
  computed: {
  },
  created() {
    
    this.ChartDiv.ECIChartShow.Id = UUID();
    this.ChartDiv.ECIChart.Id = UUID();
    this.ChartDiv.ICIChart.Id = UUID();
    this.ChartDiv.RawChartT.Id = UUID();
    this.ChartDiv.RawChartV.Id = UUID();
  },
};
</script>