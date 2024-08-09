<template>
  <div class="container">
    <h3 class="grid-head">网格demo</h3>
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <card></card>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <card></card>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <card></card>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <card></card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import card from '@/components/common/card.vue'

</script>
<style lang="scss">
  .container{
    width: 100%;
    background-color: #525252;
    .grid-head{
      color: #ffffff;
      font-weight: 600;
      font-size: 24px;
    }
    .card{
      width: 100%;
      margin: 0 auto;
      margin-bottom: 30px;
      max-width: 350px;
      padding: 30px;
      background-color: #242424;
    }
  }
</style>