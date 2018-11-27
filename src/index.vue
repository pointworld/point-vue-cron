<style lang="less" scoped>
  #pointVueCron {
    /* cover default style of element-ui */
    .cron-el {
      .cron-el-date-picker {
        width: 170px;
      }
      .cron-el-input-number {
        width: 96px;
      }
      .cron-el-select {
        width: 90px;
      }

    }

    .cron-select-box {
      .cron-title {
        margin-right: 10px;
      }
    }

    .cron-content-box {
      margin-top: 18px;
      .cron-once {
        margin-left: 24px;
        .cron-date-picker-text {
          margin-right: 10px;
        }
      }
      .cron-per-minute {
        margin-left: 37px;
        .cron-text {
          margin-right: 9px;
        }
      }
      .cron-per-hour {
        margin-left: 37px;
        .cron-text {
          margin-right: 9px;
        }
      }
      .cron-per-day {
        margin-left: 37px;
        .cron-text {
          margin-right: 9px;
        }
      }
      .cron-per-week {
        margin-left: 37px;
        .cron-text {
          margin-right: 9px;
        }
        .cron-el-checkbox-group {
          margin-top: 15px;
        }
      }
      .cron-per-month {
        margin-left: 43px;
        .cron-month-wrapper {
          display: flex;
          .cron-text {
            margin-right: 14px;
          }
        }
        .cron-date-wrapper {
          display: flex;
          margin-top: 16px;
          .cron-text {
            margin-right: 15px;
          }
        }
        .cron-day-or-week-con {
          margin-top: 16px;
          .cron-day-con {
            .cron-el-select {
              width: 124px;
            }
          }
          .cron-week-con {
            .cron-el-select {
              margin-left: 6px;
              margin-bottom: 16px;
            }
          }
        }
      }
    }

    .cron-bottom {
      width: 180px;
      padding-top: 13px;
      border-top: 1px solid #5dafff;
      margin: 0 auto;
      margin-top: 28px;
      .cron-result {
        margin-bottom: 20px;
        text-align: center;
      }
      .cron-button-group {
        display: block;
        width: 111px;
        margin: 0 auto;
      }
    }
  }
</style>

