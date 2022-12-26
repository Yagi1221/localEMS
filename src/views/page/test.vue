<template>
 <h3 class="mt-3">系統公告</h3>
  <el-table ref="filterTable" :data="ApiResult.getSystemAnnouncement" size="small" stripe border class="rounded-3" header-cell-class-name="tableHeaderStyle" >
    <el-table-column prop="createon" label="建立日期" width="120" >
      <template v-slot="scope">
          {{moment(scope.row.createon).format("YYYY-MM-DD")}}
      </template>
    </el-table-column>
    <el-table-column prop="eventon" label="維修日期" width="120">
      <template v-slot="scope">
          {{moment(scope.row.eventon).format("YYYY-MM-DD")}}
      </template>
    </el-table-column>
    <el-table-column prop="field_name" label="案場" width="200"> </el-table-column>
    <el-table-column prop="content" label="公告內容" > </el-table-column>
    <el-table-column prop="msg" label="附件" width="150">
      <template v-slot="scope">
          <span class="cursor-pointer" @click="Download(scope.row)">
            {{scope.row.filename}}
          </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script > 

import { getSystemAnnouncement } from '@/api/Api.js';

export default {
  props: {
     
  },
  components: {
  },
  data() {
    return {
      socket : null,
      ini : false,
      SocketData : [],
      ApiResult: {
        getFields: [],
        getSystemAnnouncement:[],
      }
    };
  },
  mounted() {
    //  this.websocket();
  },
  unmounted() {
    this.socket.close();
    this. Connection = null; // to prevent memory leacking
  },
  created() {
    // this.getFields();
    this.getAnnouncemnet();
  },
  watch: {},
  
  methods: {
      getAnnouncemnet() {
      const vm = this;
      getSystemAnnouncement()
      .then(response => {
        if (response.data.message == 'Success' ) {
          vm.ApiResult.getSystemAnnouncement = response.data.data;
        } else {
          vm.$message({ type:'error' , message:response.data.message });
        }
      })
      .catch(response =>{
          vm.$message({ type:'error' , message:response.message });
      })
      .finally(() => { });
    },
  },
};
</script>