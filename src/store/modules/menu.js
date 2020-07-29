import {requestMenuList} from "../../util/request"
//菜单的状态

const state={
    //列表数据
    list:[],
}
//修改
const mutations={
    changeList(state,arr){
        state.list=arr;
    }
}
//触发页面
const actions={
    requestList(context){
        //istree让他的数据变成树形模式
        requestMenuList({istree:true}).then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}
//导出数据
const getters={
    list(state){
        return state.list
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}