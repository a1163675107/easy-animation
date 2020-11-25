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
      [
        {
          order: 0,
          time: new Date(0),
          data: [],
          cache: [],
          finish: false
        }
      ]
    ],
    trackTarget: 0,
    targets: [0,0]
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
