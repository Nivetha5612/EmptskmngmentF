import { useEffect, useState } from "react";
import API from "../services/api";
import TaskTable from "../components/TaskTable";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

function Tasks(){

  const [tasks,setTasks] = useState([]);
  const [filteredTasks,setFilteredTasks] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [employeeId,setEmployeeId] = useState("");
  const [status,setStatus] = useState(0);
  const [dueDate,setDueDate] = useState("");

  const [openAdd,setOpenAdd] = useState(false);
  const [filterStatus,setFilterStatus] = useState("all");

  // Load tasks
  const loadTasks = ()=>{
    API.get("/tasks")
      .then(res=>{
        setTasks(res.data);
        setFilteredTasks(res.data); // important
      });
  }

  // Load employees
  const loadEmployees = ()=>{
    API.get("/employees")
      .then(res=>setEmployees(res.data));
  }

  useEffect(()=>{
    loadTasks();
    loadEmployees();
  },[])

  // Create task
  const addTask = ()=>{
    API.post("/tasks",{
      title,
      description,
      employeeId,
      status,
      dueDate
    }).then(()=>{
      loadTasks();
      setOpenAdd(false);
    })
  }

  // Delete task
  const deleteTask = (id)=>{
    API.delete(`/tasks/${id}`)
      .then(()=>loadTasks());
  }

  // Update status
  const updateStatus = (taskId,newStatus)=>{
    API.put(`/tasks/${taskId}`,{
      status:newStatus
    }).then(()=>loadTasks());
  }

  // Filter tasks
  const handleFilterChange = (status)=>{
    
    setFilterStatus(status);

    if(status === "all"){
      setFilteredTasks(tasks);
    }
    else{
      const filtered = tasks.filter(t => t.status === status);
      setFilteredTasks(filtered);
    }
  }

  // Reset
  const resetTasks = ()=>{
    setFilterStatus("all");
    setFilteredTasks(tasks);
  }

  return (

<div style={{
  padding:"25px",
  background:"#f5f7fb",
  minHeight:"calc(100vh - 64px)"
}}>

<h2 style={{marginBottom:"20px"}}>Tasks</h2>

<div style={{
  display:"flex",
  gap:"15px",
  marginBottom:"20px",
  alignItems:"center"
}}>

<select
  value={filterStatus}
  onChange={(e)=>handleFilterChange(e.target.value)}
  style={{
    height:"40px",
    padding:"5px 10px",
    borderRadius:"4px"
  }}
>
  <option value="all">All Tasks</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

<Button
  variant="contained"
  onClick={()=>setOpenAdd(true)}
>
CREATE TASK
</Button>

<Button
 variant="outlined"
 color="secondary"
 style={{height:"40px"}}
 onClick={resetTasks}
>
RESET
</Button>

</div>

<TaskTable
 tasks={filteredTasks}
 onDelete={deleteTask}
 onUpdateStatus={updateStatus}
/>

{/* Add Task Popup */}

<Dialog open={openAdd} onClose={()=>setOpenAdd(false)}>

<DialogTitle>Create Task</DialogTitle>

<DialogContent>

<TextField
 label="Title"
 fullWidth
 margin="dense"
 onChange={(e)=>setTitle(e.target.value)}
/>

<TextField
 label="Description"
 fullWidth
 margin="dense"
 onChange={(e)=>setDescription(e.target.value)}
/>

<select
 onChange={(e)=>setEmployeeId(e.target.value)}
 style={{width:"100%",height:"40px",marginTop:"10px"}}
>
<option>Select Employee</option>

{employees.map(emp=>(
<option key={emp.id} value={emp.id}>
{emp.name}
</option>
))}

</select>

<select
 onChange={(e)=>setStatus(Number(e.target.value))}
 style={{width:"100%",height:"40px",marginTop:"10px"}}
>
<option value={1}>Pending</option>
<option value={2}>In Progress</option>
<option value={3}>Completed</option>
</select>

<TextField
 type="date"
 fullWidth
 margin="dense"
 onChange={(e)=>setDueDate(e.target.value)}
/>

</DialogContent>

<DialogActions>

<Button onClick={()=>setOpenAdd(false)}>
Cancel
</Button>

<Button variant="contained" onClick={addTask}>
Create
</Button>

</DialogActions>

</Dialog>

</div>
  );
}

export default Tasks;