<template>
  <div class="bg d-flex d-flex align-items-center justify-content-center row m-0" style="width:100vw; height:100vh; background:rgb(7,30,61);">
    <div class="col-md-6" style="">
      <div class="ms-2 me-2 w-100 row  d-flex align-items-center justify-content-center" style="height: 90vh;  background:white; border-radius:2rem;">
          <div class=" row m-0" style="width: 20vw;">
            <img src="@/assets/FEMCBanner.png" alt="" class="mb-5" style="height:100px" >
            <el-form class=" p-0">
              <div class="justify-content-center d-flex align-items-center">
                <el-input style="height:5vh; " type="text" v-model="acc" @keyup.enter="login" placeholder="Username">
                </el-input>
              </div>
              <div class="mt-3 justify-content-center d-flex align-items-center">
                <el-input style="height:5vh; " type="password" v-model="pwd"  @keyup.enter="login" placeholder="Password">
                </el-input>
              </div>
            </el-form>
            <el-button class="btn mt-3" @click="login" style="" type="primary">Login</el-button>
            <div class=" text-center mt-3 "> <a href="#">Forget password?</a>
          </div>
          </div>
      </div>
    </div>
    <div class="d-none d-md-block col-md-6 bg-green" style="height:100% "></div>
 
  </div>
</template>

<script >
import { LOGIN  } from '@/api/Api.js'
export default {
  data() {
    return {
      acc: '',
      pwd: '',
      token: '',
      show_modal: false,
      dialogWidth: '250px',
      fields: [],
      FormData: {
        field_choosed: ''
      }
    };
  },
  created() {
  },
  watch: {
  },
  methods: {
 
    login() {
      const vm = this;
      LOGIN({ account: vm.acc, password: vm.pwd , type:1 }).then((response) => {
        if (response.data.Success) {
          this.$store.commit('loginSuccess' ,response.data);
          this.$router.push({ name: "Dashboard" });
        } else {
          vm.$message({ type: 'error', message: '登入失敗', center: true, });
        }
      }).catch((response) => {
        vm.$message({ type: 'error', message: '登入失敗:' + response, center: true, });
        console.log(response)
      });
    },
 
  },
};
</script>
<style type="text/css" scoped>
.bg-green {
  background: no-repeat url('@/assets/loginBackgroud2.jpg') center;
  background-size: cover;
}

@media(max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px
  }
}
</style>