<template>
  <div id="pointVueCron">
    <!-- cron select box -->
    <div class="cron-el cron-select-box">
      <span class="cron-title">定时计划</span>
      <el-select
        class="cron-el-select"
        size="small"
        @change="reset"
        v-model="value"
        placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- /cron select box -->
    <!-- cron content box -->
    <div class="cron-el cron-content-box">
      <!-- content: cron select item - once -->
      <div
        class="cron-once"
        v-if="value==='1'">
        <span class="cron-date-picker-text">日期</span>
        <el-date-picker
          class="cron-el-date-picker"
          size="small"
          type="datetime"
          placeholder="选择日期时间"
          v-model="datetime"
          @change="datetimeChange">
        </el-date-picker>
      </div>
      <!-- content: cron select item - per-minute -->
      <div
        class="cron-per-minute"
        v-else-if="value==='2'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="1"
          :max="59"
          v-model="minute.incrementIncrement">
        </el-input-number>
        分，从
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="59"
          v-model="minute.incrementStart">
        </el-input-number>
        分开始
      </div>
      <!-- content: cron select item - per-hour -->
      <div
        class="cron-per-hour"
        v-else-if="value==='3'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="23"
          v-model="hour.incrementIncrement">
        </el-input-number>
        时，从（时:分）
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="23"
          v-model="hour.incrementStart">
        </el-input-number>
        :
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="59"
          v-model="minute.incrementStart">
        </el-input-number>
        开始
      </div>
      <!-- content: cron select item - per-day -->
      <div
        class="cron-per-day"
        v-else-if="value==='4'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="1"
          :max="31"
          v-model="day.incrementIncrement">
        </el-input-number>
        日，从
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="1"
          :max="31"
          v-model="day.incrementStart">
        </el-input-number>
        日的（时:分）
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="23"
          v-model="hour.incrementStart">
        </el-input-number>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="59"
          v-model="minute.incrementStart">
        </el-input-number>
        开始。
      </div>
      <!-- content: cron select item - per-week -->
      <div
        class="cron-per-week"
        v-else-if="value==='5'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="1"
          :max="5"
          v-model="week.incrementIncrement">
        </el-input-number>
        周，从本周的
        <el-checkbox-group
          class="cron-el-checkbox-group"
          v-model="week.dayOfWeek.specificSpecific">
          <el-checkbox label="2">周一</el-checkbox>
          <el-checkbox label="3">周二</el-checkbox>
          <el-checkbox label="4">周三</el-checkbox>
          <el-checkbox label="5">周四</el-checkbox>
          <el-checkbox label="6">周五</el-checkbox>
          <br/>
          <el-checkbox label="7">周六</el-checkbox>
          <el-checkbox label="1">周日</el-checkbox>
        </el-checkbox-group>
        <br/>
        （时:分）
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="23"
          v-model="hour.incrementStart">
        </el-input-number>
        <el-input-number
          class="cron-el-input-number"
          size="small"
          :min="0"
          :max="59"
          v-model="minute.incrementStart">
        </el-input-number>
        开始
      </div>
      <!-- content: cron select item - per-month -->
      <div
        class="cron-per-month"
        v-else="value==='6'">
        <div class="cron-month-wrapper">
          <span class="cron-text">月</span>
          <el-checkbox-group
            class="cron-el-checkbox-group"
            v-model="month.specificSpecific">
            <el-checkbox label="1">01月</el-checkbox>
            <el-checkbox label="2">02月</el-checkbox>
            <el-checkbox label="3">03月</el-checkbox>
            <el-checkbox label="4">04月</el-checkbox>
            <br/>
            <el-checkbox label="5">05月</el-checkbox>
            <el-checkbox label="6">06月</el-checkbox>
            <el-checkbox label="7">07月</el-checkbox>
            <el-checkbox label="8">08月</el-checkbox>
            <br/>
            <el-checkbox label="9">09月</el-checkbox>
            <el-checkbox label="10">10月</el-checkbox>
            <el-checkbox label="11">11月</el-checkbox>
            <el-checkbox label="12">12月</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="cron-date-wrapper">
          <span class="cron-text">日期</span>
          <div class="day-or-week-ctl">
            <el-radio-group
              v-model="dayOrWeek"
              @change="dayOrWeekChange">
              <el-radio label="1">日</el-radio>
              <el-radio label="2">星期中的第几日</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="cron-day-or-week-con">
          <div
            class="cron-day-con"
            v-if="dayOrWeek==='1'">
            月中第
            <el-select
              class="cron-el-select"
              size="small"
              multiple
              placeholder="请选择"
              :key="dayOrWeek"
              v-model="day.specificSpecific">
              <el-option
                v-for="val in 31"
                :key="$index"
                :label="val"
                :value="val">{{val}}
              </el-option>
            </el-select>
            日（可多选），从（时：分）
            <el-input-number
              class="cron-el-input-number"
              size="small"
              :min="0"
              :max="23"
              v-model="hour.incrementStart">
            </el-input-number>
            :
            <el-input-number
              class="cron-el-input-number"
              size="small"
              :min="0"
              :max="59"
              v-model="minute.incrementStart">
            </el-input-number>
            开始
          </div>
          <div
            class="cron-week-con"
            v-else>
            月中第几周
            <el-select
              :key="dayOrWeek"
              class="cron-el-select"
              size="small"
              placeholder="请选择"
              v-model="week.incrementStart">
              <el-option
                v-for="item in weekOrder"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <br/>
            <el-checkbox-group
              @change="test"
              v-model="week.dayOfWeek.specificSpecific">
              <el-checkbox label="2">周一</el-checkbox>
              <el-checkbox label="3">周二</el-checkbox>
              <el-checkbox label="4">周三</el-checkbox>
              <el-checkbox label="5">周四</el-checkbox>
              <el-checkbox label="6">周五</el-checkbox>
              <br/>
              <el-checkbox label="7">周六</el-checkbox>
              <el-checkbox label="1">周日</el-checkbox>
            </el-checkbox-group>
            <br/>
            从（时:分）
            <el-input-number
              class="cron-el-input-number"
              size="small"
              :min="0"
              :max="23"
              v-model="hour.incrementStart">
            </el-input-number>
            :
            <el-input-number
              class="cron-el-input-number"
              size="small"
              :min="0"
              :max="59"
              v-model="minute.incrementStart">
            </el-input-number>
            开始
          </div>
        </div>
      </div>
    </div>
    <!-- /cron content box -->
    <!-- cron bottom -->
    <div class="cron-el cron-bottom">
      <div class="cron-result">
        <span class="value">{{this.cronTipText}}</span>
      </div>
      <div class="cron-button-group">
        <el-button
          size="small"
          type="primary"
          @click="change">保存
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="close">关闭
        </el-button>
      </div>
    </div>
    <!-- /cron bottom -->
  </div>
