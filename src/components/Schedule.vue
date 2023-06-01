<template>
 <div class="scheduleCompoment">
  <h1 v-if="Editable">充放電排程</h1>
  <!-- 系統設定 -->
  <div class="mb-2 row" v-if="Editable">
    <p style="font-style: italic;">
      (裝置容量 * ( 儲電上限 - 電池保護電力 ) - 保留緊急供電) / 裝置容量 = 可放電總合百分比
    </p>
    <div class="col fs-5">
      <span class="me-4">
        <b class="">離峰儲電：</b> 
        {{ Setting.Schedule?.charge_type == 1 ? '是' : '否'}}
      </span>
      <span class="me-4">
        <b class="">裝置總容量：</b> 
        {{Setting?.Schedule?.total_capacity}} MW
      </span>
      <span class="me-4">
        <b class="">儲電 SOC 上限：</b> 
        {{Setting?.Schedule?.upper_soc}} %
      </span>
      <span class="me-4">
        <b class="">電池保護電力：</b> 
        {{Setting?.Schedule?.protect_power}} %
      </span>
      <span class="me-4">
        <b class="">緊急供電：</b> 
        {{Setting.Schedule?.emergency_power}} MW
      </span>
      <span class="me-4">
        <b class="">可放電總合：</b> 
         {{Setting?.Schedule?.total_discharge}} %
      </span>
    </div>
    <div class="col-1 text-end" >
      <el-tooltip :content="Setting?.ElectSetting?.Render" raw-content effect="light">
        <el-button>?</el-button>
      </el-tooltip>
      <el-button @click="Add">
        <font-awesome-icon icon="plus" />
      </el-button>
    </div>
  </div>

  <div class="text-center mt-4" v-if="!Editable">
    <span class="text-danger me-3"> <font-awesome-icon icon="square" />尖峰</span>
    <span class="text-primary me-3"> <font-awesome-icon icon="square" />半尖峰</span>
    <span class="text-success"> <font-awesome-icon icon="square" />離峰</span>
  </div>

  <!-- 排程 -->
  <div>
    <!-- 24小時 -->
    <div class="row text-center">
      <div class="col-1 border"></div>
      <div class="col">
        <div class="row">
          <div class="col text-center border">00</div>
          <div class="col text-center border">01</div>
          <div class="col text-center border">02</div>
          <div class="col text-center border">03</div>
          <div class="col text-center border">04</div>
          <div class="col text-center border">05</div>
          <div class="col text-center border">06</div>
          <div class="col text-center border">07</div>
          <div class="col text-center border">08</div>
          <div class="col text-center border">09</div>
          <div class="col text-center border">10</div>
          <div class="col text-center border">11</div>
          <div class="col text-center border">12</div>
          <div class="col text-center border">13</div>
          <div class="col text-center border">14</div>
          <div class="col text-center border">15</div>
          <div class="col text-center border">16</div>
          <div class="col text-center border">17</div>
          <div class="col text-center border">18</div>
          <div class="col text-center border">19</div>
          <div class="col text-center border">20</div>
          <div class="col text-center border">21</div>
          <div class="col text-center border">22</div>
          <div class="col text-center border">23</div>
        </div>
      </div>
    </div>
    <!-- 星期一的color  -->
    <div class="row color-row">
      <div class="col-1 p-0 border"></div>
      <div class="col p-0 border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col p-0 ' + getColorBar(1,time)" :key="time" ></div>
        </div>
      </div>
      
    </div>
    <!-- 星期一的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 p-0 border">星期一</div>
      <div class="col p-0" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 1})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>

    <!-- 星期二的color  -->
    <div class="row color-row">
      <div class="col-1 p-0 border"></div>
      <div class="col p-0 border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(2,time)" :key="time"></div>
        </div>
      </div>
      
    </div>
    <!-- 星期二的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期二</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 2})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>

    
    <!-- 星期三的color  -->
    <div class="row color-row">
      <div class="col-1 border"></div>
      <div class="col border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(3,time)" :key="time"></div>
        </div>
      </div>
      
    </div>
    <!-- 星期三的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期三</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 3})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>

    
    <!-- 星期四的color  -->
    <div class="row color-row">
      <div class="col-1 border"></div>
      <div class="col border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(4,time)" :key="time"></div>
        </div>
      </div>
      
    </div>
    <!-- 星期四的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期四</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 4})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
        </div>
      </div>
    </div>

  
    
    <!-- 星期五的color  -->
    <div class="row color-row">
      <div class="col-1 border"></div>
      <div class="col border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(5,time)" :key="time"></div>
        </div>
      </div>
    </div>
    <!-- 星期五的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期五</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 5})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>

  <!-- 星期六的color  -->
    <div class="row color-row">
      <div class="col-1 border"></div>
      <div class="col border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(6,time)" :key="time"></div>
        </div>
      </div>
      
    </div>
    <!-- 星期六的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期六</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 6})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>

    <!-- 星期日的color  -->
    <div class="row color-row">
      <div class="col-1 border"></div>
      <div class="col border" >
        <div class="row">
          <div v-for ="time in hourData" :class="'col ' + getColorBar(7,time)" :key="time"></div>
        </div>
      </div>
      
    </div>
    <!-- 星期日的排程 -->
    <div class="row text-center" style="position: relative;">
      <div class="col-1 border">星期日</div>
      <div class="col" style="position: relative;">
        <div class="row">
          <span class="SchedultItem cursor-pointer" v-for=" item in Setting.Schedule?.schedule?.filter(x=> {return x.week== 7})" :key="item.id" @click="Edit(item)"
            :style="getPosition(item)">
            <font-awesome-icon icon="battery-full" v-if="item.type == 0 " />
            <font-awesome-icon icon="bolt" v-if="item.type == 1 " />
            {{item.soc}}%
          </span>

          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          <div class="col border"></div>
          
        </div>
        
      </div>
    </div>
  </div>

  <div class="text-center mt-4" v-if="Editable">
    <span class="text-danger me-3"> <font-awesome-icon icon="square" />尖峰</span>
    <span class="text-primary me-3"> <font-awesome-icon icon="square" />半尖峰</span>
    <span class="text-success"> <font-awesome-icon icon="square" />離峰</span>
  </div>

  <el-dialog title="儲放電設定" center v-model="Dialog" :close-on-click-modal="false" :show-close="false" width="300px" >
    <el-form :model="Form" :rules="FormRule" ref="Form" label-width="auto">
      <el-form-item label="每週" prop="week">
          <el-select v-model="Form.week" placeholder="請選擇">
            <el-option label="星期一" value="1"/>
            <el-option label="星期二" value="2"/>
            <el-option label="星期三" value="3"/>
            <el-option label="星期四" value="4"/>
            <el-option label="星期五" value="5"/>
            <el-option label="星期六" value="6"/>
            <el-option label="星期日" value="7"/>
          </el-select>
      </el-form-item>
      <el-form-item label="開始時間" prop="start_time">
          <el-time-picker v-model="Form.start_time" placeholder="Please input" value-format="hh:mm:ss" />
      </el-form-item>
      <el-form-item label="結束時間" prop="end_time">
          <el-time-picker v-model="Form.end_time" placeholder="Please input" value-format="hh:mm:ss" />
      </el-form-item>
      <el-form-item label="儲/放電" prop="type">
          <el-radio-group v-model="Form.type" >
            <el-radio-button :label="1">放電</el-radio-button>
            <el-radio-button :label="0" :disabled="Setting.Schedule?.charge_type == 1">充電</el-radio-button>
          </el-radio-group>   
      </el-form-item>
      <el-form-item label="SOC" prop="soc">
        <el-input type="number" v-model.number="Form.soc" placeholder="" :min="0" :max="Setting.Schedule?.total_discharge"  >
          <template #append>%</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer mt-5" align="center">
      <el-button @click="Dialog = false">
        <font-awesome-icon icon="circle-xmark" />
      </el-button>
      <el-popconfirm title="確定刪除" confirm-button-text="確定" cancel-button-text="取消" @confirm="Delete">
        <template #reference>
          <el-button>
            <font-awesome-icon icon="trash" />
          </el-button>
        </template>
      </el-popconfirm>


      <el-button type="primary" @click="Submit">
        <font-awesome-icon icon="circle-check" />
      </el-button>
    </div>
  </el-dialog>

 </div>
