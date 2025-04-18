import request from "@/assets/index.js";

// 登录
export function getLogin(data){
    return request({
        url:"/user/login",
        method:"get",
        data
    })
}
export function getUserLike(data){
    return request({
        url:"user/userLike",
        method:"get",
        data
    })
}
//收藏添加中间表
export function getUserLikeAdd(data){
    return request({
        url:"user/userLikeAdd",
        method:"get",
        data
    })
}
//取消收藏中间表
export function getUserLikeDel(data){
    return request({
        url:"user/userLikeDel",
        method:"get",
        data
    })
}
