# point-vue-cron

source: https://github.com/1615450788/vue-cron

Cron Expression Generator, based on vue and element-ui
[demo](https://pointworld.github.io/point-vue-cron/)

## dependencies

- Vue 2.0.0+
- element-ui 2.0.0+

## install

```
// npm install point-vue-cron
```

## usage

```javascript
// config
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// global import
import VueCron from 'vue-cron'
Vue.use(VueCron) // use：<vueCron></vueCron>

// local import
import {cron} from 'vue-cron'

export default {
    template: '<cron/>',
    components: { cron }
}
```

## examples
```vue
<template>
    <div class="cron">
        <h1>vue-cron</h1>
        <el-popover v-model="cronPopover">
            <cron @change="changeCron" @close="cronPopover=false" i18n="en"></cron>
            <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略"></el-input>
        </el-popover>
    </div>
</template>

<script>
    import {cron} from 'vue-cron'

    export default {
        components: { cron },
        data() {
            return {
                cronPopover: false,
                cron: ''
            }
        },
        methods: {
            changeCron(val){
                this.cron = val
            },
        },
    }
</script>
```

## parameters


## events
- change(cronText)
  - param: `{String} cronText` the value of cron expression
  - trigger when the value of cron expression changed
    
- close()
  - param: null
  - trigger when the cancel button of select box was clicked
