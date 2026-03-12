const getDepartmentName = (id) => {

  switch(id){

    case 1:
      return "IT";

    case 2:
      return "HR";

    case 3:
      return "Finance";

    case 4:
      return "Admin";

    default:
      return "-";
  }

}

function EmployeeTable({ employees, onDelete, onEdit }) {

  return (

    <table
      style={{
        width:"100%",
        marginTop:"20px",
        borderCollapse:"collapse",
        background:"white",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}
    >

      <thead style={{background:"#f5f7fb"}}>

        <tr>

          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Department</th>
          <th style={thStyle}>Action</th>

        </tr>

      </thead>

      <tbody>

        {employees.map(emp => (

          <tr key={emp.id} style={{textAlign:"center"}}>

            <td style={tdStyle}>{emp.id}</td>

            <td style={tdStyle}>{emp.name}</td>

            <td style={tdStyle}>{emp.email}</td>

            <td style={tdStyle}>
              {getDepartmentName(emp.departmentId)}
            </td>

            <td style={tdStyle}>

              {/* EDIT BUTTON */}

              <button
                onClick={()=>onEdit(emp)}
                style={{
                  background:"#1976d2",
                  color:"white",
                  border:"none",
                  padding:"6px 12px",
                  marginRight:"10px",
                  cursor:"pointer"
                }}
              >
                Edit
              </button>

              {/* DELETE BUTTON */}

              <button
                onClick={()=>onDelete(emp.id)}
                style={{
                  background:"#e53935",
                  color:"white",
                  border:"none",
                  padding:"6px 12px",
                  cursor:"pointer"
                }}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}

const thStyle = {
  padding:"12px",
  borderBottom:"1px solid #ddd"
}

const tdStyle = {
  padding:"10px",
  borderBottom:"1px solid #eee"
}



export default EmployeeTable;