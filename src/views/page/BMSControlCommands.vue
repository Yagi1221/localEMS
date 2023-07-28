<template>
  <div class="p-5">
    <h1>控制命令</h1>
    <el-form>
      <el-row type="flex" class="row-bg">
        <el-form-item label="櫃號">
          <el-select v-model="CabinetName" placeholder="請選擇...">
            <el-option v-for="item in CabinetList" :key="item._id" :value="item._id" :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="SearchClick">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <div class="card p-0 m-0">
      <div class="card-header">
        <span>續電器控制</span>
      </div>
      <div class="card-body">
        <span>
          <div class="green-circle-example"></div> 閉合
          <div class="red-circle-example"></div> 斷開
        </span>
        <el-table size="small" :data="tableDataRelay" stripe border class="rounded-3"
          header-cell-class-name="tableHeaderStyle">
          <el-table-column label="項目" prop="item" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button-group>
                <el-button type="primary" size="big" plain @click="close">閉合</el-button>
                <el-button type="primary" size="big" plain @click="open">斷開</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column label="狀態" prop="status" align="center">
            <template #default="{ row }">
              <span v-if="row.status === 0">
                <div class="green-circle"> </div>
              </span>
              <span v-if="row.status === 1">
                <div class="red-circle"> </div>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>

  <el-dialog title="閉合全部繼電器?" :align-center="true" v-model="closeDialog" width="450px" :destroy-on-close="false">
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="Saveclose">
        是
      </el-button>
      <el-button @click="closeDialog = false">
        否
      </el-button>
    </div>
  </el-dialog>

  <el-dialog title="斷開全部繼電器?" :align-center="true" v-model="openDialog" width="450px" :destroy-on-close="false">
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="Saveopen">
        是
      </el-button>
      <el-button @click="openDialog = false">
        否
      </el-button>
    </div>
  </el-dialog>
</template>


<script>

import {
} from '@/api/Api.js';
import moment from 'moment';
import * as echarts from "echarts";
import { all } from 'vue-plotly';


export default {
  components: {
  },
  data() {
    return {
      moment,
      openDialog: false,
      closeDialog: false,
      CabinetName: '',
      CabinetList: [
        {
          '_id': 'all',
          'name': 'ALL'
        },
        {
          '_id': '1',
          'name': '一號電櫃'
        },
        {
          '_id': '2',
          'name': '二號電櫃'
        },
      ],
      tableDataRelay: [
        {
          item: '高壓續電器控制',
          status: 0
        },
        {
          item: '加熱續電器控制',
          status: 0
        },
        {
          item: '風扇續電器控制',
          status: 0
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
    open() {
      const vm = this;
      vm.openDialog = true;
    },
    close() {
      const vm = this;
      vm.closeDialog = true;
    },
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

.red-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  margin: 0 auto;
}
</style>