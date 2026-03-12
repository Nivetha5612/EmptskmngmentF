import { Card, CardContent, Typography } from "@mui/material";

function DashboardCards({ data }) {

 if(!data) return null;

 const cards = [

  {title:"Employees", value:data.totalEmployees},
  {title:"Tasks", value:data.totalTasks},
  {title:"Pending", value:data.pendingTasks},
  {title:"Completed", value:data.completedTasks}

 ];

 return(

 <div style={{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px",
  marginBottom:"30px"
 }}>

 {cards.map((card,i)=>(

 <Card key={i}
 style={{
  borderRadius:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
 }}>

 <CardContent>

 <Typography variant="h6">{card.title}</Typography>

 <Typography
 variant="h4"
 style={{color:"#1976d2",marginTop:"10px"}}
 >
 {card.value}
 </Typography>

 </CardContent>

 </Card>

 ))}

 </div>

 );
}

export default DashboardCards;