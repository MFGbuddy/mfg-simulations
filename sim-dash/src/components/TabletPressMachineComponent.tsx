import { useMemo, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useMqtt } from '../mqtt/mqtt.provider';

const TabletPressMachineComponent = () => {

  const { state } = useMqtt();
  const [chartData, setChartData] = useState<[string, number][]>([]);

  const [history, setHistory] = useState<any[]>([]);

  const IDEAL_WEIGHT = 500;
  const TABLETS_PER_REV = 10;


  useEffect(() => {
    if (state.message?.data) {
      const data = state.message.data;
      setChartData((prev) => [...prev.slice(-10), [data.timestamp, data.compression_force]]);
      setHistory((prev) => [...prev.slice(-10), data]);
    }
  }, [state])

  const lineChartOpts = useMemo(() => ({
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    tooltip: { trigger: 'axis' },
    series: [
      {
        name: 'Compression Force',
        type: 'line',
        data: chartData,
        areaStyle: {},
        lineStyle: { width: 2 },
        smooth: true,
        showSymbol: false,
      },
    ],
  }), [chartData]);

  const gauge = (title: string, value: number, min: number, max: number, unit = '') => ({
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min,
        max,
        axisLine: {
          lineStyle: { width: 10 },
        },
        pointer: { show: true },
        detail: {
          formatter: `{value}${unit}`,
          fontSize: 18,
        },
        data: [{ value, name: title }],
      },
    ],
  });

  const tabletWeight = state.message?.data.tablet_weight ?? 0;
  const turretSpeed = state.message?.data.turret_speed ?? 0;
  const temperature = state.message?.data.temperature ?? 0;
  const vibration = state.message?.data.vibration_alert ?? false;

  const derived = useMemo(() => {
    if (history.length === 0) return {};

    const totalForce = history.reduce((acc, d) => acc + d.compression_force, 0);
    const avgForce = (totalForce / history.length).toFixed(2);

    const last = history[history.length - 1];
    const productionRate = last.turret_speed * TABLETS_PER_REV;

    const weightDeviation = Math.abs(last.tablet_weight - IDEAL_WEIGHT).toFixed(2);

    const rejectRatio = ((last.reject_count / (productionRate || 1)) * 100).toFixed(2);

    return {
      avgForce,
      productionRate,
      weightDeviation,
      rejectRatio,
    };
  }, [history]);

  const layoutConfig = [
    { i: 'chart1', x: 0, y: 0, w: 6, h: 8 },
    { i: 'gauge1', x: 6, y: 0, w: 3, h: 6 },
    { i: 'gauge2', x: 9, y: 0, w: 3, h: 6 },
    { i: 'gauge3', x: 6, y: 6, w: 3, h: 6 },
    { i: 'status', x: 9, y: 6, w: 3, h: 3 },
    { i: 'derived', x: 0, y: 8, w: 12, h: 3 },
  ];

  return (
    <GridLayout className="example-layout" layout={layoutConfig} cols={12} rowHeight={30} width={1200}>
      <div key="chart1" style={{ border: '1px solid #ccc' }}>
        <ReactECharts option={lineChartOpts} />
      </div>

      <div key="gauge1" style={{ border: '1px solid #ccc' }}>
        <ReactECharts option={gauge('Tablet Weight', tabletWeight, 450, 550, 'mg')} />
      </div>

      <div key="gauge2" style={{ border: '1px solid #ccc' }}>
        <ReactECharts option={gauge('Turret Speed', turretSpeed, 0, 100, 'RPM')} />
      </div>

      <div key="gauge3" style={{ border: '1px solid #ccc' }}>
        <ReactECharts option={gauge('Temperature', temperature, 30, 80, '°C')} />
      </div>

      <div key="status" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: vibration ? '#ff4d4f' : '#52c41a',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        borderRadius: '5px'
      }}>
        {vibration ? 'VIBRATION ALERT' : 'NORMAL'}
      </div>
      <div key="derived" style={{ border: '1px solid #ddd', padding: 10 }}>
        <h3>Derived Metrics</h3>
        <ul>
          <li><strong>Average Compression Force:</strong> {derived.avgForce} kN</li>
          <li><strong>Production Rate:</strong> {derived.productionRate} TPM</li>
          <li><strong>Tablet Weight Deviation:</strong> {derived.weightDeviation} mg</li>
          <li><strong>Reject Ratio:</strong> {derived.rejectRatio} %</li>
        </ul>
      </div>
    </GridLayout>

  );
};

export default TabletPressMachineComponent;
