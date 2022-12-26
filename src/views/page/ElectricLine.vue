

<template>

  <VueFlow v-model="elements" class="basicflow"  :zoomOnScroll="false" :min-zoom="0.2" :max-zoom="4"  ref="myVueFlow" >
    <template #node-teleportable="props">
        <TeleportableNode v-bind="props" />
      </template>
    <Controls :showInteractive="false" />

    <div class="save__controls">
      <button style="background-color: #33a6b8" @click="onSave()">save</button>
      <button style="background-color: #113285" @click="onRestore">restore</button>
      <button style="background-color: #6f3381" @click="onAdd">add node</button>
      <button style="background-color: #113230" @click="logToObject">log toObject</button>
    </div>
  </VueFlow>

</template>
<script setup>
  import { Controls, VueFlow, useVueFlow } from '@braks/vue-flow'
  import { ref } from 'vue'
  import ElecData from '@/JSON/ElecData.json'
  import TeleportableNode from '@/components/TeleportableNode.vue'
 
  let VueFlowInstance = null;

 
  const { onPaneReady, onNodeDragStop, onConnect, addEdges, setTransform, toObject,nodes, addNodes, setNodes, setEdges, dimensions , fitView , setInteractive } = useVueFlow();
  
  const elements = ref([]);
 
  onPaneReady((tempVueFlowInstance) => {
    VueFlowInstance = tempVueFlowInstance;
    onRestore();
  });
  
  onNodeDragStop((e) => console.log('drag stop', e));
   
  onConnect((params) => addEdges([params]));
  
 
  const logToObject = () => console.log(toObject());
   
  const flowKey = 'example-flow';
  
  const onSave = () => {
    localStorage.setItem(flowKey, JSON.stringify(toObject()))
    console.log(JSON.stringify(toObject()));
  };
  

const onRestore = ( ) => {
  const flow = ElecData;
  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(flow.nodes)
    setEdges(flow.edges)
  }
  fitView();
  setInteractive(false);
};


const onAdd = () => {
  const id = nodes.value.length + 1
  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }
  addNodes([newNode])
};
  </script>
<style>
.container-fluid{
  height:100%;
}
</style>