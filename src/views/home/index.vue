<script setup lang="ts">
import leftNav from '@/components/common/leftNav.vue';
import demo from '@/components/demo.vue';
import { ref } from 'vue'
defineProps({
  msg: String,
})
 
const count = ref(0)
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 bg-light sidebar">
        <leftNav></leftNav>
      </div>
      <div class="col-10 main-container">
        <demo></demo>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-fluid{
  height: 100%;
  .row{
    height: 100%;
  }
}
.home-page{
  color: $color-195cc2;
}
.sidebar{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 180px;
  height: 100%;
}
.main-container{
  margin-left: 180px;
}
</style>