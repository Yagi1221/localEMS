<template>
  <div class="row m-3" style="">
    <div class=" col-4 border-end border-2 d-flex justify-content-center align-items-end p-3 row " style="height: 85vh" >
      <div class="m-0 p-0 mb-2">
        <FieldMap :socketData="SocketDataPCS"></FieldMap>
      </div>

      <div class="m-0 p-0 mt-2 mb-2">
        <FieldMeter :socketData="socketDataMeter"></FieldMeter>
      </div>
      <!-- PCS狀態 -->
      <div class="rounded-3 p-1 shadow row m-1 d-flex pb-3 border-dark">
        <h5 class="text-center">PCS狀態</h5>
        <div class="row p-0 m-0 text-center d-flex justify-content-around">
          <DashboardPCS :socketData="SocketDataPCS"></DashboardPCS>
        </div>
      </div>
    </div>

    <div class="col-8 row ms-2">
  
      <!-- 即時系統頻率輸出 -->
      <div class="col-12 mb-4 ps-2" style="">
        <div class="row shadow p-0 m-0">
          <div class="col-8 m-0 p-0 border-end">
            <div class=" " id="ChartFreq" style="height: 45vh"></div>
          </div>
          <div class="col-4 m-0 p-0 ">
            <ChartSBSPM PropTitle="小時得標曲線圖" style="height: 45vh" ></ChartSBSPM>
          </div>
        </div>
        
      </div>

      <!-- 小時得標曲線圖 -->
      <div class="col-12  mb-4 ps-2"> 
        <div class="row shadow p-0 m-0">
          <div class="col-12 m-0 p-0 ">
            <ChartBID></ChartBID>
          </div>
        </div>
        
      </div>

      <div class="ms-2 me-2 pe-4">
        <div class="row shadow">
          <!-- 各櫃soh -->
          <div class="col-4 m-0 p-0">
            <div class="m-1">
              <div class="" id="ChartSOH" style="height: 30vh"></div>
            </div>
          </div>
          <!-- 各櫃soc -->
          <div class="col-4 m-0 p-0 border-start border-end">
            <div class="m-1">
              <div class="" id="ChartSOC" style="height: 30vh"></div>
            </div>
          </div>
          <!-- 各櫃運轉狀況 -->
          <div class="col-4 m-0 p-0">
            <div class="m-1 text-center">
              <p class="">運轉狀況</p>

              <div class="mt-1" style="font-size: smaller" >
                <p class="m-0">CABINET_1</p>
                <div class="row d-flex justify-content-center">
                  <div class="col-5 rounded-3 d-flex justify-content-between" style="background: rgba(103, 194, 58, 0.2)" >
                    <!-- <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  getDuration(CABINET_1, "charge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  C1Charge }}</span>

                  </div>
                  <div class="col-5 ms-1 rounded-3 d-flex justify-content-between" style="background: rgba(255, 127, 14, 0.3)"  >
                    <!-- <span><font-awesome-icon icon="bolt" /></span ><span>{{ getDuration(CABINET_1, "discharge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="bolt" /></span ><span>{{ C1Discharge }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-1" style="font-size: smaller" >
                <p class="m-0">CABINET_2</p>
                <div class="row d-flex justify-content-center">
                  <div class="col-5 rounded-3 d-flex justify-content-between" style="background: rgba(103, 194, 58, 0.2)" >
                    <!-- <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  getDuration(CABINET_2, "charge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  C2Charge }}</span>
                  </div>
                  <div class="col-5 ms-1 rounded-3 d-flex justify-content-between" style="background: rgba(255, 127, 14, 0.3)"  >
                    <!-- <span><font-awesome-icon icon="bolt" /></span ><span>{{ getDuration(CABINET_2, "discharge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="bolt" /></span ><span>{{ C2Discharge }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-1" style="font-size: smaller" >
                <p class="m-0">CABINET_3</p>
                <div class="row d-flex justify-content-center">
                  <div class="col-5 rounded-3 d-flex justify-content-between" style="background: rgba(103, 194, 58, 0.2)" >
                    <!-- <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  getDuration(CABINET_3, "charge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="battery" /></span ><span class="text-end">{{  C3Charge }}</span>
                  </div>
                  <div class="col-5 ms-1 rounded-3 d-flex justify-content-between" style="background: rgba(255, 127, 14, 0.3)"  >
                    <!-- <span><font-awesome-icon icon="bolt" /></span ><span>{{ getDuration(CABINET_3, "discharge_total_time") }}</span> -->
                    <span><font-awesome-icon icon="bolt" /></span ><span>{{ C3Discharge }}</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import newwebsocket from '@/lib/NewWebSocket.js';
import ChartSBSPM from "@/components/ChartSBSPM.vue";
import ChartBID from "@/components/ChartBID.vue";

import FieldMeter from "@/components/FieldMeter.vue";
import FieldMap from "@/components/FieldMap.vue";
import DashboardPCS from "@/components/DashboardPCS.vue";

import Plotly from "plotly.js/dist/plotly";
import moment from "moment";

export default {
  components: {
    ChartSBSPM,ChartBID,
    FieldMeter,
    FieldMap,
    DashboardPCS,
  },
  data() {
    return {
      moment,
      socketPCS:null,
      socketMeter:null,
      socketFrequency:null,
      SocketDataPCS: [],
      socketDataMeter: [],
      socketDataFrequency: [],
      plotlyConfig: {
        responsive: true,
        displaylogo: false,
        displayModeBar: false,
      },
      Drawed :{
        Freq: false,
        SOC: false,
        SOH: false,
      } ,
      LayOutFreq: {
        margin: { t: 50 },
        legend: {
          xanchor: "right",
          x: 1.2,
          yanchor: "middle",
          y: 1.2,
        },
        title: { text: "即時系統頻率輸出", side: "top" },
        xaxis: {
          automargin: true, // 讓太長的 label 不會被截斷
          type: "category",
        },
        yaxis: {
          range: [-105, 105],
          autorange: false,
          title: "P",
          side: "left",
        },
        yaxis2: {
          range: [59.75, 60.25],
          tickmode: "array",
          tickvals: [59.75, 59.86, 60, 60.14, 60.25],
          title: "HZ", 
          overlaying: "y",
          side: "right",
        },

       
      },
      LayOutSOH: {
        margin: { t: 50, b: 25 },
        title: { text: "電池健康度", side: "top" },
        legend: {
          xanchor: "right",
          x: 1.2,
          yanchor: "middle",
          y: 1.2,
        },
        yaxis: {
          range: [0, 105],
        },
        shapes: [
          {
            type: "line",
            x0: -1,
            y0: 95,
            x1: 3,
            y1: 95,
            line: {
              color: "green",
              width: 2,
              dash: "dot",
            },
          },
        ],
      },
      LayOutSOC:  {
          margin: { t: 50, b: 25 },
          title: { text: "即時SOC", side: "top" },
          legend: {
            xanchor: "right",
            x: 1.2,
            yanchor: "middle",
            y: 1.2,
          },
          yaxis: {
            range: [0, 105],
          },
          shapes: [
            {
              type: "line",
              x0: -1,
              y0: 65,
              x1: 3,
              y1: 65,
              line: {
                color: "green",
                width: 2,
                dash: "dot",
              },
            },
          ],
      },
    };
  },
  mounted() {
  },
  unmounted() {
      this.socketPCS.close();
      this.socketMeter.close();
      this.socketFrequency.close();
  },
  created() {
    this.CreateSocketPCS();
    this.CreateSocketMeter();
    this.CreateSocketFrequency();
  },
  computed: {

    C1Charge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_1"});
      var result = [];
      if (c && c.charge_total_time) {
         result.push(c.charge_total_time.Year + "年");
         result.push(c.charge_total_time.Day + "日");
         result.push(c.charge_total_time.Hour + "時");
      }
      return result.join('');
    },
    C2Charge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_2"});
      var result = [];
      if (c && c.charge_total_time) {
         result.push(c.charge_total_time.Year + "年");
         result.push(c.charge_total_time.Day + "日");
         result.push(c.charge_total_time.Hour + "時");
      }
      return result.join('');
    },
    C3Charge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_3"});
      var result = [];
      if (c && c.charge_total_time) {
         result.push(c.charge_total_time.Year + "年");
         result.push(c.charge_total_time.Day + "日");
         result.push(c.charge_total_time.Hour + "時");
      }
      return result.join('');
    },

    C1Discharge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_1"});
      var result = [];
      if (c && c.discharge_total_time) {
         result.push(c.discharge_total_time.Year + "年");
         result.push(c.discharge_total_time.Day + "日");
         result.push(c.discharge_total_time.Hour + "時");
      }
      return result.join('');
    },
    C2Discharge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_2"});
      var result = [];
      if (c && c.discharge_total_time) {
         result.push(c.discharge_total_time.Year + "年");
         result.push(c.discharge_total_time.Day + "日");
         result.push(c.discharge_total_time.Hour + "時");
      }
      return result.join('');
    },
    C3Discharge: function () {
      var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_3"});
      var result = [];
      if (c && c.discharge_total_time) {
         result.push(c.discharge_total_time.Year + "年");
         result.push(c.discharge_total_time.Day + "日");
         result.push(c.discharge_total_time.Hour + "時");
      }
      return result.join('');
    },

    ChartFreqData: function () {
      var Xaxis = this.socketDataFrequency.map((item) => {
        return this.moment(item.time).format("mm:ss");
      });
      var data = [
        {
          x: Xaxis,
          y: this.socketDataFrequency.map((item) => { return item.power }),
          name: "P",
          line: { shape: "spline" },
        },
        {
          x: Xaxis,
          y: this.socketDataFrequency.map((item) => { return item.frequency}),
          mode: "lines",
          name: "HZ",
          yaxis: "y2",
          line: { shape: "spline" },
        },
      ];

      return data;
    },
    CABINET_1: function (){
       var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_1"});
       return c;
    } ,
    CABINET_2: function (){
       var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_2"});
       return c;
    } ,
    CABINET_3: function (){
       var c = this.SocketDataPCS.find(x=> {return x.parent_id == "CABINET_3"});
       return c;
    } ,
    ChartSOCData: function () {
      var data = [
        {
          x: ["CABINET_1","CABINET_2","CABINET_3"],
          y:[
            (this.CABINET_1 ? this.CABINET_1.SOC : null) ,
            (this.CABINET_2 ? this.CABINET_2.SOC: null) ,
            (this.CABINET_3 ? this.CABINET_3.SOC: null) 
          ],
          type: "bar",
          name: "SOC",
        },
      ];

      return data;
    },
    ChartSOHData: function () {
      var data = [
        {
          x: ["CABINET_1","CABINET_2","CABINET_3"],
          y:[
            (this.CABINET_1 ? this.CABINET_1.SOH : null) ,
            (this.CABINET_2 ? this.CABINET_2.SOH: null) ,
            (this.CABINET_3 ? this.CABINET_3.SOH: null) 
          ],
          type: "bar",
          name: "SOH",
        },
      ];

      return data;
    },
  },
  watch: {},
  methods: {
    CreateSocketPCS(){
      const vm = this;
      function MessageCallBack(SocketData) {
        var data =  JSON.parse(SocketData);
        var arrayData = [];
        data.forEach(x => {
          x = JSON.parse(x);
          x.rack_info = JSON.parse(x.rack_info);
          arrayData.push(x);
        });
        vm.SocketDataPCS =  arrayData;

        if (vm.Drawed.SOC) {
          Plotly.react( "ChartSOC", vm.ChartSOCData, vm.LayOutSOC, vm.plotlyConfig );
        } else {
          vm.Drawed.SOC = true;
          Plotly.newPlot( "ChartSOC", vm.ChartSOCData, vm.LayOutSOC, vm.plotlyConfig );
        }

        if (vm.Drawed.SOH) {
          Plotly.react( "ChartSOH", vm.ChartSOHData, vm.LayOutSOH, vm.plotlyConfig );
        } else {
          vm.Drawed.SOH = true;
          Plotly.newPlot( "ChartSOH", vm.ChartSOHData, vm.LayOutSOH, vm.plotlyConfig );
        }

      }

      vm.socketPCS = newwebsocket(MessageCallBack , null , 'pcs');
    },
    CreateSocketMeter(){
      const vm = this;
      function MessageCallBack(SocketData) {
        var data =  JSON.parse(SocketData.replaceAll("NaN","null"));
        var arrayData = [];
        data.forEach(x => {
          arrayData.push(JSON.parse(x));
        });
        vm.socketDataMeter =  arrayData;
      }

      vm.socketMeter = newwebsocket(MessageCallBack , null , 'meter');
    },
    CreateSocketFrequency(){
      const vm = this;
      function MessageCallBack(SocketData) {
        var data =  JSON.parse(SocketData);
        
        vm.socketDataFrequency.push(data);
        vm.socketDataFrequency = vm.socketDataFrequency.slice(-60);

        if (vm.Drawed.Freq) {
          Plotly.react( "ChartFreq", vm.ChartFreqData, vm.LayOutFreq, vm.plotlyConfig );
        } else {
          vm.Drawed.Freq = true;
          Plotly.newPlot( "ChartFreq", vm.ChartFreqData, vm.LayOutFreq, vm.plotlyConfig );
        }
      }

      vm.socketFrequency = newwebsocket(MessageCallBack , null , 'frequency');
    },
    getDuration(obj, att){
      var result = [];
      if (obj && obj[att]) {
        if (obj[att].Year) result.push(obj[att].Year + "年");
        if (obj[att].Day) result.push(obj[att].Day + "日");
        if (obj[att].Hour) result.push(obj[att].Hour + "時");
      }
      return result.join('');
    },
  },
};
</script>
<style scope>
 
   
</style>