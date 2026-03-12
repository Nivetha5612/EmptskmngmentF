import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCards from "../components/DashboardCards";
import TaskChart from "../components/TaskChart";
import OverduePanel from "../components/OverduePanel";

function Dashboard(){

 const [data,setData] = useState(null);

 useEffect(()=>{

 axios.get("http://localhost:5000/api/dashboard")

 .then(res=>setData(res.data))
 .catch(err=>console.log(err));

 },[]);

 return(

 <div style={{
  padding:"25px",
  background:"#f5f7fb",
  minHeight:"100vh"
 }}>

 <h2>Dashboard</h2>

 <DashboardCards data={data} />

 <div style={{
  display:"flex",
  gap:"40px",
  flexWrap:"wrap"
 }}>

 <TaskChart data={data} />


 </div>

 <OverduePanel tasks={data?.overdueTasks} />

 </div>

 );

}

export default Dashboard;