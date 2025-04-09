import request from "@/assets/index.js";


export function getUserLike(data){
    return request({
        url:"user/userLike",
        method:"post",
        data
    })
}
//收藏添加中间表
export function getUserLikeAdd(data){
    return request({
        url:"user/userLikeAdd",
        method:"post",
        data
    })
}
//取消收藏中间表
export function getUserLikeDel(data){
    return request({
        url:"user/userLikeDel",
        method:"post",
        data
    })
}