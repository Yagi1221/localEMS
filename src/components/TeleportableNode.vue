
  <template>
    <teleport :disabled="!teleport" :to="teleport">
      <transition :name="animation">
        <div v-if="!transition" class="teleportable">
          <!-- <Handle type="target" :position="Position.Top" /> -->
          {{ id }}
      <!-- <el-table id="exTable" stripe :data="CBData" border   class="rounded-3" :header-cell-style="{ border:'1px solid #3A86FF'}" :cell-style="{ border:'1px solid #3A86FF'}">
       <el-table-column align="center" width="" label="TK"  prop="TK"></el-table-column>
       <el-table-column align="center" width="" label="L/R" prop="L/R"></el-table-column>
       <el-table-column align="center" width="" label="Relay" prop="Relay"></el-table-column>
      </el-table>    
      <el-table id="exTable" stripe :data="CBData" border  class="rounded-3" :header-cell-style="{ border:'1px solid #3A86FF' }" :cell-style="{ border:'1px solid #3A86FF'}">
       <el-table-column align="center" width="" label="U" prop="U"></el-table-column>
       <el-table-column align="center" width="" label="I" prop="I"></el-table-column>
       <el-table-column align="center" width="" label="P"  prop="P"></el-table-column>
       <el-table-column align="center" width="" label="PF"  prop="PF"></el-table-column>
      </el-table> -->
<div class="d-flex">

  <table style="border-collapse: separate; border-spacing: 0;">
  <tr>
  <td style="border: 1px solid green; border-top-left-radius: 5px;">TK</td>
  <td style="border: 1px solid green; border-top-right-radius: 5px;">Test</td>
</tr>
<tr>
  <td style="border: 1px solid green;">L/R</td>      
  <td style="border: 1px solid green;">Remote</td>
</tr>
<tr>
  <td style="border: 1px solid green; border-bottom-left-radius: 5px;">Relay</td>
  <td style="border: 1px solid green; border-bottom-right-radius: 5px;">Trip</td>
</tr>
<tr>
</tr>
</table>

<table class="ms-3" style="border-collapse: separate; border-spacing: 0;">
  <tr>
  <td style="border: 1px solid green; border-top-left-radius: 5px;">U</td>
  <td style="border: 1px solid green; border-top-right-radius: 5px;">281.2 kV</td>
</tr>
<tr>
  <td style="border: 1px solid green;">I</td>
  <td style="border: 1px solid green;">205 A</td>
</tr>
<tr>
  <td style="border: 1px solid green; ">P</td>
  <td style="border: 1px solid green;">1192 W</td>
</tr>
<tr>
  <td style="border: 1px solid green; border-bottom-left-radius: 5px;">PF</td>
  <td style="border: 1px solid green; border-bottom-right-radius: 5px;">0.97</td>
</tr>
</table>
</div>
          <!-- <Handle type="source" :position="Position.Bottom" /> -->
        </div>
      </transition>
    </teleport>
  </template>
  <script setup>
    import { Handle, Position } from '@braks/vue-flow'
    import { useTransition } from '@/lib/useTransition.js'
    
    const props = defineProps({
      id: {
        type: String,
        required: true,
      },
    });
    
    const { animation, transition, teleport, onClick } = useTransition(props.id);
    const changeAnimation = () => {
      animation.value = animation.value === 'fade' ? 'shrink' : 'fade'
    };
    </script>
    
    <script>
    export default {
      inheritAttrs: false,
      data(){
        return{
          CBData:[
            {'TK':'Test','L/R':'Remote','Relay':'Trip','U':281.2,'I':205,'P':1192,'PF':0.97},
          ]
        }
      },
    }
    </script>
    