import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from './LineChart01';
import Icon from '../assets/icon-01.svg';
import EditMenu from './DropdownEditMenu';
import { tailwindConfig, hexToRGB } from '../utils/Utils';

function Chart({data}) {

  const getLastNDays = (n) => {
    const today = new Date();
    const lastNDaysArray = Array.from({ length: n }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    });
    return lastNDaysArray.reverse();
  };

  // Get an array of the last 30 days
  const last30DaysArray = getLastNDays(30);

  const chartData = {
    labels: last30DaysArray, // Use the dynamically generated array
    datasets: [
      // Indigo line
      {
        data: [732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line
      {
        data: [532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642],
        borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (

    <Link to='/h' state={{data}}>
    <div className="   flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="p-5">
        
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Bee-Jay Hotel {data.location}</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{data.totalSales}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
    </Link>
  );
}

export default Chart;