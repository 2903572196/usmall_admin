<template>
  <div>
      <div class="box" id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts"
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
      var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
      // 指定图表的配置项和数据
        var option = {
            title: {
                text: '近一周订单数量'
            },
            tooltip: {},
            legend: {
                data:['近一周订单数量']
            },
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis: {},
            series: [{
                name: '近一周订单数量',
                type: 'line',
                data: [20, 30, 36, 10, 30, 20,50]
            }]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  },
};
</script>
<style scoped>
.box{
    width:90%;
    height: 500px;
    margin: 20px auto;
}
</style>