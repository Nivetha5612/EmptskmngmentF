import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";

import {
 TextField,
 Button,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Snackbar,
 Alert
} from "@mui/material";

function Employees(){

 const [employees,setEmployees] = useState([]);
 const [filteredEmployees,setFilteredEmployees] = useState([]);

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [departmentId,setDepartmentId] = useState("1");

 const [searchId,setSearchId] = useState("");

 const [openAdd,setOpenAdd] = useState(false);
 const [openEdit,setOpenEdit] = useState(false);
 const [openView,setOpenView] = useState(false);

 const [selectedEmployee,setSelectedEmployee] = useState(null);
 const [viewEmployee,setViewEmployee] = useState(null);

 const [notification,setNotification] = useState({
  open:false,
  message:"",
  type:"success"
 });

 // Load employees
 const loadEmployees = ()=>{
  API.get("/employees")
   .then(res=>{
    setEmployees(res.data);
    setFilteredEmployees(res.data);
   });
 }

 useEffect(()=>{
  loadEmployees();
 },[]);

 // Add employee
 const addEmployee = async ()=>{

  if(!name || !email){
   setNotification({
    open:true,
    message:"All fields required",
    type:"error"
   })
   return;
  }

  await API.post("/employees",{
   name,
   email,
   departmentId
  });

  setOpenAdd(false);
  setName("");
  setEmail("");

  setNotification({
   open:true,
   message:"Employee added successfully",
   type:"success"
  })

  loadEmployees();
 }

 // Delete employee
 const deleteEmployee = async(id)=>{

  await API.delete(`/employees/${id}`);

  setNotification({
   open:true,
   message:"Employee deleted",
   type:"success"
  })

  loadEmployees();
 }

 // Department filter
 const filterByDepartment = (deptId)=>{

  if(deptId === "all"){
   setFilteredEmployees(employees);
  }
  else{
   const filtered = employees.filter(emp =>
    emp.departmentId === Number(deptId)
   );
   setFilteredEmployees(filtered);
  }
 }

 const resetEmployees = () => {

  setSearchId("");
  setDepartmentId("all");
  setFilteredEmployees(employees);

};

 // Edit employee
 const handleEdit = (emp)=>{
  setSelectedEmployee(emp);
  setName(emp.name);
  setEmail(emp.email);
  setDepartmentId(emp.departmentId);
  setOpenEdit(true);
 }

 const updateEmployee = async()=>{

  await API.put(`/employees/${selectedEmployee.id}`,{
   name,
   email,
   departmentId
  });

  setOpenEdit(false);

  setNotification({
   open:true,
   message:"Employee updated",
   type:"success"
  })

  loadEmployees();
 }

 // Search employee
 const searchEmployee = async()=>{

  try{

   const res = await API.get(`/employees/${searchId}`);

   setViewEmployee(res.data);
   setOpenView(true);

  }
  catch{

   setNotification({
    open:true,
    message:"Employee not found",
    type:"error"
   })

  }
 }

 const getDepartmentName = (id)=>{
  switch(id){
   case 1: return "IT"
   case 2: return "HR"
   case 3: return "Finance"
   case 4: return "Admin"
   default: return "-"
  }
 }

 return(

 <div style={{
  padding:"25px",
  background:"#f5f7fb",
  minHeight:"100vh"
 }}>

 <h2>Employees</h2>

 <div style={{
  display:"flex",
  gap:"15px",
  marginBottom:"20px",
  alignItems:"center"
 }}>

 <select
  onChange={(e)=>filterByDepartment(e.target.value)}
  style={{width:"200px",height:"56px"}}
 >
  <option value="all">All Departments</option>
  <option value="1">IT</option>
  <option value="2">HR</option>
  <option value="3">Finance</option>
  <option value="4">Admin</option>
 </select>

 <Button
  variant="contained"
  onClick={()=>setOpenAdd(true)}
 >
 ADD EMPLOYEE
 </Button>

 <TextField
  label="Search Employee ID"
  value={searchId}
  onChange={(e)=>setSearchId(e.target.value)}
  sx={{width:"220px"}}
 />

 <Button
  variant="outlined"
  onClick={searchEmployee}
 >
 SEARCH
 </Button>

<Button
 variant="outlined"
 color="secondary"
 onClick={resetEmployees}
>
RESET
</Button>
 </div>

 <EmployeeTable
  employees={filteredEmployees}
  onDelete={deleteEmployee}
  onEdit={handleEdit}
 />

 {/* ADD EMPLOYEE */}

 <Dialog open={openAdd} onClose={()=>setOpenAdd(false)}>

 <DialogTitle>Add Employee</DialogTitle>

 <DialogContent>

 <TextField
  label="Name"
  fullWidth
  margin="dense"
  value={name}
  onChange={(e)=>setName(e.target.value)}
 />

 <TextField
  label="Email"
  fullWidth
  margin="dense"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
 />

 <select
  value={departmentId}
  onChange={(e)=>setDepartmentId(e.target.value)}
  style={{width:"100%",height:"40px",marginTop:"10px"}}
 >
  <option value="1">IT</option>
  <option value="2">HR</option>
  <option value="3">Finance</option>
  <option value="4">Admin</option>
 </select>

 </DialogContent>

 <DialogActions>

 <Button onClick={()=>setOpenAdd(false)}>Cancel</Button>

 <Button
  variant="contained"
  onClick={addEmployee}
 >
 Add
 </Button>

 </DialogActions>

 </Dialog>

 {/* EDIT */}

 <Dialog open={openEdit} onClose={()=>setOpenEdit(false)}>

 <DialogTitle>Edit Employee</DialogTitle>

 <DialogContent>

 <TextField
  label="Name"
  fullWidth
  margin="dense"
  value={name}
  onChange={(e)=>setName(e.target.value)}
 />

 <TextField
  label="Email"
  fullWidth
  margin="dense"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
 />

 <select
  value={departmentId}
  onChange={(e)=>setDepartmentId(e.target.value)}
  style={{width:"100%",height:"40px",marginTop:"10px"}}
 >
  <option value="1">IT</option>
  <option value="2">HR</option>
  <option value="3">Finance</option>
  <option value="4">Admin</option>
 </select>

 </DialogContent>

 <DialogActions>

 <Button onClick={()=>setOpenEdit(false)}>Cancel</Button>

 <Button
  variant="contained"
  onClick={updateEmployee}
 >
 Save
 </Button>

 </DialogActions>

 </Dialog>

 {/* VIEW */}

 <Dialog open={openView} onClose={()=>setOpenView(false)}>

 <DialogTitle>Employee Details</DialogTitle>

 <DialogContent>

 <p><b>ID:</b> {viewEmployee?.id}</p>
 <p><b>Name:</b> {viewEmployee?.name}</p>
 <p><b>Email:</b> {viewEmployee?.email}</p>
 <p><b>Department:</b> {getDepartmentName(viewEmployee?.departmentId)}</p>

 </DialogContent>

 <DialogActions>

 <Button onClick={()=>setOpenView(false)}>Close</Button>

 </DialogActions>

 </Dialog>

 <Snackbar
  open={notification.open}
  autoHideDuration={3000}
  onClose={()=>setNotification({...notification,open:false})}
 >
 <Alert severity={notification.type}>
 {notification.message}
 </Alert>
 </Snackbar>

 </div>
 );
}

export default Employees;