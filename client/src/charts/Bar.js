import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['On-Time', 'Overdue'],
  datasets: [
    {
      data: [4, 6],
      backgroundColor: ['Info', 'Danger'],
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
      text: 'Bar Chart',
    },
  },
};

function BarChart() {
  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar id="bar" options={options} data={data} />;
    </div>
  );
}

export default BarChart;
