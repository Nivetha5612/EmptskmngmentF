import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ setLoggedIn }) {

  return (

    <AppBar position="static" sx={{ padding: "10px" }}>

      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Task Management
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>

        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>

        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => setLoggedIn(false)}
          sx={{ marginLeft: "20px" }}
        >
          Logout
        </Button>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;