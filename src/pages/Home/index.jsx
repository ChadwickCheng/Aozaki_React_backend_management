import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证dom可用后再进行渲染 且对应div必须有宽高
    // 获取渲染图表的dom节点
    const chartDom = chartRef.current;
    // 初始化图表生成实例
    const myChart = echarts.init(chartDom);
    // 准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['vue', 'react', 'angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10,40,70],
          type: 'bar'
        }
      ]
    };
    // 使用图表参数完成渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div ref={chartRef} style={{width:'500px',height:'400px'}}>

      </div>
    </div>
  );
}

export default Home;