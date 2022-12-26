<template>

  <el-table  id="exTable" :data="SocketData" size="small" stripe border class="rounded-3" header-cell-class-name="tableHeaderStyle"  >
        <el-table-column  label="時間" prop="time" ></el-table-column>
        <el-table-column  label="設備" prop="equipment_id" ></el-table-column>
        <el-table-column  label="訊息" prop="message" ></el-table-column>
  </el-table>
</template>

<script > 

import { getFields } from '@/api/Api.js';
import newwebsocket from '@/lib/NewWebSocket.js';

export default {
  props: {
     
  },
  components: {
  },
  data() {
    return {
      socket : null,
      SocketData : [],
      ApiResult: {
        getFields: [],
      }
    };
  },
  mounted() {
     this.websocket();
  },
  unmounted() {
    this.socket.close();
  },
  created() {
    this.getFields();
  },
  watch: {},
  
  methods: {
    getFields() {
      const vm = this;
      getFields()
      .then(response => {
        if (response.data.message == 'Success' ) {
            vm.ApiResult.getFields = response.data.data;
        } else {
            vm.$message({ type:'error' , message:response.data.message });
        }
      })
      .catch(response => {

      })
      .finally(() => {});
    },
    websocket() {
      const vm = this;
      function MessageCallBack(SocketData) {
        var data =  JSON.parse(SocketData);
        var arrayData = [];
        data.forEach(x => {
          arrayData.push(JSON.parse(x));
        });
        vm.SocketData =  arrayData;
      }

      vm.socket = newwebsocket(MessageCallBack , null , 'alarm');
       
    },
  },
};
</script>