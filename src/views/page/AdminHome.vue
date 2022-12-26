<template>
    <!-- 內容 -->
    <div class=" row p-3 m-0">
      <!-- 累計數據 -->
      <div class="row p-0 m-0 mb-3">
        <div class="card col-sm-12 col-md-6 col-lg mb-2 me-lg-2  border-0 border-end border-3 border-success p-0 shadow">
          <div class="card-body bg-success rounded text-white me-1">
            <span class="badge bg-white text-dark"><div class="myIcon IconField"></div></span>
            <h5 class="border-bottom me-5">案場數</h5>
            <div class="row p-2">
              <div class="col p-0 pe-2">
                <div class="myIcon iconSolar"><span class="ps-2">123</span></div>
              </div>
              <div class="col  p-0 pe-2">
                <div class="myIcon iconContainer"><span class="ps-2">234</span></div>
              </div>
              <div class="col  p-0 pe-2">
                <div class="myIcon iconSolarContainer"><span class="ps-2">1081</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-sm-12 col-md-6 col-lg mb-2 me-lg-2  border-0 border-end border-3 border-primary p-0 shadow">
          <div class="card-body bg-primary rounded text-white me-1">
            <span class="badge bg-white text-dark"><div class="myIcon IconTotalContent"></div></span>
            <h5 class="border-bottom me-5">裝置總容量</h5>
            <div class="row p-2">
              <div class="col p-0 pe-2">
                <div class="myIcon iconSolar"> <span class="ps-2">421 MW</span></div>
              </div>
              <div class="col  p-0 pe-2">
                <div class="myIcon iconContainer"><span class="ps-2"> 633 MW</span></div>
              </div>
            </div>
          </div>
        </div> 
        <div class="card col-sm-12 col-md-6 col-lg mb-2 me-lg-2  border-0 border-end border-3 border-danger p-0 shadow">
          <div class="card-body bg-danger rounded text-white me-1">
            <span class="badge bg-white text-dark"><div class="myIcon IconToday"></div></span>
            <h5 class="border-bottom me-5">今日發電量</h5>
            <div class="row p-2">
              <div class="col p-0 pe-2">
                <p class="card-text text-end">412 MW </p>
              </div>
            </div>
          </div>
        </div>  
        <div class="card col-sm-12 col-md-6 col-lg mb-2 me-lg-2  border-0 border-end border-3 border-warning p-0 shadow">
          <div class="card-body bg-warning rounded text-white me-1">
            <span class="badge bg-white text-dark"><div class="myIcon IcontTotalPower"></div></span>
            <h5 class="border-bottom me-5">累積發電量</h5>
            <div class="row p-2">
              <div class="col p-0 pe-2">
                <p class="card-text text-end">412 MW </p>
              </div>
            </div>
          </div>
        </div> 
        <div class="card col-sm-12 col-md-6 col-lg mb-2 me-lg-2  border-0 border-end border-3 border-info p-0 shadow">
          <div class="card-body bg-info rounded text-white me-1">
            <span class="badge bg-white text-dark"><div class="myIcon IcontAllTime"></div></span>
            <h5 class="border-bottom me-5">累計營收</h5>
            <div class="row p-2">
              <div class="col p-0 pe-2">
                <p class="card-text text-end">$2,846,283,751 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 案場地圖 -->
      <div class="row p-0 m-0">
        <div class="col-md-12 col-lg-3 p-0 m-0">
          <FieldsView @ChartClick="ChartClick"></FieldsView>
        </div>
        <!-- 細部內容 -->
        <div class="col-md-12 col-lg-9 ps-4">
          <!-- 即時告警 -->
          <table class="table caption-top table-sm">
            <caption>即時告警</caption>
            <thead class="table-dark">
              <tr>
                <th>時間</th><th>案場</th><th>系統</th><th>內容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="w-25">2022-07-18 10:11:23</td><td >案場a</td><td>Rack1</td><td>過熱</td>
              </tr>
              <tr>
                <td>2022-07-18 10:11:23</td><td>案場b</td><td>Rack1</td><td>過熱</td>
              </tr>
              <tr>
                <td>2022-07-18 10:11:23</td><td>案場b</td><td>Rack1</td><td>過熱</td>
              </tr>
              <tr>
                <td>2022-07-18 10:11:23</td><td>案場b</td><td>Rack1</td><td>過熱</td>
              </tr>
              <tr>
                <td>2022-07-18 10:11:23</td><td>案場b</td><td>Rack1</td><td>過熱</td>
              </tr>
            </tbody>
          </table>
          <!-- 系統公告 -->
          <table class="table caption-top table-sm">
            <caption>系統公告</caption>
            <thead class="table-dark">
              <tr>
                <th>時間</th><th>案場</th><th>內容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-07-18</td><td>案場A</td><td>歲修：2022-10-10 ~ 2022-10-12</td>
              </tr>
              <tr>
                <td>2022-07-18</td><td>案場B</td><td>歲修：2022-10-10 ~ 2022-10-12</td>
              </tr>
              <tr>
                <td>2022-07-18</td><td>案場B</td><td>歲修：2022-10-10 ~ 2022-10-12</td>
              </tr>
              <tr>
                <td>2022-07-18</td><td>案場B</td><td>歲修：2022-10-10 ~ 2022-10-12</td>
              </tr>
              <tr>
                <td>2022-07-18</td><td>案場B</td><td>歲修：2022-10-10 ~ 2022-10-12</td>
              </tr>
            </tbody>
          </table>
          <!-- 排程與sbspm -->
          <!-- <p class="d-3">案場得標排程</p>
          <el-carousel :interval="4000" type="card"  height="150px">
            <el-carousel-item v-for="item in 3" :key="item">
              <div class="text-center"> 案場 {{item}} </div>
              <img src="@/assets/sbspm.png" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block"></div>
            </el-carousel-item>
          </el-carousel> -->
        
        </div>
      </div>
    </div>
 
</template>
<script>

import moment from 'moment';
import FieldsView from '@/components/FeildView.vue'
export default {
  name: 'charttest',
  setup() { },
  props: {
    equipment_id: {
      type:String,
      default:''
    }
  },
  components: {
    FieldsView
  },
  data() {
    return {
       
    };
  },
  methods: { 
    ChartClick(data) {
      this.$store.commit('setField' ,data.data.id);
      this.$store.commit('setFieldName' ,data.data.text);
      if (data.data.type == 'solar') {
        this.$router.push({name: 'SolarHome'});
      } else if (data.data.type == 'storage') {
        this.$router.push({name: 'Dashboard'});
      }
      else if (data.data.type == 'ups') {
        this.$router.push({name: 'ups'});
      }
      // var parmater = { fieldid : data.data.id };
      // let routeData ;
      // this.$store.commit('setField' ,data.data.id);
      // if (data.data.type == 'solar') {
      //   routeData = this.$router.push({name: 'SolarHome'});
      // } else if (data.data.type == 'storage') {
      //   routeData = this.$router.resolve({name: 'Dashboard'});
      // }
      // else if (data.data.type == 'ups') {
      //   routeData = this.$router.resolve({name: 'ups'});
      // }

      // window.open(routeData.href, '_blank');
    },
  },
  watch: {
  },
  mounted() {
    

  },
  computed: { 
  },
  created() {
     
  },
};
</script>
 
<style scoped> 
</style>