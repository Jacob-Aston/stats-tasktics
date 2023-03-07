import { Line } from 'react-chartjs-2';

const labels = ['Last Week', 'This Week', 'Complete', 'Incomplete'];

const data = {
  labels,
  datasets: [
    {
      label: 'Line Graph',
      data: [2, 5, 4, 6],
      backgroundColor: ['Green'],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Completion Time',
      color: '#2C3531',
    },
  },
};

function LineChart() {
  return (
    <div>
      <Line id="line" options={options} data={data} />
    </div>
  );
}

export default LineChart;
