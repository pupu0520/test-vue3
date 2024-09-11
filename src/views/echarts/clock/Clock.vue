<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import dayjs from 'dayjs';

const clockDom = ref();
let clockChart = null;
function setOption() {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90, // 起始角度
        endAngle: -270, // 结束角度
        max: 12,
        splitNumber: 60, // 分割线
        anchor: { // 指针固定点
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: '#000'
          }
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '80%',
          offsetCenter: [0, '8%']
        },
        progress: { // 仪表盘进度
          show: false,
          overlap: true,
          roundCap: true
        },
        axisLine: { // 轴线，外层圆环
          show: true,
          roundCap: true
        },
        splitLine: { // 分割线 
          show: true,
        },
        axisTick: { // 刻度线
          show: true,
        },
        axisLabel: {
          show: true,
          formatter: function (value) {
            if(value === 0) return '';
            return parseFloat(value) !== parseInt(value, 10) ? '' : value;
          }
        },
        data: [
          {
            value: 2,
            name: '时',
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            pointer: {
              length: '45%',
              width: 8
            }
          },
          {
            value: 4,
            name: '分',
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            pointer: {
              length: '65%',
              width: 4
            }
          },
          {
            value: 6,
            name: '秒',
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            pointer: {
              length: '85%',
              width: 2
            }
          }
        ],
        title: {
          fontSize: 14
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: '#fff',
          backgroundColor: 'inherit',
          borderRadius: 3,
          formatter: '{value}%'
        }
      }
    ]
  };
  clockChart = echarts.init(clockDom.value);
  clockChart.setOption(option)
}


function updateOption() {
  clockChart.setOption({
    series: [
      {
        data: [
          {value: 1, name: '时'},
          {value: 2, name: '分'},
          {value: 3, name: '秒'},
        ]
      }
    ]
  })
}


function init() {
  setOption();
  updateOption();
}

onMounted(() => {
  init()
})
</script>
<template>
  <div>
    <div ref="clockDom" class="clock-dom"></div>
  </div>
</template>

<style lang='scss' scoped>
.clock-dom {
  margin: 0 auto;
  width: 800px;
  height: 800px;
}
</style>