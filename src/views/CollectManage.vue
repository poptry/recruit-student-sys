<template>
  <div class="container">
    <div>
        <CommonItem></CommonItem>
    </div>
  </div>
</template>

<script>
import CommonItem from '@/components/CommonItem.vue'
export default {    
    data(){
        return{
            collectList:null
        }
    },
    components:{
        CommonItem
    },
    methods:{

    },
    created(){
    }
}
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
    }
</style>