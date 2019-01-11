<template>
  <div id="app">
    <el-container>
      <el-header>
        <router-link id="foodList" to="/foodlist">
          <el-button type="primary">食物列表</el-button>
        </router-link>
        <router-link id="orderList" to="/selfpage">
          <el-button type="primary">我的主页</el-button>
        </router-link>
      </el-header>
      <el-main>
        <!--<transition>-->
        <router-view></router-view>
        <!--</transition>-->
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'

}
</script>

<style>

</style>
