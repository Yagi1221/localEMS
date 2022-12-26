<template>
 <div class="mt-3" style="">
    <div class="ps-5 pe-5">
      <el-tabs  v-model="TabActiveName" @tab-click="tabClick" >
        <el-tab-pane label="CABINET_1" name="CABINET_1" >
            <CabinetInfo ref="CABINET_1" :socketData="DataList.find(x=> x.parent_id == 'CABINET_1')" ></CabinetInfo>
        </el-tab-pane>
        <el-tab-pane label="CABINET_2" name="CABINET_2">
            <CabinetInfo ref="CABINET_2" :socketData="DataList.find(x=> x.parent_id == 'CABINET_2')" ></CabinetInfo>
        </el-tab-pane>
        <el-tab-pane label="CABINET_3" name="CABINET_3">
            <CabinetInfo ref="CABINET_3" :socketData="DataList.find(x=> x.parent_id == 'CABINET_3')" ></CabinetInfo>
        </el-tab-pane>
      </el-tabs>
    </div>
 </div>
</template>

<script >
import CabinetInfo from '@/components/CabinetInfo.vue'; 
import newwebsocket from '@/lib/NewWebSocket.js';
    export default {
      props: {
        tabname: {
            type:String,
            default:'',
        },
      },
      components: {
        CabinetInfo,
      },
        data() {
            return {
              TabActiveName:'',
              DataList: [],
              socket: null,  
            };
        },
        mounted(){
          this.TabActiveName = this.$route.query.tabname ?? this.TabActiveName;
          this.websocket();
        },
        unmounted() {
          this.socket.close();
        },
        created() {
        },
        watch: {
        },
        methods: {
          tabClick(a){
            this.$refs[a.paneName].resizeChart();
          },
           websocket() {
          
                const vm = this;

                function MessageCallBack(SocketData) {
                  var data =  JSON.parse(SocketData)
                    var arrayData = [];
                    data.forEach(x => {
                      var temp = JSON.parse(x);
                      temp.rack_info = JSON.parse(temp.rack_info);
                      arrayData.push(temp);
                    });
                    arrayData.sort((a,b) => { return a.parent_id > b.parent_id ? 1 : -1 });
                    vm.DataList = arrayData;
                    if (!vm.TabActiveName) {
                      vm.TabActiveName = vm.DataList[0]?.parent_id;
                    }
                }

                vm.socket = newwebsocket(MessageCallBack , null , 'pcs');
          },
        }
    };
</script>
<style>  
</style>