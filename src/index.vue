<style lang="less" scoped>
  #changeContab {
    .cron-el-input-number {
      width: 100px;
    }

    .cron-select-box {
      margin-bottom: 20px;
      .cron-el-select {
        width: 90px;
        margin-left: 10px;
      }
    }

    .cron-content-box {
      .cron-once {
        margin-left: 28px;
        .cron-el-date-picker {
          margin-left: 10px;
          width: 200px;
        }
      }
      .cron-per-minute {
        margin-left: 43px;
        .cron-text {
          margin-right: 10px;
        }
      }
      .cron-per-hour {
        margin-left: 43px;
        .cron-text {
          margin-right: 10px;
        }
      }
      .cron-per-day {
        margin-left: 43px;
        .cron-text {
          margin-right: 10px;
        }
      }
      .cron-per-week {
        margin-left: 43px;
        .cron-text {
          margin-right: 10px;
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
              width: 100px;
            }
          }
          .cron-week-con {
            .cron-el-select {
              width: 100px;
              margin-left: 6px;
              margin-bottom: 16px;
            }
          }
        }
      }
    }

    .cron-bottom {
      width: 170px;
      padding-top: 8px;
      border-top: 1px solid #5dafff;
      margin: 0 auto;
      margin-top: 20px;
      .cron-result {
        margin-bottom: 10px;
        text-align: center;
      }
    }
  }
</style>

<template>
  <div id="changeContab">
    <div class="cron-select-box">
      定时计划
      <el-select
        class="cron-el-select"
        size="mini"
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
    <div class="cron-content-box">
      <div
        class="cron-once"
        v-if="value==='1'">
        日期
        <el-date-picker
            class="cron-el-date-picker"
            size="mini"
            v-model="datetime"
            type="datetime"
            placeholder="选择日期时间"
            @change="datetimeChange">
          </el-date-picker>
      </div>
      <div
        class="cron-per-minute"
        v-else-if="value==='2'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="minute.incrementIncrement"
          :min="1"
          :max="59">
        </el-input-number>
        分， 从
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="minute.incrementStart"
          :min="0"
          :max="59">
        </el-input-number>
        分开始
      </div>
      <div
        class="cron-per-hour"
        v-else-if="value==='3'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="hour.incrementIncrement"
          :min="0"
          :max="23">
        </el-input-number>
        时，从（时:分）
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="hour.incrementStart"
          :min="0"
          :max="23">
        </el-input-number>
        :
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="minute.incrementStart"
          :min="0"
          :max="59">
        </el-input-number>
        开始
      </div>
      <div
        class="cron-per-day"
        v-else-if="value==='4'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="day.incrementIncrement"
          :min="0"
          :max="31">
        </el-input-number>
        日，从
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="day.incrementStart"
          :min="0"
          :max="31">
        </el-input-number>
        日的（时:分）
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="hour.incrementStart"
          :min="0"
          :max="23">
        </el-input-number>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="minute.incrementStart"
          :min="0"
          :max="59">
        </el-input-number>
        开始。
      </div>
      <div
        class="cron-per-week"
        v-else-if="value==='5'">
        <span class="cron-text">每</span>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="week.incrementIncrement"
          :min="0"
          :max="7">
        </el-input-number>
        周，从本周的
        <el-checkbox-group
          class="cron-el-checkbox-group"
          v-model="week.dayOfWeek.specificSpecific">
          <el-checkbox label="0">周一</el-checkbox>
          <el-checkbox label="1">周二</el-checkbox>
          <el-checkbox label="2">周三</el-checkbox>
          <el-checkbox label="3">周四</el-checkbox>
          <el-checkbox label="4">周五</el-checkbox>
          <br/>
          <el-checkbox label="5">周六</el-checkbox>
          <el-checkbox label="6">周日</el-checkbox>
        </el-checkbox-group>
        <br/>
        （时:分）
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="hour.incrementStart"
          :min="0"
          :max="23">
        </el-input-number>
        <el-input-number
          class="cron-el-input-number"
          size="mini"
          v-model="minute.incrementStart"
          :min="0"
          :max="59">
        </el-input-number>
        开始
      </div>
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
              :key="dayOrWeek"
              class="cron-el-select"
              size="mini"
              multiple
              v-model="day.specificSpecific"
              placeholder="请选择">
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
              size="mini"
              v-model="hour.incrementStart"
              :min="0"
              :max="23">
            </el-input-number>
            :
            <el-input-number
              class="cron-el-input-number"
              size="mini"
              v-model="minute.incrementStart"
              :min="0"
              :max="59">
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
              size="mini"
              placeholder="请选择"
              v-model="week.incrementStart">
              <el-option
                v-for="item in [{label:'第一周',value:1},{label:'第二周',value:2},{label:'第三周',value:3},{label:'第四周',value:4},{label:'第五周',value:5},]"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <br/>
            <el-checkbox-group
              v-model="week.dayOfWeek.specificSpecific">
              <el-checkbox label="0">周一</el-checkbox>
              <el-checkbox label="1">周二</el-checkbox>
              <el-checkbox label="2">周三</el-checkbox>
              <el-checkbox label="3">周四</el-checkbox>
              <el-checkbox label="4">周五</el-checkbox>
              <br/>
              <el-checkbox label="5">周六</el-checkbox>
              <el-checkbox label="6">周日</el-checkbox>
            </el-checkbox-group>
            <br/>
            从（时:分）
            <el-input-number
              class="cron-el-input-number"
              size="mini"
              v-model="hour.incrementStart"
              :min="0"
              :max="23">
            </el-input-number>
            :
            <el-input-number
              class="cron-el-input-number"
              size="mini"
              v-model="minute.incrementStart"
              :min="0"
              :max="59">
            </el-input-number>
            开始
          </div>
        </div>

      </div>
    </div>
    <div class="cron-bottom">
      <div class="cron-result">
        <span class="value">结果：{{this.cron}}</span>
      </div>
      <el-button type="primary" @click="change">Save</el-button>
      <el-button type="primary" @click="close">Close</el-button>
    </div>
  </div>
