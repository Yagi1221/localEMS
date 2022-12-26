import { createStore } from "vuex";
// import { LOGIN } from '@/api/Api.js'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state () {
        return {
          field: '',
          FieldName:'',
          FieldList:[],
          user: {
            id : '',
            loginType : -1,
            priviage: -1,
            name: '',
            token: '',
          },
          starDate:'',
          starYear:'',
          DemoData: '',
        }
      },
      getters: {
          user(state){ return state.user},
          getField(state){ 
            return new URLSearchParams(window.location.search).get('fieldid') || state.field;
          },
          getFieldName(state){ 
            return state.FieldName;
          },
          getFieldList(state){ 
            return  state.FieldList;
          },
          getStarDate(state){
            return state.starDate;
          },
          getDemoData(state) {
            return state.DemoData;
          }
      }, 
      mutations: {
        setFieldList(state,val) {
          state.FieldList = val;
        },
        setField(state,val) {
          state.field = val;
        },
        setFieldName(state,val) {
          state.FieldName = val;
        },
        setStarDate(state,val){
          state.starDate = val;
        },
        loginSuccess (state, user) {
          state.user = user;
        },
        logOut(state) {
          state.field = '';
          state.user = {
                id : '',
                loginType : -1,
                name: '',
                token: '',
            };
        },
        setDemoData(state,val) {
          state.DemoData = val;
        }
      },
      actions: {
        // async Login(context, user) {
        //     let response = await LOGIN(user).then((response) => {
        //         return {Success: true, data : response.data}
        //     }).catch((response) => {
        //         return {Success: false, Response : response}
        //     });
        //     if (response.Success) {
        //         context.commit("loginSuccess" , response.data);
                
        //     }
        //     return response;
        // }
      },
      modules: {

      },
      plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});
export default store;