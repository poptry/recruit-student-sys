
export default {
    namespaced:true,
    state:{
        loading:false
    },
    getters:{

    },
    actions:{

    },
    mutations:{
        isLoading(state,status){
            state.loading = status
        }
    }
}