</template>

<script>
  import minute from './components/minute'

  export default {
    name: 'vueCron',
    components: { minute },
    props: ['data'],
    data() {
      return {
        dayOrWeek: '1',
        minute: {
          incrementStart: '',
          incrementIncrement: '',
        },
        hour: {
          incrementStart: '',
          incrementIncrement: '',
        },
        day: {
          specificSpecific: [],
          incrementStart: '',
          incrementIncrement: '',
        },
        week: {
          // 起始周
          incrementStart: '',
          // 每隔几周
          incrementIncrement: '',
          // 包含那几个周
          specificSpecific: [],
          dayOfWeek: {
            // 起始星期
            incrementStart: '',
            // 包含哪几个星期
            specificSpecific: [],
          },
        },
        month: {
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
        },

        datetime: '',

        /* select box data start */
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
        value: '1',
        /* select box data end */
      }
    },
    watch: {
      data() {
        this.reset(this.$data)
      }
    },
    computed: {
      minutesText() {
        let minutes = ''

        if (this.minute.incrementStart === 0 || this.minute.incrementStart === '0') {
          minutes = '0'
        } else {
          minutes = this.minute.incrementStart
        }

        if (this.minute.incrementIncrement) {
          minutes =  this.minute.incrementStart + '/' + this.minute.incrementIncrement
        }

        return minutes
      },
      hoursText() {
        let hours = ''

        if (this.hour.incrementStart === 0 || this.hour.incrementStart === '0') {
          hours = '0'
        } else {
          hours = this.hour.incrementStart
        }

        if (this.hour.incrementIncrement) {
          hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement
        }

        return hours
      },
      daysText() {
        let days = ''

        if (this.day.incrementStart) {
          days =  this.day.incrementStart
        }

        if (
          this.day.specificSpecific
          && this.day.specificSpecific.length
        ) {
          this.day.specificSpecific.map(val => {
            days += val + ','
          })

          days = days.slice(0, -1)
        }

        if (this.day.incrementIncrement) {
          days =  this.day.incrementStart + '/' + this.day.incrementIncrement
        }

        if (this.week.incrementStart && this.week.incrementStart !== '?' || this.week.incrementIncrement) {
          days = '?'
        }

        return days
      },
      weeksText() {
        let weeks = ''

        if (this.week.specificSpecific) {
          this.week.specificSpecific.map(val => {
            weeks += val + ','
          })

          weeks = weeks.slice(0, -1)
        }

        if (this.week.dayOfWeek.specificSpecific) {
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
      monthsText() {
        let months = ''

        if (
          this.month.specificSpecific
          && this.month.specificSpecific.length
        ) {
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
      cron() {
        return `${'0'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${'*'}`
      }
    },
    methods: {
      /*resultProcess(result) {
        let resultTipText = ''
        let resultTextArr = []
        let resultArr = result.split(' ')

        console.log(resultArr)

        for (let i=0; i<resultArr.length; i++) {
          // 处理秒对应的提示文本
          if (0 === i) {
            resultTextArr[0] = '0秒'
          }
          // 处理分对应的提示文本
          if (1 === i) {
            // 如果分对应的字段为 '*'
            // 如果分对应的字段含有 '/'
            if (resultArr[1].indexOf('*') > -1) {
              resultTextArr[1] = '每分'
            } else if (resultArr[1].indexOf('/') > -1) {
              let temporaryArr = resultArr[1].split('/')

              resultTextArr[1] = '从' + temporaryArr[0] + '分开始，每隔' + temporaryArr[1] + '分钟'
            }
          }
          // 处理时对应的提示文本
          if (2 === i) {
            // 如果时对应的字段为 '*'
            // 如果时对应的字段含有 '/'
          }
          // 处理天对应的提示文本
          if (3 === i) {}
          // 处理月对应的提示文本
          if (4 === i) {}
          // 处理周对应的提示文本
          if (5 === i) {}
          // 处理年对应的提示文本
          if (6 === i) {
            resultTextArr[6] = '年'
          }
        }

        resultTipText = resultTextArr.reverse().join('')

        return resultTipText
      },*/
      dayOrWeekChange() {
        this.dayOrWeek = this.dayOrWeek == '1' ? '1' : '2'

        if (this.dayOrWeek == 1) {
          this.minute.incrementStart = '0'
          this.minute.incrementIncrement = ''
          this.hour.incrementStart = '0'
          this.hour.incrementIncrement = ''
          this.day.incrementStart = ''
          this.day.incrementIncrement = ''
          this.day.specificSpecific = []
          this.week.incrementStart = '?'
          this.week.incrementIncrement = ''
          this.week.specificSpecific = ''
          this.week.dayOfWeek.specificSpecific = ''
          this.month.incrementStart = ''
          this.month.incrementIncrement = ''
          this.month.specificSpecific = []
        } else {
          this.minute.incrementStart = '0'
          this.minute.incrementIncrement = ''
          this.hour.incrementStart = '0'
          this.hour.incrementIncrement = ''
          this.day.incrementStart = '?'
          this.day.incrementIncrement = ''
          this.day.specificSpecific = ''
          this.week.incrementStart = ''
          this.week.incrementIncrement = ''
          this.week.specificSpecific = ''
          this.week.dayOfWeek.specificSpecific = ['0']
          this.month.incrementStart = ''
          this.month.incrementIncrement = ''
          this.month.specificSpecific = []
        }
      },
      change() {
        console.log(this.cron)
        // this.resultProcess(this.cron)
        this.$emit('change', this.cron)
        this.close()
      },
      close() {
        this.$emit('close')
      },
      datetimeChange() {
        if (this.datetime) {
          this.month.incrementStart = this.datetime.getMonth() + 1
          this.day.incrementStart = this.datetime.getDate()
          this.hour.incrementStart = this.datetime.getHours()
          this.minute.incrementStart = this.datetime.getMinutes()
        }

        // this.$emit('change', this.cron)
        // this.close()
      },
      // 当切换条件时，重置数据
      reset() {
        switch (this.value) {
          case '1':
            this.minute.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementStart = ''
            this.hour.incrementIncrement = ''
            this.day.incrementStart = ''
            this.day.incrementIncrement = ''
            this.week.incrementStart = ''
            this.week.incrementIncrement = ''
            this.week.dayOfWeek.specificSpecific = ''
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = ''
            break
          // 切换分
          case '2':
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = '1'
            this.hour.incrementStart = ''
            this.hour.incrementIncrement = ''
            this.day.incrementStart = ''
            this.day.incrementIncrement = ''
            this.week.incrementStart = ''
            this.week.incrementIncrement = ''
            this.week.dayOfWeek.specificSpecific = ''
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = ''
            break
          // 切换时
          case '3':
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = ''
            this.hour.incrementStart = '0'
            this.hour.incrementIncrement = '1'
            this.day.incrementStart = ''
            this.day.incrementIncrement = ''
            this.week.incrementStart = ''
            this.week.incrementIncrement = ''
            this.week.dayOfWeek.specificSpecific = ''
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = ''
            break
          // 切换日
          case '4':
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = ''
            this.hour.incrementStart = '1'
            this.hour.incrementIncrement = ''
            this.day.incrementStart = ''
            this.day.incrementIncrement = ''
            this.day.specificSpecific = []
            this.week.incrementStart = '?'
            this.week.incrementIncrement = ''
            this.week.dayOfWeek.specificSpecific = ''
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = ''
            break
          // 切换周
          case '5':
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = ''
            this.hour.incrementStart = '1'
            this.hour.incrementIncrement = ''
            this.day.incrementStart = '?'
            this.day.incrementIncrement = ''
            this.day.specificSpecific = ''
            this.week.incrementStart = ''
            this.week.incrementIncrement = '1'
            this.week.specificSpecific = ''
            this.week.dayOfWeek.specificSpecific = ['0']
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = ''
            break
          // 切换月
          case '6':
            this.minute.incrementStart = '0'
            this.minute.incrementIncrement = ''
            this.hour.incrementStart = '0'
            this.hour.incrementIncrement = ''
            this.day.incrementStart = ''
            this.day.incrementIncrement = ''
            this.day.specificSpecific = []
            this.week.incrementStart = '?'
            this.week.incrementIncrement = ''
            this.week.specificSpecific = ''
            this.week.dayOfWeek.specificSpecific = ''
            this.month.incrementStart = ''
            this.month.incrementIncrement = ''
            this.month.specificSpecific = []
            break
        }
      }
    },
    mounted() {},
    created() {},
  }

</script>
