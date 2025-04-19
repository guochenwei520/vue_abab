import request from "@/assets/index.js";

export function getOpusList(data) {
    return request({
        url: "/Opus/opusAll",
        method: "get",
        params:data
    })
}

export function insetOpus(data) {
    return request({
        url: "/Opus/opusUpd",
        method: "get",
        params:data
    })
}

//恢复作品删除
export  function getOpusHui(data){
    return request({
        url:"/Opus/huiOpus",
        method:"get",
        params: {opusId: data}
    })
}
//作品审核成功

export  function getOpusShen(id,updFlag){
    return request({
        url:"/Opus/updateOpus",
        method:"get",
        params:{opusId: Id, updFlag: updFlag}
    })
}