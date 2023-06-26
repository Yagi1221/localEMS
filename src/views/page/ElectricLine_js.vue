

<template>

  <VueFlow v-model="elements" class="basicflow" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4" >
    <template #node-teleportable="props">
        <TeleportableNode v-bind="props" />
      </template>
    <Background pattern-color="#aaa" gap="8" />
    <MiniMap />
    <Controls />

    <div class="save__controls">
      <button style="background-color: #33a6b8" @click="onSave()">save</button>
      <button style="background-color: #113285" @click="onRestore">restore</button>
      <button style="background-color: #6f3381" @click="onAdd">add node</button>
      <button style="background-color: #113230" @click="logToObject">log toObject</button>
    </div>
  </VueFlow>
<!-- <iframe src="http://192.168.56.101:8000/#/openview/59a495bd96397632?page=8tojhqug" width="100%" height="95%" frameborder="0"></iframe> -->
</template>
<script setup>
  import { Background, Controls, MiniMap, VueFlow, isNode, useVueFlow } from '@braks/vue-flow'
  import { ref } from 'vue'
  import { initialElements } from '@/lib/initial-elements.js'
  import TeleportableNode from '@/components/TeleportableNode.vue'
  /**
   * useVueFlow provides all event handlers and store properties
   * You can pass the composable an object that has the same properties as the VueFlow component props
   */
  const { onPaneReady, onNodeDragStop, onConnect, addEdges, setTransform, toObject,nodes, addNodes, setNodes, setEdges, dimensions} = useVueFlow();
  
  /**
   * Our elements
   */
  const elements = ref(initialElements);
  const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
  /**
   * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
   *
   * onPaneReady is called when viewpane & nodes have visible dimensions
   */
  onPaneReady(({ fitView }) => {
    fitView()
  });
  
  onNodeDragStop((e) => console.log('drag stop', e));
  
  /**
   * onConnect is called when a new connection is created.
   * You can add additional properties to your new edge (like a type or label) or block the creation altogether
   */
  onConnect((params) => addEdges([params]));
  

  /**
   * toObject transforms your current graph data to an easily persist-able object
   */
  const logToObject = () => console.log(toObject());
  
  
  // Controls
  const flowKey = 'example-flow';
  
  const onSave = () => {
    localStorage.setItem(flowKey, JSON.stringify(toObject()))
  };
  

const onRestore = () => {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(flow.nodes)
    setEdges(flow.edges)
    setTransform({ x, y, zoom: flow.zoom || 0 })
  }
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