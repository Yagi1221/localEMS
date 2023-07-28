<template>
  <div class="p-5">
    <h1>歷史數據</h1>

  </div>
</template>
<script>

import {
} from '@/api/Api.js';
import moment from 'moment';
import * as echarts from "echarts";


export default {
  components: {
  },
  data() {
    return {
      moment,
    };
  },
  computed: {
    ApiRequest: function () {
      return {
      }
    },

  },
  mounted() {
  },
  created() {
  },
  watch: {
  },
  methods: {
  },
};
</script>
