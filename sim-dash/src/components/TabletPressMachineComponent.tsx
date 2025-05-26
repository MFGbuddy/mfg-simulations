import { useMemo, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useMqtt } from '../mqtt/mqtt.provider';
const TabletPressMachineComponent = () => {

  const { state } = useMqtt();
  const [chartData, setChartData] = useState<[string, number][]>([]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [btnStatus, setBtnStatus] = useState(false);

  const onBtnStart = () => {
    setBtnStatus(btnStatus => !btnStatus);
    console.log(btnStatus)

    if (btnStatus) {
      fetch('http://localhost:8080/machine/start/tabletpress').then((response) => {
        if (response.ok) {
          console.log('Tablet press started successfully');
        } else {
          console.error('Failed to start tablet press');
        }
      })
    } else {
      fetch('http://localhost:8080/machine/stop').then((response) => {
        if (response.ok) {
          console.log('Tablet press stopped successfully');
        } else {
          console.error('Failed to stop tablet press');
        }
      })
    }
  }

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
    ]
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
        data: [{ value, name: title }]
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
    { i: 'gauge1', x: 0, y: 0, w: 3, h: 6 },
    { i: 'gauge2', x: 3, y: 0, w: 3, h: 6 },
    { i: 'gauge3', x: 6, y: 0, w: 3, h: 6 },
    { i: 'status', x: 9, y: 0, w: 3, h: 6, isResizable: false, draggable: true },
    { i: 'chart1', x: 0, y: 8, w: 9, h: 8 },
    { i: 'derived', x: 9, y: 9, w: 3, h: 8 },
  ];

  return (
    <>
      <div className='flex justify-between items-center bg-gray-200 border-gray-300 border-1 p-2 m-2'>
        <h1 className='text-3xl'> Tablet Press Machine</h1>
        <input type="button" className='bg-blue-500 text-white font-bold rounded px-2 py-2' value={btnStatus ? 'STOP' : 'START'} onClick={onBtnStart} />
      </div>
      <GridLayout className="example-layout" layout={layoutConfig} rowHeight={30} width={width - 20}>

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

        <div key="chart1" style={{ border: '1px solid #ccc', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ReactECharts option={lineChartOpts} style={{ width: '100%', height: '100%' }} />
        </div>

        <div key="derived" className="border border-gray-300 rounded-xl p-4 shadow-sm">
          <h3 className="text-2xl text-amber-500 font-bold mb-4">Derived Metrics</h3>
          <table className="table-auto w-full text-left text-gray-00">
            <tbody>
              <tr className="border-t border-gray-300">
                <th className="py-2 pr-4">Average Compression Force</th>
                <td className="py-2 font-semibold">{derived.avgForce} kN</td>
              </tr>
              <tr className="border-t border-gray-300">
                <th className="py-2 pr-4">Production Rate</th>
                <td className="py-2 font-semibold">{derived.productionRate} TPM</td>
              </tr>
              <tr className="border-t border-gray-300">
                <th className="py-2 pr-4">Tablet Weight Deviation</th>
                <td className="py-2 font-semibold">{derived.weightDeviation} mg</td>
              </tr>
              <tr className="border-t border-gray-300">
                <th className="py-2 pr-4 ">Reject Ratio</th>
                <td className="py-2 font-semibold">{derived.rejectRatio} %</td>
              </tr>
            </tbody>
          </table>
        </div>

      </GridLayout>
    </>
  );
};

export default TabletPressMachineComponent;
