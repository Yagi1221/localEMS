<template>
  <div class="" id="ChartRate"></div>
</template>

<script >
import newwebsocket from '@/lib/NewWebSocket.js';
import * as echarts from "echarts";
import moment from 'moment';


export default {
  props: {

  },
  components: {
  },
  data() {
    this.ChartRate = null;
    return {
      moment,
      socket: null,
      RateData: [],
      xData1: [59.45, 59.75, 59.86, 59.98, 60.02, 60.14, 60.25, 60.55],
      yData1: [100, 100, 52, 9, 9, -52, -100, -100],
      xData2: [59.75, 59.86, 59.98, 60.02, 60.14, 60.25],
      yData2: [100, 52, -9, -9, -52, -100],
    };
  },
  computed: {
    rateOption: function () {
      return {
        xAxis: {
          scale: true,
          max: 60.55,
          min: 59.45,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          appendToBody: true,
        },
        yAxis: {
          scale: true,
          max: 140,
          min: -140,
        },
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: [[59.45, 100], [59.75, 100], [59.86, 52], [59.98, 9], [60.02, 9], [60.14, -52], [60.25, -100], [60.55, -100]],
            lineStyle: { color: 'blue', type: "dashed" }
          },
          {
            type: 'line',
            showSymbol: false,
            data: [[59.75, 100], [59.86, 52], [59.98, -9], [60.02, -9], [60.14, -52], [60.25, -100]],
            lineStyle: { color: 'blue', type: "dashed" }
          },
          {
            type: 'scatter',
            data: this.RateData,
          }
        ]
      };
    },
  },
  created() {
    this.CreateSocket();
  },
  mounted() {

  },
  unmounted() {
    this.socket.close();
  },
  watch: {
    RateData: {
      handler(newVal) {
        this.DrawChart();
      },
      immediate: false,
      deep: true,

    }
  },
  methods: {
    DrawChart() {
      if (this.ChartRate == null) {
        this.ChartRate = echarts.init(document.getElementById("ChartRate"));
      }
      this.ChartRate.setOption(this.rateOption);

    },
    CreateSocket() {
      const vm = this;
      function MessageCallBack(SocketData) {
        var data = JSON.parse(SocketData);
        vm.RateData.push([data[0].frequency, data[0].ratio * 100]);
        vm.RateData = vm.RateData.splice(-10);
      }

      vm.socket = newwebsocket(MessageCallBack, null, 'sbspm');
    },
  },
};
</script>
<style></style>