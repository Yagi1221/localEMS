<template> 
  <font-awesome-icon v-if="DataList.length == 0" icon="bell" class="text-white fs-5 me-4" style="top:2px"/>
    <el-dropdown  v-else  trigger="click" class="me-4" style="top:2px">
      <el-badge :value="DataList.length" class="item cursor-pointer" >
        <font-awesome-icon icon="bell" class="text-white fs-5"/>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu >
          <el-dropdown-item  v-for="item in DataList" :key="item.id" >
            <div @click="GoToBell" class="row rounded-3 bg-danger " style="width:300px; max-width:30vw;--bs-bg-opacity: .1;">
              <div class="text-danger">
                <font-awesome-icon icon="warning" />
                {{item.equipment_id}}
              </div>
              <div class="text-truncate text-dark" >
                <small>{{item.message}}</small> <small style="float:right ;font-style: italic;">{{item.time}}</small>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
  </el-dropdown> 
    <el-avatar size="small" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
    <el-dropdown trigger="click" class="ms-2 ">
        <span class="el-dropdown-link cursor-pointer">
            <font-awesome-icon icon="angle-down"  />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in $store.getters.getFieldList" :key="item.id" divided @click="FieldsClick(item)">
                    <font-awesome-icon v-if="item.type == 'ups'" icon="hard-drive" class="me-2" />
                    <font-awesome-icon v-if="item.type == 'storage'" icon="car-battery" class="me-2" />
                    <font-awesome-icon v-if="item.type == 'solar'" icon="solar-panel" class="me-2" />
                    {{item.label}}
                </el-dropdown-item>

                <el-dropdown-item divided @click="Logout">
                    <font-awesome-icon icon="right-from-bracket" class="me-2" />
                    登出
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script >
import newwebsocket from '@/lib/NewWebSocket.js';

    export default {
      props: {
         
      },
        data() {
            return {
              DataList:[],
              socket: null,
            };
        },
        created() {
          const vm = this;
          vm.websocket();
        },
        unmounted() {
          this.socket.close();
        },
        watch: {
        },
        methods: {
           websocket() {
            const vm = this;

            function MessageCallBack(data) {
              var data =  JSON.parse( data);
              var arrayData = [];
              data.forEach(x => {
                arrayData.push(JSON.parse(x));
              });
              vm.DataList =  arrayData;
            } 
             
            vm.socket = newwebsocket(MessageCallBack , null , 'alarm');
            
          },
     
          GoToBell() {
            this.$router.push({ name: 'Alert' });
          },
          Logout() {
              this.$store.commit('logOut');
              this.$router.push({ name: 'login' });
          }, 
        },
    };
</script>