</template>
<script>

import {
  getSystemStorageSetting , getSystemElectricSetting,
  getSystemScheduleSetting, postSystemScheduleSetting, delSystemScheduleSetting, 
} from '@/api/Api.js';

import moment from 'moment';
export default {
  name: 'Schedule',
  props: {
    Editable : {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data() {
    return {
      Dialog: false,
      moment,
      hourData : [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5],
      Form : {
        id:'',
        week:"",
        start_time:"",
        end_time:"",
        type:1,
        soc:0,
      },
      FormTemplate : {
        id:'',
        week:"",
        start_time:"12:00:00",
        end_time:"12:00:00",
        type:1,
        soc:0,
      },
      FormRule: {
        week: [{    required: true, message: ' ',trigger: 'blur'  }],
        start_time: [{ required: true, message: ' ',trigger: 'blur' }],
        end_time: [{ required: true, message: ' ',trigger: 'blur' }],
        type: [{ required: true, message: ' ',trigger: 'blur' }],
        soc: [{type:"number" ,   required: true, message: ' ',trigger: 'blur' }],
      },
      Setting:{
        summer_time_start: '0601',
        summer_time_end: '0830',
        Schedule: null,
        ElectSetting:null, 
      },
    }
  },
  watch: {
    
  },
 
  mounted() {
    this.getSystemStorageSetting();
    this.getSystemElectricSetting();
    this.getSystemScheduleSetting();
  },
  computed: { 
 
  },
  methods: {
    getSystemScheduleSetting() {
      const vm = this;
      getSystemScheduleSetting()
      .then(response => {
        if (response.data.message == "Success") {
            vm.Setting.Schedule = response.data.data[0];
        } else 
        {
          vm.$message({type:'error' , message : response.data.message});
        }
      })
      .catch(response => {})
      .finally(() => {})
    },
    getSystemElectricSetting() {
      const vm = this;
      getSystemElectricSetting()
      .then(response => {
        if (response.data.message == "Success") {
          var find = response.data.data.find(x=> {return x.set == 1} );
          if (find) {
            vm.Setting.ElectSetting = JSON.parse(find.json_data) ;
          }
        } else 
        {
          vm.$message({type:'error' , message : response.data.message});
        }
      })
      .catch(response => {})
      .finally(() => {})
    },
    getSystemStorageSetting() {
      const vm = this;
      getSystemStorageSetting({equipment_type : 1})
      .then(response => {
        if (response.data.message == "Success") {
          var responseData = response.data.data[0].system_data;
          vm.Setting.summer_time_start = responseData.find(x=> {return x.key == "summer_time_start"}).value;
          vm.Setting.summer_time_end = responseData.find(x=> {return x.key == "summer_time_end"}).value;
        } else {
          vm.$message({ type:'error' , message:response.data.message });
        }
      })
      .catch(response => {
        vm.$message({ type:'error' , message:response.message });
      })
      .finally(() => {
      })
    },
    Delete() {
      const vm = this;
      delSystemScheduleSetting({id:vm.Form.id})
      .then(response => {
        if (response.data.message == "Success") {
          vm.Dialog = false;
          vm.getSystemScheduleSetting();
        } else {
          vm.$message({ type:'error' , message:response.data.message });
        }
      })
      .catch(response => {
        vm.$message({ type:'error' , message:response.message });
      })
      .finally(() => {
      });
    },
    Submit() {
      const vm = this;
      vm.$refs.Form.validate((valid) => {
        if (valid) {
          vm.$loading();
          postSystemScheduleSetting(vm.Form)
          .then(response => {
            if (response.data.message == "Success") {
              vm.Dialog = false;
              vm.getSystemScheduleSetting();
            } else {
              vm.$message({ type:'error' , message:response.data.message });
            }
          })
          .catch(response => {
             vm.$message({ type:'error' , message:response.message });
          })
          .finally(() => {
            vm.$loading().close();
          });
 
          vm.Dialog = false;
        }
      });
    },
    Edit(row) {
      if (this.Editable) {
        var data = JSON.parse(JSON.stringify(row));
        this.Form = Object.assign({} , this.FormTemplate , data);
        this.Form.id = data._id;
        this.Dialog = true;
      }
    },
    Add() {
      this.Form = Object.assign({} , this.FormTemplate);
      this.Dialog = true;
    },
     getColorBar(weekDay , hour ) {
      var SummerBegin = this.moment( new Date().getFullYear() + this.Setting.summer_time_start);
      var SummerEnd = this.moment( new Date().getFullYear() + this.Setting.summer_time_end);
      var isSummer = this.moment().isBetween(SummerBegin, SummerEnd);
      
      if (this.Setting.ElectSetting?.Data) {
        var weekDaySetting = this.Setting.ElectSetting.Data?.filter(x=> { 
          return ((x.DayStart > 0 && x.DayEnd >0 && weekDay >= x.DayStart  && weekDay <= x.DayEnd ) || (weekDay == x.DayStart))
          && (
            x.SummberType == 1 || (
                (isSummer && x.SummberType == 2) || (!isSummer && x.SummberType == 3) 
              )
            )
        });
        if (weekDaySetting) {
          var find = weekDaySetting.find(x=> { 
            return this.moment("1999-01-01 00:00:00").add(hour,'hours').add(1,'minutes').isBetween( this.moment("1999-01-01 " + x.TimeStart + ":00" ),  this.moment("1999-01-01 " + x.TimeEnd + ":00"), 'minute', true)
          });

          if (find) {
            if (find.PriceLevel == "離峰") return "bg-success";
            if (find.PriceLevel == "尖峰") return "bg-danger";
            if (find.PriceLevel == "半尖峰") return "bg-primary"
          } 
        }
      }
      return "bg-dark"
     },
     getPosition(row) {
      var dayPart =  this.moment().format("YYYY-MM-DD ");
      var todayBegin = this.moment(dayPart + "00:00:00");
      var startTime = this.moment(dayPart+ row.start_time);
      var endTime = this.moment(dayPart+ row.end_time);
      var left = (startTime.diff(todayBegin, 'minutes', true) / 1440 * 100).toFixed(2);
      var width = (endTime.diff(startTime, 'minutes', true) / 1440 * 100).toFixed(2);
      
      return { left: left + '%', width: width + '%'};
     }
  },
  created() {
  
     
  },
}
</script>
 
<style scoped> 

.scheduleCompoment .col,.scheduleCompoment .col-1 {
  height: 2rem;
}

.scheduleCompoment .color-row .col-1 ,.scheduleCompoment .color-row .col {
   height: 8px;
}

.SchedultItem {
    position: absolute;
    height: 1.5rem;
    margin-top: 4px;
    color: black;
    opacity: .7;
    background-color: gray;
    display: inline-block;
    white-space: nowrap;
}
  
  .scheduleCompoment .col, .scheduleCompoment .row {
    padding:0;
    margin:0;
  }

</style>