<template>
    <div class="" style="background:;">
        <!--nav-->
            <div class=" fixed-top ps-3 border d-flex align-items-center justify-content-between shadow" style="min-height:60px; background:rgb(7, 30, 61);">
                <div class="col-2">
                    <a class="navbar-brand d-flex align-items-center" href="#" style="font-weight:bold;color: #fff;">
                        <img src="@/assets/FEMCLogo.png" alt="" class="me-2 bannerClass " >
                        {{ProjectName}}
                    </a>
                </div>
                     <div class="d-flex" style="">
                      
                      <ul class="d-flex m-0 ps-0 localMenu">
                       <router-link :to="{name:'Dashboard'}" style=""><li class="pe-3 ps-3" style="">案場首頁</li></router-link>
                       <router-link :to="{name:'Alert'}" ><li class="pe-3 ps-3" >警報事件</li></router-link>
                       <router-link :to="{name:'ElectricLine'}" ><li class="pe-3 ps-3" >電力單線圖</li></router-link>
                       <router-link :to="{name:'CommunicateLine'}" ><li class="pe-3 ps-3" >通訊架構圖</li></router-link>
                       <router-link :to="{name:'CabinetList'}" ><li class="pe-3 ps-3" >儲能櫃</li></router-link>
                     </ul>
                    </div>
                <div class="col-2 text-end  d-flex align-items-center justify-content-end pe-5">
                    <avatar></avatar>
                </div>
            </div>
        <!--content-->
        <div class="row m-0">
            <!--content-->
            <div class=" siteMinHeight p-0" style="overflow-x:auto;">
                <div class="container-fluid p-0 rounded">
                    <router-view></router-view>
                </div>
            </div>
        <footer class="d-flex justify-content-center align-items-center text-white w-100 h-10" style=" height:10vh; background:rgb(7, 30, 61);">
          <span class="mb-2">	Copyright © 2022 FEMC Inc.</span>
        </footer>
        </div>
    </div>
</template>

<script >
    import avatar from '@/components/Avatar.vue'

    export default {
        components: {
            'avatar': avatar
        },
        data() {
            return {
                active:false,
                isCollapse: true,
                ProjectName: process.env.VUE_APP_Project,
            };
        },
        mounted(){
          
        },
        beforeUnmount(){
           
        },
        created() {
            
        },
        watch: {
        },
        methods: { 
        },
    };
</script> 