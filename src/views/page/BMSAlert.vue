<template>
  <div class="p-5">
    <h1>即時告警</h1>

    <div class="row">
      <div class="col-8">

        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="有級別告警" name="level">
            <span>
              <div class="green-circle-example"></div> 正常
              <div class="yellow-circle-example"></div> 一級警告
              <div class="orange-circle-example"></div> 二級警告
              <div class="red-circle-example"></div> 三級警告
            </span>
            <el-table size="small" :data="tableDataLevel" stripe border class="rounded-3"
              header-cell-class-name="tableHeaderStyle">
              <el-table-column label="項目" prop="item" align="center"></el-table-column>
              <el-table-column label="MBMU" prop="mbmu" align="center">
                <template #default="{ row }">
                  <span v-if="row.mbmu === 0">
                    <div class="green-circle"> </div>
                  </span>
                  <span v-if="row.mbmu === 1">
                    <div class="yellow-circle"> </div>
                  </span>
                  <span v-if="row.mbmu === 2">
                    <div class="orange-circle"> </div>
                  </span>
                  <span v-if="row.mbmu === 3">
                    <div class="red-circle"> </div>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="SBMU01" prop="sbmu01" align="center">
                <template #default="{ row }">
                  <span v-if="row.sbmu01 === 0">
                    <div class="green-circle"> </div>
                  </span>
                  <span v-if="row.sbmu01 === 1">
                    <div class="yellow-circle"> </div>
                  </span>
                  <span v-if="row.sbmu01 === 2">
                    <div class="orange-circle"> </div>
                  </span>
                  <span v-if="row.sbmu01 === 3">
                    <div class="red-circle"> </div>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="無級別告警" name="nolevel">
            <span>
              <div class="green-circle-example"></div> 正常
              <div class="red-circle-example"></div> 告警
            </span>
            <el-table size="small" :data="tableDataNoLevel" stripe border class="rounded-3"
              header-cell-class-name="tableHeaderStyle">
              <el-table-column label="項目" prop="item" align="center"></el-table-column>
              <el-table-column label="MBMU" prop="mbmu" align="center">
                <template #default="{ row }">
                  <span v-if="row.mbmu === 0">
                    <div class="green-circle"> </div>
                  </span>
                  <span v-if="row.mbmu === 1">
                    <div class="red-circle"> </div>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="SBMU01" prop="sbmu01" align="center">
                <template #default="{ row }">
                  <span v-if="row.sbmu01 === 0">
                    <div class="green-circle"> </div>
                  </span>
                  <span v-if="row.sbmu01 === 1">
                    <div class="red-circle"> </div>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
      activeName: 'level',
      tableDataLevel: [
        {
          item: '單體過壓',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '單體欠壓',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '單體過溫',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '單體低溫',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '箱體過壓',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '箱體欠壓',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '箱體過溫',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '箱體低溫',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '充電過流',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '放電過流',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: 'SOC過高',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: 'SOC過低',
          mbmu: 1,
          sbmu01: 0
        },
        {
          item: '絕緣過低',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '單體溫差',
          mbmu: 2,
          sbmu01: 0
        },
        {
          item: '單體壓差',
          mbmu: 3,
          sbmu01: 0
        },
        {
          item: 'SOC差異',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '均衡電路',
          mbmu: 0,
          sbmu01: 0
        },
      ],
      tableDataNoLevel: [
        {
          item: '風機故障',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '加熱故障',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '預充電繼電器',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '主正閉合',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '主負閉合',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '主正粘連',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '主負粘連',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '絕緣電阻',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '環境溫度',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '內部通信',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '溫度極值',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '電壓極值',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: 'SBMU煙霧',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '溫度採樣',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '掉電告警',
          mbmu: 1,
          sbmu01: 0
        },
        {
          item: '掉電故障',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '消防故障',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '消防告警',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: 'IMM在線',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: 'PCS通訊',
          mbmu: 0,
          sbmu01: 1
        },
        {
          item: '高壓迴路',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '高壓互鎖',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '風機1',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '風機2',
          mbmu: 0,
          sbmu01: 0
        },
        {
          item: '電流傳感器',
          mbmu: 0,
          sbmu01: 0
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

<style>
.green-circle-example {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  display: inline-block;
}

.yellow-circle-example {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: yellow;
  display: inline-block;
}

.orange-circle-example {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
  display: inline-block;
}

.red-circle-example {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  display: inline-block;
}

.green-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  margin: 0 auto;
}

.yellow-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: yellow;
  margin: 0 auto;
}

.orange-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
  margin: 0 auto;
}

.red-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  margin: 0 auto;
}</style>
