import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store=new Vuex.Store({
  state: {
    tracksData: [
      [
        {
          order: 0,
          time: new Date(0),
          data: [],
          cache: [],
          finish: false
        },
      ],

    ],
    trackTarget: 0,
    targets: [0],
    maxTime: new Date(2500),
  },
  mutations: {
    choiceTrack(state, v) {
      state.trackTarget = v;
    },
    choiceTarget(state,v){
      state.targets[state.trackTarget]=v;
      state.targets.push(); //强制更新，否则curTarget会不更新!
    },
    adjustFrame(state,time){
      store.getters.curData.time=time;
    },
    addFrame(state,item){
      let track=store.getters.curTrack;
      track.push(item);
    },
    deleteFrame: function(order) {
      state.curTrack.splice(order, 1);
      store.commit('reCountFrame')
    },
    changeMaxTime(state,curTime){
      state.maxTime=curTime;
    },
    addTrack(state){
     state.tracksData.push( [
      {
        order: 0,
        time: new Date(0),
        data: [],
        cache: [],
        finish: false
      }
    ])
    state.targets.push(0);
    },
    reCountFrame(state){
      let count = 0;
      for (const item of state.curTrack) {
        item.order = count++;
      }
    }
  },
  getters:{
    curData:function(state,getters){ //当前选中帧中的当前帧数据
      return getters.curTrack[getters.curTarget]
    },
    curTarget:function(state,getters){ //当前选中帧中的当前帧下标
      return state.targets[state.trackTarget];
    },
    curTrack:function(state){ //当前选中的时间轨数据
      return state.tracksData[state.trackTarget];
    },
    trackTotal:function(state){
      return state.tracksData.length;
    },
  }
});
export default store
