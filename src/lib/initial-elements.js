import { MarkerType } from '@braks/vue-flow'
const lala=[{'time':'2022-09-19','active':2890,'reactive':110}]
/**
 * You can pass elements together as a v-model value
 * or split them up into nodes and edges and pass them to the `nodes` and `edges` props of Vue Flow (or useVueFlow composable)
 */
export const initialElements = [
  { id: '1', type: 'input', label: '台電端', position: { x: 200, y: -150 }, class: 'light' },
  { id: '2', label: 'DS', position: { x: 255, y: -62.5 }, class: 'light p-0',style:{width:'40px', height:'40px' ,textAlign:'center', borderColor: 'green'}},
  { id: '3', label: 'MOF', position: { x: 200, y: 25 }, class: 'light' ,style:{borderColor:'#033f63'} },
  { id: '4', label: 'CPT DS', position: { x: 255, y: 112.5 }, class: 'light p-0' ,style:{width:'40px', height:'40px' ,textAlign:'center',borderColor: 'green'}},
  { id: '5', label: 'MVCB', position: { x: 200, y: 200 }, class: 'light' ,style:{borderColor: 'green'}},
  { id: '6', label: 'VCB1', position: { x: -600, y: 325 }, class: 'light',style:{borderColor: 'green'} },
  { id: '7', label: 'VCB2', position: { x: -100, y: 325 }, class: 'light',style:{borderColor: 'green'} },
  { id: '8', label: 'VCB3', position: { x: 400, y: 325 }, class: 'light',style:{borderColor: 'green'} },
  { id: '9', label: 'VCB4', position: { x: 900, y: 325 }, class: 'light',style:{borderColor: 'green'} },
  { id: '10', label: 'TR11', position: { x: -545, y: 412.5 }, class: 'light p-0',style:{width:'40px',height:'40px',borderRadius:'50%',textAlign:'center' ,borderColor:'orange'} },
  { id: '11', label: 'TR21', position: { x: -45, y: 412.5 }, class: 'light p-0',style:{width:'40px',height:'40px',borderRadius:'50%',textAlign:'center' ,borderColor:'orange'} },
  { id: '12', label: 'TR31', position: { x: 455, y: 412.5 }, class: 'light p-0',style:{width:'40px',height:'40px',borderRadius:'50%',textAlign:'center' ,borderColor:'orange'} },
  { id: '13', label: 'TR41', position: { x: 955, y: 412.5 }, class: 'light p-0',style:{width:'40px',height:'40px',borderRadius:'50%',textAlign:'center' ,borderColor:'orange'} },
  { id: '14', label: 'ACB1', position: { x: -600, y: 500 }, class: 'light',style:{borderColor: 'green'} },
  { id: '15', label: 'ACB2', position: { x: -100, y: 500 }, class: 'light',style:{borderColor: 'green'} },
  { id: '16', label: 'ACB3', position: { x: 400, y: 500 }, class: 'light',style:{borderColor: 'green'} },
  { id: '17', label: 'AUX', position: { x: 900, y: 500 }, class: 'light' ,style:{borderColor:'#033f63'} },
  { id: '18', label: 'PCS1', position: { x: -600, y: 600 }, class: 'light' ,style:{borderColor:'#033f63'} },
  { id: '19', label: 'PCS2', position: { x: -100, y: 600 }, class: 'light' ,style:{borderColor:'#033f63'} },
  { id: '20', label: 'PCS3', position: { x: 400, y: 600 }, class: 'light' ,style:{borderColor:'#033f63'} },
  { id: '21',type:'output', label: 'ESS1', position: { x: -600, y: 700 }, class: 'light' },
  { id: '22',type:'output', label: 'ESS2', position: { x: -100, y: 700 }, class: 'light' },
  { id: '23',type:'output', label: 'ESS3', position: { x: 400, y: 700 }, class: 'light' },
  { id: 'MOF_INFO', label: `${lala[0].active} kWh/${lala[0].reactive} kVARH`, position: { x: 160, y: 0 }, class: 'light',parentNode:'3' },
  { id: 'MVCB_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -95 }, class: 'light' ,parentNode:'5'},
  { id: 'VCB1_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'6'},
  { id: 'VCB2_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'7'},
  { id: 'VCB3_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'8'},
  { id: 'VCB4_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'9'},
  { id: 'ACB1_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'14'},
  { id: 'ACB2_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'15'},
  { id: 'ACB3_INFO', type: 'teleportable',label: 'info', position: { x: 160, y: -25 }, class: 'light' ,parentNode:'16'},
  { id: '24', label: '台電頻率', position: { x: -600, y: -50 }, class: 'light'},
  { id: '25', label: '整廠輸出/輸入', position: { x: -400, y: -50 }, class: 'light'},
  { id: '26', label: 'ESS1輸出/輸入', position: { x: -400, y: 0 }, class: 'light' },
  { id: '27', label: 'ESS2輸出/輸入', position: { x: -400, y: 50 }, class: 'light' },
  { id: '28', label: 'ESS3輸出/輸入', position: { x: -400, y: 100 }, class: 'light' },
  { id: '29', label: '整廠功率因數', position: { x: -400, y: 150 }, class: 'light'},
  { id: '30', label: '淨計量電能消失', position: { x: -400, y: 200 }, class: 'light'},
  
  // source是上層 target是下層

  // type: 'smoothstep'圓角
  { id: 'e1-2', type: 'smoothstep', source: '1', target: '2', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e2-3', type: 'smoothstep', source: '2', target: '3', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e3-4', type: 'smoothstep', source: '3', target: '4', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e4-5', type: 'smoothstep', source: '4', target: '5', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e5-6', type: 'smoothstep', source: '5', target: '6', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e5-7', type: 'smoothstep', source: '5', target: '7', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e5-8', type: 'smoothstep', source: '5', target: '8', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e5-9', type: 'smoothstep', source: '5', target: '9', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e6-10', type: 'smoothstep', source: '6', target: '10', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e7-11', type: 'smoothstep', source: '7', target: '11', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e8-12', type: 'smoothstep', source: '8', target: '12', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e9-13', type: 'smoothstep', source: '9', target: '13', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e10-14', type: 'smoothstep', source: '10', target: '14', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e11-15', type: 'smoothstep', source: '11', target: '15', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e12-16', type: 'smoothstep', source: '12', target: '16', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e13-17', type: 'smoothstep', source: '13', target: '17', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e14-18', type: 'smoothstep', source: '14', target: '18', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e15-19', type: 'smoothstep', source: '15', target: '19', animated: true ,style: { stroke: '#3A86FF' },},
  { id: 'e16-20', type: 'smoothstep', source: '16', target: '20', animated: true ,style: { stroke: '#3A86FF' },},
   // 可變色,type:'step'直角
  {
    id: 'e18-21',
    type: 'step',
    label: '充電',
    source: '18',
    target: '21',
    animated:true,
    style: { stroke: '#3A86FF' },
    // labelBgStyle: { fill: 'orange' },
  },
   // 有箭頭
   { id: 'e19-22', source: '19', target: '22',label:'充電', animated:true,markerEnd: MarkerType.Arrow,style: { stroke: '#3A86FF' }, },
   // 沒箭頭
   { id: 'e20-23', source: '20', target: '23',label:'充電', animated: true,style: { stroke: '#3A86FF' }, },
 
]
