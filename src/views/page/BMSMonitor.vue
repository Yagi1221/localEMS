<template>
  <div class="p-5">
    <h1>即時監控</h1>
    <div class="row">
      <div class="col-8">
        <el-table size="small" :data="tableData" stripe border class="rounded-3"
          header-cell-class-name="tableHeaderStyle">
          <el-table-column label="項目" prop="item" align="center"></el-table-column>
          <el-table-column label="MBMU" prop="mbmu" align="center"></el-table-column>
          <el-table-column label="SBMU01" prop="sbmu01" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>

import {
} from '@/api/Api.js';
import moment from 'moment';
import * as echarts from "echarts";


export default {
  components: {
  },
  data() {
    return {
      moment,
      tableData: [
        {
          item: '通信狀態',
          mbmu: '正常',
          sbmu01: '正常'
        },
        {
          item: '測量電壓(V)',
          mbmu: '--',
          sbmu01: 0.1
        },
        {
          item: '累加電壓(V)',
          mbmu: '--',
          sbmu01: 1122.0
        },
        {
          item: '電流(A)',
          mbmu: 0.0,
          sbmu01: 0.0
        },
        {
          item: 'SOC(%)',
          mbmu: 49.8,
          sbmu01: 49.8
        },
        {
          item: '允許ICmax(A)',
          mbmu: 0.0,
          sbmu01: -280.0
        },
        {
          item: '允許IDmax(A)',
          mbmu: 0.0,
          sbmu01: 280.0
        },
        {
          item: '單體Vmax(V)',
          mbmu: 3.305,
          sbmu01: 3.304
        },
        {
          item: '單體Vmin(V)',
          mbmu: 3.301,
          sbmu01: 3.302
        },
        {
          item: '單體Vmean(V)',
          mbmu: 3.302,
          sbmu01: 3.302
        },
        {
          item: '單體Tmax(°C)',
          mbmu: 27.0,
          sbmu01: 27.0
        },
        {
          item: '單體Tmin(°C)',
          mbmu: 26.0,
          sbmu01: 26.0
        },
        {
          item: '單體Tmean(°C)',
          mbmu: 26.0,
          sbmu01: 26.0
        },
        {
          item: '環境Tmax(°C)',
          mbmu: -42.0,
          sbmu01: '--'
        },
        {
          item: '環境Tmin(°C)',
          mbmu: -42.0,
          sbmu01: '--'
        },
        {
          item: '環境Tmean(°C)',
          mbmu: -42.0,
          sbmu01: '--'
        },
        {
          item: '預充繼電器',
          mbmu: '--',
          sbmu01: '斷開'
        },
        {
          item: '預充繼電器',
          mbmu: '--',
          sbmu01: '斷開'
        },
        {
          item: '主正繼電器',
          mbmu: '--',
          sbmu01: '斷開'
        },
        {
          item: '主負繼電器',
          mbmu: '--',
          sbmu01: '斷開'
        },
        {
          item: '環境濕度',
          mbmu: 58,
          sbmu01: '--'
        },
      ]
    };
  },
  computed: {
    ApiRequest: function () {
      return {
      }
    },

  },
  mounted() {
  },
  created() {
  },
  watch: {
  },
  methods: {
  },
};
</script>
