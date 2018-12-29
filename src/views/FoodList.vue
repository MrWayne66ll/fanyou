<template>
    <div>
      <el-dialog title="发布食物" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules">
          <el-form-item label="食物名称" prop="food_name" :label-width="formLabelWidth">
            <el-input v-model="form.food_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食物类型" :label-width="formLabelWidth">
            <el-select v-model="form.food_type" placeholder="请选择活动区域">
              <el-option label="早餐" value="breakfast"></el-option>
              <el-option label="午餐" value="lunch"></el-option>
              <el-option label="晚餐" value="dinner"></el-option>
              <el-option label="夜宵" value="nightingale"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物日期" :label-width="formLabelWidth">
            <div class="block">
              <!--<span class="demonstration">带快捷选项</span>-->
              <el-date-picker
                v-model="form.food_date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="releaseFood">确 定</el-button>
        </div>
      </el-dialog>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="已发布的食物" name="first">
          <el-row>
            <el-co :span="2" style="margin: 30px;">
              <el-button type="primary" plain @click="dialogFormVisible = true">发布食物</el-button>
            </el-co>
            <el-col :span="6" style="margin: 10px auto;float: right;">
              <span>日期：</span>
              <el-date-picker
                v-model="time_select_value"
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
              <el-card :body-style="{ padding: '0px' }" @click.native="foodDetail(food)">
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
        <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
      </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'outList',
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() < (Date.now() - 3600 * 1000 * 24)
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '后天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周之后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
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
      rules: {
        food_name: [
          { require: true, message: '请输入食物名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不能超过10个字哟~', trigger: 'blur' }
        ]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '查看今天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
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
        }]
      },
      time_select_value: '',
      foodList: [],
      dialogFormVisible: false,
      form: {
        food_name: '',
        food_type: '',
        food_date: '',
        comment: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.initFood()
  },
  computed: {
    food_date_form: function () {
      var dateStr = ''
      if (this.form.food_date !== '') {
        var date = new Date(this.form.food_date)
        var month = date.getMonth() + 1
        dateStr = date.getFullYear() + '-' + month + '-' + date.getDate()
      }
      return dateStr
    }
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
    },
    time_select_value: function (val) {
      var vm = this
      var date1 = new Date(val[0])
      var month1 = date1.getMonth() + 1
      var startStr = date1.getFullYear() + '-' + month1 + '-' + date1.getDate()
      var date2 = new Date(val[1])
      var month2 = date2.getMonth() + 1
      var endStr = date2.getFullYear() + '-' + month2 + '-' + date2.getDate()
      axios.get('http://127.0.0.1/api/v0/food/foodlist', {
        params: {
          'start_time': startStr,
          'end_time': endStr
        },
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(function (response) {
        console.log(response.request.responseURL)
        console.log(response.data)
        vm.foodList = response.data['data']['food_list']
      })
    }
  },
  methods: {
    releaseFood: function () {
      var vm = this
      vm.dialogFormVisible = false
      axios.post('http://127.0.0.1/api/v0/food/create', {
        'food_name': vm.form.food_name,
        'comment': vm.form.comment,
        'food_type': vm.form.food_type,
        'food_date': vm.food_date_form
      }, {
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(function (response) {
        console.log(response)
        vm.initFood()
        vm.form.food_name = ''
        vm.form.food_type = ''
        vm.form.food_date = ''
        vm.form.comment = ''
      }
      )
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    foodDetail (food) {
      var vm = this
      var alertStr = '是否确认抢夺 ' + food.food_name
      this.$confirm(alertStr, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        axios.post('http://127.0.0.1/api/v0/order/create', {
          'food_id': parseInt(food.id)
        }, {
          headers: {
            'Username': 'fengchuanling'
          }
        }).then(function () {
          vm.initFood()
          vm.$message({
            type: 'success',
            message: '成功抢夺' + food.food_name
          })
        }).catch(function () {
          vm.initFood()
          vm.$message({
            type: 'warning',
            message: '抢夺失败，手不够快~'
          })
        })
      })
    },
    initFood () {
      let vm = this
      axios.get('http://127.0.0.1/api/v0/food/foodlist?', {
        params: {},
        headers: {
          'Username': 'fengchuanling'
        }
      }).then(
        function (response) {
          vm.foodList = response.data['data']['food_list']
        }
      )
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