</template>

<script>

  // TODO: 拆分组件: second, minute, hour, day, month, week, year
  // import second from './components/second'
  // import minute from './components/minute'
  // import hour   from './components/hour'
  // import day    from './components/day'
  // import month  from './components/month'
  // import week   from './components/week'
  // import year   from './components/year'

  export default {
    name: 'vueCron',
    // TODO: split component
    // components: { second, minute, hour, day, month, week, year, },
    props: ['data'],
    data() {
      return {
        // 定时计划 - 每月 - 月中第几周的下拉框数据
        weekOrder: [
          {label: '第一周', value: '1'},
          {label: '第二周', value: '2'},
          {label: '第三周', value: '3'},
          {label: '第四周', value: '4'},
          {label: '第五周', value: '5'},
        ],

        // TODO: future fields: may expose ancestor components
        /*cronObj: {
          cronTipText: '',
          cronExpression: '',
        },*/
        // cronTipText: '123',

        // 定时计划 - 每月 - 日期 - 控制当单选按钮组发生切换时，对应的内容变化
        // '1' 对应一个月中的第几日；'2' 对应一个星期中的第几日
        dayOrWeek: '1',

        /** 定时计划选项对应切换内容: start */
        // 字段：
        // incrementStart      - 从什么时候开始
        // incrementIncrement  - 每多久
        // specificSpecific    - 指定哪几天（时/天/周/月）

        // 定时计划 - 一次性
        datetime: '',
        // 定时计划 - 每分
        minute: {
          incrementStart: '',
          incrementIncrement: '',
        },
        // 定时计划 - 每时
        hour: {
          incrementStart: '',
          incrementIncrement: '',
        },
        // 定时计划 - 每天
        day: {
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
        },
        // 定时计划 - 每周/月
        week: {
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
          dayOfWeek: {
            incrementStart: '',
            specificSpecific: [],
          },
        },
        // 定时计划 - 每月
        month: {
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
        },
        /** 定时计划选项对应切换内容: end */

        /** 定时计划选项: start */
        // 定时计划 - 下拉选项数据
        options: [
          {
            value: '1',
            label: '一次性'
          },
          {
            value: '2',
            label: '每分'
          },
          {
            value: '3',
            label: '每时'
          },
          {
            value: '4',
            label: '每日'
          },
          {
            value: '5',
            label: '每周'
          },
          {
            value: '6',
            label: '每月'
          }
        ],
        // 定时计划 - 下拉选项数据默认选中项
        value: '1',
        /** 定时计划选项: end */
      }
    },
    watch: {
      data() {
        // this.reset()
      }
    },
    computed: {
      // 生成 cron 表达式中的 ‘分’
      minutesText() {
        let minutes = ''

        if (
          this.minute.incrementStart === 0
          || this.minute.incrementStart === '0'
        ) {
          minutes = '0'
        } else {
          minutes = this.minute.incrementStart
        }

        if (this.minute.incrementIncrement) {
          minutes = this.minute.incrementStart + '/' + this.minute.incrementIncrement
        }

        return minutes
      },
      // 生成 cron 表达式中的 ‘时’
      hoursText() {
        let hours = ''

        if (
          this.hour.incrementStart === 0
          || this.hour.incrementStart === '0'
        ) {
          hours = '0'
        } else {
          hours = this.hour.incrementStart
        }

        if (this.hour.incrementIncrement) {
          hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement
        }

        return hours
      },
      // 生成 cron 表达式中的 ‘天’
      daysText() {
        let days = ''

        if (this.day.incrementStart) {
          days = this.day.incrementStart
        }

        if (
          this.day.specificSpecific
          && this.day.specificSpecific.length
        ) {
          this.day.specificSpecific = this.day.specificSpecific.sort(this.compare)

          this.day.specificSpecific.map(val => {
            days += val + ','
          })

          days = days.slice(0, -1)
        }

        if (this.day.incrementIncrement) {
          days = this.day.incrementStart + '/' + this.day.incrementIncrement
        }

        if (
          this.week.incrementStart
          && this.week.incrementStart !== '?'
          || this.week.incrementIncrement
        ) {
          days = '?'
        }

        return days
      },
      // 生成 cron 表达式中的 ‘周’
      weeksText() {
        let weeks = ''

        if (this.week.specificSpecific) {
          this.week.specificSpecific = this.week.specificSpecific.sort(this.compare)

          this.week.specificSpecific.map(val => {
            weeks += val + ','
          })

          weeks = weeks.slice(0, -1)
        }

        if (this.week.dayOfWeek.specificSpecific) {
          this.week.dayOfWeek.specificSpecific = this.week.dayOfWeek.specificSpecific.sort(this.compare)

          this.week.dayOfWeek.specificSpecific.map(val => {
            weeks += val + ','
          })

          weeks = weeks.slice(0, -1)
        }

        if (this.week.incrementStart === '?') {
          weeks = this.week.incrementStart
        } else if (
          this.week.incrementStart
          && this.week.dayOfWeek.specificSpecific
          && this.week.dayOfWeek.specificSpecific.length
        ) {
          weeks = weeks + '#' + this.week.incrementStart
        }

        if (this.week.incrementIncrement) {
          weeks = weeks + '/' + this.week.incrementIncrement
        }

        return weeks
      },
      // 生成 cron 表达式中的 ‘月’
      monthsText() {
        let months = ''

        if (
          this.month.specificSpecific
          && this.month.specificSpecific.length
        ) {
          this.month.specificSpecific = this.month.specificSpecific.sort(this.compare)

          this.month.specificSpecific.map(val => {
            months += val + ','
          })

          months = months.slice(0, -1)
        }

        if (this.month.incrementStart) {
          months = this.month.incrementStart
        }

        return months
      },
      // 生成 cron 表达式
      cron() {
        return `${'0'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${'*'}`
      },
      // 生成 cron 表达式对应的文本描述
      cronTipText() {
        if (
          this.cron === '0 * * * * ? *'
          || this.cron === '* * * * * ? *'
        ) {
          return ''
        } else {
          this.realTimeChange()
        }

        return this.resultProcess(this.cron)
      },
    },
    methods: {
      // compare stringNumber or number
      compare(x, y) {
        if (Number(x) < Number(y)) {
          return -1
        } else if (Number(x) > Number(y)) {
          return 1
        } else {
          return 0
        }

        // 可以将以上代码简化为
        // return x - y
      },
      // 转换 cron 表达式为对应的文本描述
      resultProcess(result) {
        // 存储最终 cron 表达式对应的文字描述
        let resultTipText = ''
        // 临时存储转换结果
        let resultTextArr = []
        // 获取由 cron 表达式每一项组成的数组
        let resultArr = result.split(' ')

        for (let i = 0; i < resultArr.length; i++) {
          // 秒
          if (0 === i) {
            resultTextArr[0] = '0秒'
          }
          // 分
          if (1 === i) {
            // 如果 resultArr[1] 值为 '*'
            // 如果 resultArr[1] 包含 '/'
            // 如果 resultArr[1] 值既不是 '*', 也不是 includes '/'
            if (resultArr[1].indexOf('*') > -1) {
              resultTextArr[1] = '每分钟'
            } else if (resultArr[1].indexOf('/') > -1) {
              let temporaryArr = resultArr[1].split('/')

              resultTextArr[1] = '每' + temporaryArr[1] + '分钟，' + '从' + temporaryArr[0] + '分'
            } else {
              resultTextArr[1] = resultArr[1] + '分'
            }
          }
          // 时
          if (2 === i) {
            // 如果 resultArr[2] 值为 '*'
            // 如果 resultArr[2] 包含 '/'
            // 如果 resultArr[2] 值既不是 '*', 也不是 includes '/'
            if (resultArr[2].indexOf('*') > -1) {
              resultTextArr[2] = ''
            } else if (resultArr[2].indexOf('/') > -1) {
              let temporaryArr = resultArr[2].split('/')

              resultTextArr[2] = '每' + temporaryArr[1] + '小时，' + '从' + temporaryArr[0] + '点'
            } else {
              resultTextArr[2] = resultArr[2] + '点'
            }
          }
          // 天
          if (3 === i) {
            // 如果 resultArr[3] 值为 '?'
            // 如果 resultArr[3] 值为 '*'
            // 如果 resultArr[3] 包含 '/'
            // 如果 resultArr[3] 既不是 '*', 也不包含 '/'
            if (resultArr[3].indexOf('?') > -1) {
              resultTextArr[3] = ''
            } else if (resultArr[3].indexOf('*') > -1) {
              resultTextArr[3] = ''
            } else if (resultArr[3].indexOf('/') > -1) {
              let temporaryArr = resultArr[3].split('/')

              resultTextArr[3] = '每' + temporaryArr[1] + '天，' + '从' + temporaryArr[0] + '号的'
            } else {
              if (resultArr[3].indexOf(',') > -1) {
                resultTextArr[3] = resultArr[3] + '日的'
              } else {
                resultTextArr[3] = resultArr[3] + '日'
              }
            }
          }
          // 月
          if (4 === i) {
            // 如果 resultArr[4] 值为 '*'
            // 如果 resultArr[4] 包含 '/'
            // 如果 resultArr[4] 既不是 '*', 也不包含 '/'
            if (resultArr[4].indexOf('*') > -1) {
              resultTextArr[4] = ''
            } else if (resultArr[4].indexOf('/') > -1) {
              let temporaryArr = resultArr[4].split('/')

              resultTextArr[4] = '每' + temporaryArr[1] + '个月执行，' + '从' + temporaryArr[0] + '月'
            } else {
              if (resultArr[4].indexOf(',') > -1) {
                resultTextArr[4] = resultArr[4] + '月的'
              } else {
                resultTextArr[4] = resultArr[4] + '月'
              }

            }
          }
          // 周
          if (5 === i) {
            // 如果 resultArr[5] 值为 '?'
            // 如果 resultArr[5] 包含 '/'
            if (resultArr[5].indexOf('?') > -1) {
              resultTextArr[5] = ''
            } else if (resultArr[5].indexOf('/') > -1) {
              let temporaryArr = resultArr[5].split('/')

              // convert week num
              let convertedWeekNum = temporaryArr[0]
                .toString()
                .replace(/1/, '周日')
                .replace(/2/, '周一')
                .replace(/3/, '周二')
                .replace(/4/, '周三')
                .replace(/5/, '周四')
                .replace(/6/, '周五')
                .replace(/7/, '周六')

              resultTextArr[5] = '每' + temporaryArr[1] + '周，' + '从' + convertedWeekNum + '的'
            } else if (resultArr[5].indexOf('#') > -1) {
              let temporaryArr = resultArr[5].split('#')

              let convertedWeekNum = temporaryArr[0]
                .toString()
                .replace(/1/, '周日')
                .replace(/2/, '周一')
                .replace(/3/, '周二')
                .replace(/4/, '周三')
                .replace(/5/, '周四')
                .replace(/6/, '周五')
                .replace(/7/, '周六')


              resultTextArr[5] = '第' + temporaryArr[1] + '周的' + convertedWeekNum + '的'
            } else if (
              resultArr[5] === 0
              || resultArr[5] === '0'
            ) {
              resultTextArr[5] = ''
            } else if(resultArr[5] && resultArr[5].indexOf('#') === -1) {
              resultTextArr[5] = ''
            }
          }
          // 年
          if (6 === i) {
            resultTextArr[6] = ''
          }
        }

        // 组装得到 cron 表达式对应的文字描述
        if (resultArr[5].indexOf('?') > -1) {
          resultTipText = resultTextArr.reverse().join('')
        } else if (resultArr[3].indexOf('?') > -1) {
          resultTipText = resultTextArr[4]
            + resultTextArr[5]
            + resultTextArr[3]
            + resultTextArr[2]
            + resultTextArr[1]
            + resultTextArr[0]
        }

        // 返回最终 cron 表达式对应的文字描述
        return resultTipText
      },
      // 当 定时计划 - 每月 - 日期 - 单选框组发生切换时的处理
      dayOrWeekChange() {
        this.dayOrWeek = this.dayOrWeek == '1' ? '1' : '2'

        // 星期中第几日的处理
        if (this.dayOrWeek == 1) {
          this.resetCronData()
          this.minute.incrementStart = '0'
          this.hour.incrementStart = '0'
          this.day.specificSpecific = ['1']
          this.week.incrementStart = '?'
          this.month.specificSpecific = []
        }
        // 月中第几日的处理
        else {
          this.resetCronData()
          this.minute.incrementStart = '0'
          this.hour.incrementStart = '0'
          this.day.incrementStart = '?'
          this.week.dayOfWeek.specificSpecific = ['2']
          this.month.specificSpecific = []
        }
      },
      // 当 cron 表达式的值发生变化时触发，将 cron 表达式的值传给父组件
      realTimeChange() {
        this.$emit('change', this.cron)
      },
      // 点击保存按钮时触发（除了关闭弹窗，没有其他作用）
      change() {
        // this.$emit('change', this.cron)
        this.close()
      },
      // TODO: need to optimize
      // 定时计划 - 每月 - 日期 - 星期中的第几日，在没有选中月中的‘第几周’时，如果直接设置星期中的第几日，会弹出错误提示
      test() {
        if (this.week.incrementStart == '') {
          this.$message.error('请先选择是第几周！')
        }
      },
      // 点击取消按钮时触发，关闭弹窗
      close() {
        this.$emit('close')
      },
      // 当 定时计划 - 一次性 的值被设置时的处理
      datetimeChange() {
        if (this.datetime) {
          this.month.incrementStart = this.datetime.getMonth() + 1
          this.day.incrementStart = this.datetime.getDate()
          this.hour.incrementStart = this.datetime.getHours()
          this.minute.incrementStart = this.datetime.getMinutes()
        }
      },
      // 当 定时计划下拉框选项发生变化时，重置相关表单内容
      reset() {
        switch (this.value) {
          // 一次性
          case '1':
            this.resetCronData()
            break
          // 每分
          case '2':
            this.resetCronData()
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = '1'
            break
          // 每时
          case '3':
            this.resetCronData()
            this.minute.incrementStart = '0'
            this.hour.incrementStart = '0'
            this.hour.incrementIncrement = '1'
            break
          // 每日
          case '4':
            this.resetCronData()
            this.minute.incrementStart = '0'
            this.hour.incrementStart = '0'
            this.day.incrementStart = '1'
            this.day.incrementIncrement = '1'
            this.day.specificSpecific = []
            this.week.incrementStart = '?'
            break
          // 每周
          case '5':
            this.resetCronData()
            this.minute.incrementStart = '0'
            this.hour.incrementStart = '0'
            this.day.incrementStart = '?'
            this.week.incrementIncrement = '1'
            this.week.dayOfWeek.specificSpecific = ['2']
            break
          // 每月
          case '6':
            this.resetCronData()
            this.dayOrWeek = 1
            this.minute.incrementStart = '0'
            this.hour.incrementStart = '0'
            this.day.specificSpecific = []
            this.week.incrementStart = '?'
            this.month.specificSpecific = []
            break
        }
      },
      // 重置 cron 表达式的相关数据
      resetCronData() {
        this.minute.incrementStart = ''
        this.minute.incrementIncrement = ''
        this.hour.incrementStart = ''
        this.hour.incrementIncrement = ''
        this.day.incrementStart = ''
        this.day.incrementIncrement = ''
        this.day.specificSpecific = ''
        this.week.incrementStart = ''
        this.week.incrementIncrement = ''
        this.week.specificSpecific = ''
        this.week.dayOfWeek.specificSpecific = ''
        this.month.incrementStart = ''
        this.month.incrementIncrement = ''
        this.month.specificSpecific = ''
      },
    },
    mounted() {},
    created() {},
  }

</script>
