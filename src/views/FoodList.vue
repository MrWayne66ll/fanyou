<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="用户管理" name="first">
          <el-row>
            <el-col :span="6" style="margin: 10px auto;float: right;">
              <span>日期：</span>
              <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-col>
            <el-col :span="4" style="margin: 10px auto;margin-left: 25px;float: right">
              <span>类型：</span>
              <el-select v-model="food_type" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row gutter="60" style="margin:20px auto">
            <el-col :span="4" v-for="(food,index) of foodList" :key="index">
              <el-card :body-style="{ padding: '0px' }">
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
              <div>
                <span class="time">{{food['food_date']}}</span>
                <span class="name">{{food['username_cn']}}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'outList',
  data () {
    return {
      activeName: 'first',
      currentDate: new Date(),
      options: [{
        value: 'breakfast',
        label: '早餐'
      }, {
        value: 'lunch',
        label: '午餐'
      }, {
        value: 'dinner',
        label: '晚餐'
      }, {
        value: 'nightingale',
        label: '夜宵'
      }],
      food_type: [],
      value11: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value6: '',
      value7: '',
      foodList: []
    }
  },
  mounted () {
    this.initFood()
  },
  watch: {
    food_type: function (val) {
      let vm = this
      axios.get('http://127.0.0.1/api/v0/food/foodlist', {
        params: {
          'food_type': val
        },
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(function (response) {
        vm.foodList = response.data['data']['food_list']
      }
      )
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    initFood () {
      let vm = this
      axios.get('http://127.0.0.1/api/v0/food/foodlist', {
        params: {},
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(
        function (response) {
          console.log(response.data)
          // console.log(response.data['data']['food_list'])
          vm.foodList = response.data['data']['food_list']
          // if (response.data['error_code'] === '0') {
          //   console.log(response.data['data'])
          // }
        }
      )
      console.log(vm.foodList)
    }
  }
}
</script>

<style scoped>
  .name{
    float: right;
    font-size: 12px;
    color: #999;
  }
  .food_type{
    float: right;
    font-size: 12px;
    color: #999;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .time {
    font-size: 13px;
    color: #999;
    margin-bottom: 20px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-row {
    margin-bottom: 20px
    &:last-child {
     margin-bottom: 0;
   }
  }
</style>
