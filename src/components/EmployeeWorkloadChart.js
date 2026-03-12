import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);

function EmployeeWorkloadChart({ data }){

 if(!data) return null;

 const chartData = {
  labels: data.employeeNames || [],
  datasets:[
   {
    label:"Tasks",
    data:data.employeeTaskCounts || [],
    backgroundColor:"#1976d2"
   }
  ]
 };

 return(

 <div style={{width:"450px"}}>
  <h3>Employee Workload</h3>
  <Bar key={JSON.stringify(chartData)} data={chartData} />
 </div>

 );

}

export default EmployeeWorkloadChart;