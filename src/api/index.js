import http from '@/util/request'
//---------用户相关接口
export const userLogin = (data)=>{
    return http.post('/user/login',data)
}
export const userRegister = (data)=>{
    return http.post('/user/register',data)
}
export const check = (data)=>{
    return http.post('/user/check',data)
}
//获取推荐信息
export const getRecommandInfo = (data)=>{
    return http.post('/recruit/recommend/infoList',data)
}