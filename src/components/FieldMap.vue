<template>


  <div class="row text-center mb-3">
    <div class=""><h3>設備狀態</h3></div>
    <div class="mb-3">
      <font-awesome-icon icon="square" class="text-success"/>正常
      <font-awesome-icon icon="square" class="text-danger"/>異常
      <font-awesome-icon icon="square" class="text-dark"/>關閉
    </div>
    <div class="col-12 row d-flex justify-content-around text-white">
      <!-- 儲能櫃01 -->
      <div class="col-3 p-2 border cursor-pointer" @click="toCabinetList('CABINET_1')">
        <div class="row m-0 ">
          <div :class="'col-6 border mb-1  d-flex justify-content-center align-items-center ' + getClass('CABINET_1' , 'air_abnormal')" style="height:3rem">空調</div>
          <div :class="'col-6 border mb-1  d-flex justify-content-center align-items-center' + getClass('CABINET_1' , 'fire_abnormal')" style="height:3rem">消防</div>
        </div>
        <div class="row p-0  m-0">
          <div :class="'col-6 border mb-1' + getRackClass('CABINET_1' , 'B1_RACK_1')">R1</div>
          <div :class="'col-6 border mb-1' + getRackClass('CABINET_1' , 'B1_RACK_2')">R2</div>
          <div :class="'col-6 border mb-1' + getRackClass('CABINET_1' , 'B1_RACK_3')">R3</div>
          <div :class="'col-6 border mb-1' + getRackClass('CABINET_1' , 'B1_RACK_4')">R4</div>
        </div>
        <div class="row m-0">
          <div :class="'border mb-1  d-flex justify-content-center align-items-center' + getClass('CABINET_1' , 'abnormal')" style="height:6rem">主控中心</div>
        </div>
      </div>

      <!-- 儲能櫃02 -->
      <div class="col-3 row p-2 border cursor-pointer" @click="toCabinetList('CABINET_2')">
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_1')">R1</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_2')">R2</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_3')">R3</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_4')">R4</div>
        <div :class="'col-6 border mb-1 d-flex justify-content-center align-items-center' + getClass('CABINET_2' , 'air_abnormal')" style="height:3rem">空調</div>
        <div :class="'col-6 border mb-1 d-flex justify-content-center align-items-center' + getClass('CABINET_2' , 'fire_abnormal')" style="height:3rem">消防</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_5')">R5</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_6')">R6</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_7')">R7</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_8')">R8</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_9')">R9</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_2' , 'B2_RACK_10')">R10</div>
      </div>

      <!-- 儲能櫃03 -->
      <div class="col-3 row p-2 border cursor-pointer" @click="toCabinetList('CABINET_3')">
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_1')">R1</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_2')">R2</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_3')">R3</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_4')">R4</div>
        <div :class="'col-6 border mb-1 d-flex justify-content-center align-items-center' + getClass('CABINET_3' , 'air_abnormal')" style="height:3rem">空調</div>
        <div :class="'col-6 border mb-1 d-flex justify-content-center align-items-center' + getClass('CABINET_3' , 'fire_abnormal')" style="height:3rem">消防</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_5')">R5</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_6')">R6</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_7')">R7</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_8')">R8</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_9')">R9</div>
        <div :class="'col-6 border mb-1' + getRackClass('CABINET_3' , 'B3_RACK_10')">R10</div>
      </div>
    </div>
  </div>
</template>

<script >

export default {
      props: {   
         socketData :{
          type: Array,
          default: []
         }
      },
      components: {
      },
      computed: {
         
      },
      data() {
        return {
               
        };
      },
      mounted(){
      },
      created() {
      },
      watch: {
      },
      methods: {
        getClass(BMSName, attr) {
          var find = this.socketData.find(x=> {return x.parent_id == BMSName});
          if (find) {
            if (find.hasOwnProperty(attr)){
              return find[attr] ? ' bg-danger' : ' bg-success';
            }
          }
          return ' bg-dark';
        },
        getRackClass(BMSName, attr) {
          var find = this.socketData.find(x=> {return x.parent_id == BMSName});
          if (find) {
            if (find.hasOwnProperty('rack_info')){
              var findRack = find.rack_info.find(x=> {return x.eq_id == attr});
              if (findRack) {
                return find.abnormal ? ' bg-danger' : ' bg-success';
              }
            }
          }
          return ' bg-dark';
        },
        toCabinetList(par) {
          this.$router.push({name: 'CabinetList', query: { tabname : par } });
          
        }
      }
    };
</script>
<style>
</style>