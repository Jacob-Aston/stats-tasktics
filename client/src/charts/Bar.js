import { Bar } from 'react-chartjs-2';

const data = {
  // this is the label at the bottom of each column
  labels: ['Last Week', 'This Week'],
  datasets: [
    {
      // each dataset is a bar inside each of the above labels
      label: 'On-Time',
      data: '4',
      backgroundColor: '#2C3531',
    },
    {
      label: 'Complete',
      data: '6',
      backgroundColor: '#D1E8E2',
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

function BarChart() {
  return (
    <div>
      <Bar id="bar" options={options} data={data} />
    </div>
  );
}

export default BarChart;
