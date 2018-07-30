<style>

</style>

<template>
  <div class="minute">
    <div>
      从
      <el-input-number
        size="small"
        v-model="minute.incrementStart"
        :min="0"
        :max="59">
      </el-input-number>
      分开始，每隔
      <el-input-number
        size="small"
        v-model="minute.incrementIncrement"
        :min="0"
        :max="59">
      </el-input-number>
      分执行一次。
    </div>

    <div class="bottom">
      <span class="value">{{this.cron}}</span>
      <el-button type="primary" @click="change">Save</el-button>
      <el-button type="primary" @click="close">Close</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    props: [
      'data',
      {
        value: {
          type: String,
          default: '*'
        }
      }
    ],
    data() {
      return {
        minute: {
          incrementStart: '',
          incrementIncrement: '',
        },
        hour: {
          incrementStart: '',
          incrementIncrement: '',
        },
        day: {
          incrementStart: '',
          incrementIncrement: '',
        },
        week: {
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
        },
        month: {
          cronEvery: '1',
          incrementStart: '',
          incrementIncrement: '',
          specificSpecific: [],
        },

        cronObj: {
          year: '',
          month: '',
          week: '',
          day: '',
          hour: '',
          minute: '',
          second: '',
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

        if (this.minute.incrementStart) {
          minutes = this.minute.incrementStart
        }

        if (this.minute.incrementStart === '0') {
          minutes = '0'
        }

        if (this.minute.incrementIncrement) {
          minutes =  this.minute.incrementStart + '/' + this.minute.incrementIncrement
        }

        return minutes
      },
      hoursText() {
        let hours = ''

        if (this.hour.incrementStart) {
          hours =  this.hour.incrementStart
        }

        if (this.hour.incrementIncrement) {
          hours =  this.hour.incrementStart + '/' + this.hour.incrementIncrement
        }

        return hours
      },
      daysText() {
        let days = ''

        if (this.day.incrementStart) {
          days =  this.day.incrementStart
        }

        if (this.day.incrementIncrement) {
          days =  this.day.incrementStart + '/' + this.day.incrementIncrement
        }

        if (this.week.incrementStart || this.week.incrementIncrement) {
          days = '?'
        }

        return days
      },
      weeksText() {
        let weeks = ''

        if (this.week.incrementStart) {
          weeks = this.week.incrementStart
        }

        if (this.week.incrementStart && this.week.incrementIncrement) {

          let weekToNum

          switch (this.week.incrementStart) {
            case 'SUN':
              weekToNum = 1
              break
            case 'MON':
              weekToNum = 2
              break
            case 'TUE':
              weekToNum = 3
              break
            case 'WED':
              weekToNum = 4
              break
            case 'THU':
              weekToNum = 5
              break
            case 'FRI':
              weekToNum = 6
              break
            case 'SAT':
              weekToNum = 7
              break
          }

          weeks = weekToNum + '/' + this.week.incrementIncrement
        }

        return weeks
      },
      monthsText() {
        let months = ''

        if (this.month.specificSpecific) {
          this.month.specificSpecific.map(val => {
            months += val + ','
          })

          months = months.slice(0, -1)
        }

        return months
      },
      cron() {
        return `${this.cronObj.second || '0'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${this.cronObj.year || '*'}`
      }
    },
    methods: {
      change() {
        this.$emit('change', this.cron)
        this.close()
      },
      close() {
        this.$emit('close')
      },
      reset(data) {
        for (let i in data) {
          if (i === this.value || this.options) {
            continue
          }

          if (data[i] instanceof Object) {
            this.reset(data[i])
          } else {
            switch (typeof data[i]) {
              case 'object':
                data[i] = []
                break
              case 'string':
                data[i] = ''
                break
            }
          }
        }

        this.cronObj.year = ''
        this.cronObj.month = ''
        this.cronObj.week = ''
        this.cronObj.day = ''
        this.cronObj.hour = ''
        this.cronObj.minute = ''
        this.cronObj.second = ''
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
      getValue() {
        this.reset(this.$data)

        switch (this.value) {
          case '1':
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          // 切换分
          case '2':
            this.minute.incrementStart = '0'
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          // 切换时
          case '3':
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          // 切换日
          case '4':
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          // 切换周
          case '5':
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          // 切换月
          case '6':
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
          default:
            this.minute.incrementStart = ''
            this.hour.incrementStart = ''
            this.day.incrementStart = ''
            this.week.incrementStart = ''
            this.month.incrementStart = ''
            this.minute.incrementIncrement = ''
            this.hour.incrementIncrement = ''
            this.day.incrementIncrement = ''
            this.week.incrementIncrement = ''
            this.month.incrementIncrement = ''
            break
        }
      }
    },
    created() {

    },
  }

</script>