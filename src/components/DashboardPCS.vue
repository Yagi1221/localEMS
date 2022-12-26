<template>
      <div class="col-4 p-0 mb-2" >
        <div class="p-1 me-1 rounded border border-1 border-success">
          <div :class="'text-white ' + getClass('CABINET_1' , 'abnormal')">
              <small>
                <font-awesome-icon  icon="bolt" v-if="CABINET_1?.active_power > 0" />
                <font-awesome-icon icon="battery" v-if="CABINET_1?.active_power < 0" />
                {{ CABINET_1?.active_power ? (CABINET_1.active_power / 1000).toFixed(2).toLocaleString() : 'NaN' }} kWh / {{CABINET_1?.internal_temperature}}℃
              </small>
          </div>
        </div>
      </div>
  
      <div class="col-4 p-0 mb-2" >
        <div class="p-1 me-1 rounded border border-1 border-success">
            <div :class="'text-white ' + getClass('CABINET_2' , 'abnormal')">
              <small>
                <font-awesome-icon  icon="bolt" v-if="CABINET_2?.active_power > 0" />
                <font-awesome-icon icon="battery" v-if="CABINET_2?.active_power < 0" />
                {{ CABINET_2?.active_power ? (CABINET_2.active_power / 1000).toFixed(2).toLocaleString() : 'NaN' }} kWh / {{CABINET_2?.internal_temperature}}℃
              </small>
          </div>
        </div>
      </div>

      <div class="col-4 p-0 mb-2" >
        <div class="p-1 me-1 rounded border border-1 border-success">
          <div :class="'text-white ' + getClass('CABINET_3' , 'abnormal')">
              <small>
                <font-awesome-icon  icon="bolt" v-if="CABINET_3?.active_power > 0" />
                <font-awesome-icon icon="battery" v-if="CABINET_3?.active_power < 0" />
                {{ CABINET_3?.active_power ? (CABINET_3.active_power / 1000).toFixed(2).toLocaleString() : 'NaN' }} kWh / {{CABINET_3?.internal_temperature}}℃
              </small>
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
         CABINET_1: function () {
          return this.socketData.find(x=> {return x.parent_id == 'CABINET_1'});
         },
         CABINET_2: function () {
          return this.socketData.find(x=> {return x.parent_id == 'CABINET_2'});
         },
         CABINET_3: function () {
          return this.socketData.find(x=> {return x.parent_id == 'CABINET_3'});
         },
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
      }
    };
</script>
<style>
</style>