import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ className, salaryData }: any) => {
  const data = {
    labels: salaryData.labels, // Dynamic labels from salaryData
    datasets: [
      {
        label: "Salaries",
        data: salaryData.values, // Dynamic salary values from salaryData
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Employee Salary Data",
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 500, // Adjust based on your salary data range
        },
      },
    },
  };

  return <Line data={data} options={options} className={className} />;
};

export default LineChart;
