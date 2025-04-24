import request from "@/assets/index.js";

export function getOpusList(data) {
    return request({
        url: "/Opus/opusAll",
        method: "post",
        params:data
    })
}
// 作品修改
export function insetOpus(data) {
    return request({
        url: "/Opus/opusUpd",
        method: "post",
        data
    })
}

//恢复作品删除
export  function getOpusHui(data){
    return request({
        url:"/Opus/huiOpus",
        method:"post",
        params: {opusId: data}
    })
}
//作品审核成功
export  function getOpusShen(id,updFlag){
    return request({
        url:"/Opus/updateOpus",
        method:"post",
        params:{opusId: id, updFlag: updFlag}
    })
}
//逻辑删除
export  function getOpusDel(id){
    return request({
        url:"/Opus/delOpus",
        method:"post",
        params:{opusId: id}
    })
}
//作品添加（需审核）
export  function getOpusAdd(data){
    return request({
        url:"/Opus/addOpus",
        method:"post",
        data
    })
}
// 彻底删除
export  function getOpusDelete(opusId){
    return request({
        url:"/Opus/opusDelete",
        method:"post",
        params:{"opusId":opusId}
    })
}
