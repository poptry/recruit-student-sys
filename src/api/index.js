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
//获取收藏列表
export const getCollectInfo = (data)=>{
    return http.post('/collect/collectList',data)
}
export const removeCollect = (data)=>{
    return http.post('/collect/removeCollect',data)
}
export const addCollect = (data)=>{
    return http.post('/collect/addCollect',data)
}
//搜素接口
export const normalSearch = (data)=>{
    return http.post('/esSearch/normalSearch',data)
}
export const advancedSearch = (data)=>{
    return http.post('/esSearch/plusSearch',data)
}
//recruitInfoDetails
export const recruitInfoDetails = (data)=>{
    return http.post('/recruit/recruitInfoDetails',data)
}


//个人中心管理
//获取表格
export const getRecruitInfo = (data)=>{
    return http.post('/recruit/list',data)
}
//添加招生信息
export const addRecruitInfo = (data)=>{
    return http.post('/recruit/addRecruitInfo',data)
}
//删除招生信息
export const deleteRecruitInfo = (data)=>{
    return http.post('/recruit/remRecruitInfo',data)
}
//修改招生信息
export const updateRecruitInfo = (data)=>{
    return http.post('/recruit/updateRecruitInfo',data)
}
//搜索招生信息->关键词检索
export const findRecruitInfo = (data)=>{
    return http.post('/recruit/findRecruitInfo',data)
}

//用户管理
export const getUserList = (data)=>{
    return http.post('/user/listUser',data)
}
export const updateUser = (data)=>{
    return http.post('/user/updateUser',data)
}
export const deleteUser = (data)=>{
    return http.post('/user/deleteUser',data)
}
//注册
export const sendMsg = (data)=>{
    return http.post('/user/sendMsg',data)
}
export const registerUser = (data)=>{
    return http.post('/user/register',data)
}