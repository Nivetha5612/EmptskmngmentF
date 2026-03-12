import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

function Login({ setLoggedIn }) {

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const login = () => {

  if(!username || !password){
   alert("Enter username and password");
   return;
  }

  if(username === "admin" && password === "admin"){
   setLoggedIn(true);
  }
  else{
   alert("Invalid login");
  }

 };

 return(

 <div style={{
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"linear-gradient(120deg,#4b79a1,#283e51)"
 }}>

 <Paper elevation={6}
 style={{
  width:"380px",
  padding:"40px",
  borderRadius:"12px",
  textAlign:"center"
 }}>

 <Typography variant="h5" style={{fontWeight:"bold"}}>
 Employee Task Management
 </Typography>

 <Typography variant="body2" style={{marginBottom:"25px"}}>
 Login to Continue
 </Typography>

 <TextField
  label="Username"
  fullWidth
  margin="normal"
  onChange={(e)=>setUsername(e.target.value)}
 />

 <TextField
  label="Password"
  type="password"
  fullWidth
  margin="normal"
  onChange={(e)=>setPassword(e.target.value)}
 />

 <Button
  variant="contained"
  fullWidth
  style={{
   marginTop:"20px",
   height:"45px",
   background:"#1976d2"
  }}
  onClick={login}
 >
 LOGIN
 </Button>

 </Paper>

 </div>

 );
}

export default Login;