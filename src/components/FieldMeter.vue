<template>
 
<div>
  <div class="row">
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="ACB1"></ChartAVW>
      <p class="text-center">ACB1</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="ACB2"></ChartAVW>
      <p class="text-center">ACB2</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="ACB3"></ChartAVW>
      <p class="text-center">ACB3</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="ACB4"></ChartAVW>
      <p class="text-center">ACB4</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="VCB1"></ChartAVW>
      <p class="text-center">VCB1</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="VCB2"></ChartAVW>
      <p class="text-center">VCB2</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="VCB3"></ChartAVW>
      <p class="text-center">VCB3</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="VCB4"></ChartAVW>
      <p class="text-center">VCB4</p>
    </div>
    <div class="col-3 mb-2">
      <ChartAVW :chartObj="MVCB"></ChartAVW>
      <p class="text-center">MVCB</p>
    </div>
  </div>
</div>
 
</template>

<script >
import ChartAVW from '@/components/ChartAVW.vue';

export default {
      props: {   
        socketData :{
        type: Array,
        default: []
        }
      },
      components: {
         ChartAVW
      },
      computed: { 
        ACB1:function () { return this.socketData.find(x=> {return x.equipment_id == "ACB1"}); }, 
        ACB2:function () { return this.socketData.find(x=> {return x.equipment_id == "ACB2"}); }, 
        ACB3:function () { return this.socketData.find(x=> {return x.equipment_id == "ACB3"}); }, 
        ACB4:function () { return this.socketData.find(x=> {return x.equipment_id == "ACB4"}); }, 
        VCB1:function () { return this.socketData.find(x=> {return x.equipment_id == "VCB1"}); }, 
        VCB2:function () { return this.socketData.find(x=> {return x.equipment_id == "VCB2"}); }, 
        VCB3:function () { return this.socketData.find(x=> {return x.equipment_id == "VCB3"}); }, 
        VCB4:function () { return this.socketData.find(x=> {return x.equipment_id == "VCB4"}); }, 
        MVCB:function () { return this.socketData.find(x=> {return x.equipment_id == "MVCB"}); }, 
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
        
        }
    };
</script>
<style>
</style>