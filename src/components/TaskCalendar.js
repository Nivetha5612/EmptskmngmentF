import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCalendar({tasks}){

const [date,setDate] = useState(new Date());

const tasksForDay = tasks.filter(t=>{

 const taskDate = new Date(t.dueDate).toDateString();
 const selected = new Date(date).toDateString();

 return taskDate === selected;

});

return(

<div style={{marginTop:"30px"}}>

<h3>Task Calendar</h3>

<Calendar
 onChange={setDate}
 value={date}
/>

<h4 style={{marginTop:"15px"}}>Tasks for {date.toDateString()}</h4>

<ul>

{tasksForDay.map(t=>(
<li key={t.id}>{t.title}</li>
))}

</ul>

</div>

);

}

export default TaskCalendar;