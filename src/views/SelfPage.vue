<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="我的抢夺" name="first">
        <el-row>
          <div class="font_alert" v-if="orderListIsExist"><span>啥都没有，快去抢些吧~</span></div>
        </el-row>
        <el-row gutter="60" style="margin:20px auto">
          <el-col :span="4" v-for="(order,index) of orderList" :key="index">
            <!--<el-card :body-style="{ padding: '0px' }" @mouseover.native="changeCard1" v-if="showCard1">-->
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/logo.png" class="image">
              <div style="padding: 14px;">
                <span>{{order['food_name']}}</span>
                <span class="food_type">{{order['food_type_cn']}}</span>
                <div class="bottom clearfix">
                  <span class="time">{{order['floor']}}楼|{{order['shelf']}}</span>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
                <div>
                  <hr>
                </div>
                <div>
                  <el-button type="success" icon="el-icon-check" circle @click="getThisOrder(order)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle @click="denyThisOrder(order)"></el-button>
                </div>
              </div>
            </el-card>
            <!--<el-card :body-style="{ padding: '0px' }" @mouseleave.native="changeCard2" v-if="showCard2">-->
            <el-card :body-style="{ padding: '0px' }">
              <el-row>
                <el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                </el-col>
              </el-row>
            </el-card>
            <div>
              <span class="time">{{order['food_date']}}</span>
              <span class="name">{{order['username_cn']}}</span>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <div style="border: none;background-color: #e4e4e4cc;">
            <hr>
          </div>
        </el-row>
        <el-row>
          <div class="font_alert" v-if="orderTableIsExist"><span>啥都没有，快去抢些吧~</span></div>
        </el-row>
        <el-row>
          <template>
            <el-table
              :data="tableData"
              style="width: 96%; margin: auto"
              stripe="true">
              <el-table-column
                prop="food_name"
                label="食物名称"
                >
              </el-table-column>
              <el-table-column
                prop="food_type_cn"
                label="类型"
                >
              </el-table-column>
              <el-table-column
                prop="food_date"
                label="时间"
                >
              </el-table-column>
              <el-table-column
                prop="order_status_cn"
                label="订单状态"
                >
              </el-table-column>
            </el-table>
          </template>
        </el-row>
        <el-row>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="tableTotal">
            </el-pagination>
          </div>
          <!--<div class="block">-->
            <!--<el-pagination-->
              <!--layout="prev, pager, next"-->
              <!--:total="1000">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的发布" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SelfPage',
  data () {
    return {
      activeName: 'first',
      orderList: [],
      orderListIsExist: true,
      orderTableIsExist: true,
      tableData: [],
      tableTotal: 0
    }
  },
  mounted () {
    this.initOrderList()
    this.initOrderTable()
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    initOrderList () {
      let vm = this
      axios.get('http://127.0.0.1/api/v0/order/orderlist?wait_or_not=1', {
        params: {},
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(
        function (response) {
          vm.orderList = response.data['data']['order_list']
          if (vm.orderList) {
            vm.orderListIsExist = false
          } else {
            vm.orderListIsExist = true
          }
        }
      )
    },
    initOrderTable () {
      let vm = this
      axios.get('http://127.0.0.1/api/v0/order/orderlist?wait_or_not=2', {
        params: {},
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(
        function (response) {
          vm.tableData = response.data['data']['order_list']
          if (vm.tableData) {
            vm.orderTableIsExist = false
            vm.tableTotal = response.data['data']['total']
          } else {
            vm.orderTableIsExist = true
          }
        }
      )
    },
    getThisOrder (order) {
      console.log(order['order_id'])
      var vm = this
      var alertStr = '是否已获取 ' + order['food_name']
      this.$confirm(alertStr, '确认', {
        confirmButtonText: '已获取',
        cancelButtonText: '未获取',
        type: 'warning'
      }).then(function () {
        axios.post('http://127.0.0.1/api/v0/order/getdeny', {
          'order_id': parseInt(order['order_id']),
          'change_status': 'get'
        }, {
          headers: {
            'Username': 'fengchuanling'
          }
        }).then(function () {
          vm.initOrderList()
          vm.$message({
            type: 'success',
            message: '已确认获取' + order['food_name']
          })
        }).catch(function () {
          vm.initOrderList()
          vm.$message({
            type: 'warning',
            message: '确认失败请重试'
          })
        })
      })
    },
    denyThisOrder (order) {
      console.log(order['order_id'])
      var vm = this
      var alertStr = '是否丢弃食物 ' + order['food_name']
      this.$confirm(alertStr, '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        axios.post('http://127.0.0.1/api/v0/order/getdeny', {
          'order_id': parseInt(order['order_id']),
          'change_status': 'deny'
        }, {
          headers: {
            'Username': 'fengchuanling'
          }
        }).then(function () {
          vm.initOrderList()
          vm.$message({
            type: 'success',
            message: '成功丢弃' + order['food_name']
          })
        }).catch(function () {
          vm.initOrderList()
          vm.$message({
            type: 'warning',
            message: '丢弃失败'
          })
        })
      })
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
.time {
  font-size: 13px;
  color: #999;
  margin-bottom: 20px;
}
.food_type{
  float: right;
  font-size: 12px;
  color: #999;
}
.name{
  float: right;
  font-size: 12px;
  color: #999;
}
</style>
