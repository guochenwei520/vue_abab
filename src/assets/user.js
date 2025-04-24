import request from "@/assets/index.js";

// 登录
export function getLogin(data){
    return request({
        url:"/user/login",
        method:"post",
        params:data
    })
}
export function getUserLike(data){
    return request({
        url:"user/userLike",
        method:"post",
        params:data
    })
}
//收藏添加中间表
export function getUserLikeAdd(data){
    return request({
        url:"user/userLikeAdd",
        method:"post",
        params:data
    })
}
//取消收藏中间表
export function getUserLikeDel(data){
    return request({
        url:"user/userLikeDel",
        method:"post",
        params:data
    })
}
//注册
export function getUserAdd(data){
    return request({
        url:"user/addUser",
        method:"post",
        params:data
    })
}
//用户列表
export  function getUserAll(data){
    return request({
        url:"user/userAll",
        method:"post",
        params:data
    })
}
//去重
export function getUserDis(username){
    return request({
        url:"user/userDis",
        method:"post",
        params:{"username":username}
    })
}
