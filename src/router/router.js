import { createWebHistory, createRouter } from "vue-router";
const routes = [

  {
    path: "/",
    name: "root",
    component: () => import("@/views/public/login"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/public/login"),
  }, 
  {
    path: "/SSO",
    name: "SSO",
    component: () => import("@/views/public/SSO"),
  }, 
  {
    path: "/Field",
    name: "Field",
    component: () => import("@/views/frame/Field"),
    children: [
      {
        path: "/FieldHome",
        name: "FieldHome",
        component: () => import("@/views/page/CoachLanding"),
      }, 

      {
        path: "/Dashboard",
        name: "Dashboard",
        component: () => import("@/views/page/Dashboard"),
      },
      {
        path: "/Alert",
        name: "Alert",
        component: () => import("@/views/page/Alert"),
      },
      {
        path: "/CommunicateLine",
        name: "CommunicateLine",
        component: () => import("@/views/page/CommunicateLine"),
      },
      {
        path: "/ElectricLine",
        name: "ElectricLine",
        component: () => import("@/views/page/ElectricLine"),
      },
      {
        path: "/CabinetList",
        name: "CabinetList",
        component: () => import("@/views/page/CabinetList"),
      },

      {
        path: "/CabinetList",
        name: "CabinetList",
        component: () => import("@/views/page/CabinetList"),
      },
      {
        path: "/CabinetList",
        name: "CabinetList",
        component: () => import("@/views/page/CabinetList"),
      },
      {
        path: "/CabinetList",
        name: "CabinetList",
        component: () => import("@/views/page/CabinetList"),
      },
      
      {
        path: "/BMSMonitor",
        name: "BMSMonitor",
        component: () => import("@/views/page/BMSMonitor"),
      },      
      {
        path: "/BMSAlert",
        name: "BMSAlert",
        component: () => import("@/views/page/BMSAlert"),
      },
      {
        path: "/BMSControlCommands",
        name: "BMSControlCommands",
        component: () => import("@/views/page/BMSControlCommands"),
      },
      
      {
        path: "/BMSPlot",
        name: "BMSPlot",
        component: () => import("@/views/page/BMSPlot"),
      },
      {
        path: "/BMSDeviceParameters",
        name: "BMSDeviceParameters",
        component: () => import("@/views/page/BMSDeviceParameters"),
      },
      {
        path: "/BMSHistory",
        name: "BMSHistory",
        component: () => import("@/views/page/BMSHistory"),
      },

      {
        path: "/test",
        name: "test",
        component: () => import("@/views/page/test"),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*)',
    name: 'notfound',
    component: () => import("@/views/public/login"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;