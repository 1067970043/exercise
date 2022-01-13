import React, {Component} from 'react'
// 引入 ECharts 主模块
import { Col, Row } from 'antd';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid'

import './index.css'
import database from './database';

// const table1 = {
//     title: {
//         text: 'ECharts示例' ,
//         x: 'center'},
//     tooltip: {
//         trigger: 'axis'
//       },
//       legend: {
//         data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
//       },
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//       },
//       toolbox: {
//         feature: {
//           saveAsImage: {}
//         }
//       },
//       xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//       },
//       yAxis: {
//         type: 'value'
//       },
//       series: [
//         {
//           name: 'Email',
//           type: 'line',
//           stack: 'Total',
//           data: [120, 132, 101, 134, 90, 230, 210]
//         },
//         {
//           name: 'Union Ads',
//           type: 'line',
//           stack: 'Total',
//           data: [220, 182, 191, 234, 290, 330, 310]
//         },
//         {
//           name: 'Video Ads',
//           type: 'line',
//           stack: 'Total',
//           data: [150, 232, 201, 154, 190, 330, 410]
//         },
//         {
//           name: 'Direct',
//           type: 'line',
//           stack: 'Total',
//           data: [320, 332, 301, 334, 390, 330, 320]
//         },
//         {
//           name: 'Search Engine',
//           type: 'line',
//           stack: 'Total',
//           data: [820, 932, 901, 934, 1290, 1330, 1320]
//         }
//       ]
// }



class NumTable extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('table1'));
        // 绘制图表
        myChart1.setOption(database.table1);

        window.onresize = function () {
            myChart1.resize();
        }
    }
    render() {
        return (
            <>
                <Row >
                    <Col span={24} id="table1"></Col >
                </Row>
                <Row  gutter={24}>
                    <Col span={8} id="table2"></Col >
                    <Col span={8} id="table2"></Col >
                    <Col span={8} id="table2"></Col >
                </Row>
            </>
        );
    }
}

export default NumTable;
