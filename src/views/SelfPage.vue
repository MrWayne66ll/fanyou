<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="我的抢夺" name="first">
        <el-row>
          <div class="font_alert"><span>啥都没有，快去抢些吧~</span></div>
        </el-row>
        <el-row gutter="60" style="margin:20px auto">
          <el-col :span="4" v-for="(food,index) of 10" :key="index">
            <el-card :body-style="{ padding: '0px' }" @mouseover.native="changeCard1" v-if="showCard1">
              <img src="../assets/logo.png" class="image">
              <div style="padding: 14px;">
                <span>{{food['food_name']}}</span>
                <span class="food_type">{{food['food_type_cn']}}</span>
                <div class="bottom clearfix">
                  <span class="time">{{food['comment']}}</span>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" @mouseleave.native="changeCard2" v-if="showCard2">
              <el-row>
                <el-col>
                  <el-button type="success" icon="el-icon-check" circle></el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </el-col>
              </el-row>
            </el-card>
            <div>
              <span class="time">{{food['food_date']}}</span>
              <span class="name">{{food['username_cn']}}</span>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <div style="border: none;background-color: #e4e4e4cc;">
            <hr>
          </div>
        </el-row>
        <el-row>
          <div class="font_alert"><span>啥都没有，快去抢些吧~</span></div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的发布" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SelfPage',
  data () {
    return {
      activeName: 'first',
      showCard1: true,
      showCard2: false
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    changeCard1 () {
      this.showCard1 = false
      this.showCard2 = true
    },
    changeCard2 () {
      this.showCard1 = true
      this.showCard2 = false
    }
  }
}
</script>

<style scoped>
.font_alert{
  margin: auto;
  font-size: 20px;
  color: #999;
  text-align: center;
}
.image {
  width: 100%;
  display: block;
}
</style>
