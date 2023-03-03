import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['On-Time', 'Overdue'],
  datasets: [
    {
      data: [4, 6],
      backgroundColor: ['Green', 'Red'],
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
