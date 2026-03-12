import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function TaskChart({ data }) {

  if (!data) return null;

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [
          data.pendingTasks,
          data.inProgressTasks,
          data.completedTasks
        ],
        backgroundColor: [
          "#ff9800",
          "#2196f3",
          "#4caf50"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "350px", marginTop: "40px" }}>
      <Pie key={JSON.stringify(chartData)} data={chartData} />
    </div>
  );
}

export default TaskChart;