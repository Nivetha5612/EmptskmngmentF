import React from "react";

const getStatusStyle = (status) => {

  switch(status){

    case "Pending":
      return {background:"#ff9800",color:"white",padding:"4px 8px",borderRadius:"6px"};

    case "In Progress":
      return {background:"#2196f3",color:"white",padding:"4px 8px",borderRadius:"6px"};

    case "Completed":
      return {background:"#4caf50",color:"white",padding:"4px 8px",borderRadius:"6px"};

    default:
      return {};
  }

};

const isOverdue = (dueDate,status) => {

  const today = new Date();
  const due = new Date(dueDate);

  return due < today && status !== "Completed";

};

function TaskTable({tasks,onDelete,onUpdateStatus}){

  return(

    <table
      style={{
        width:"100%",
        borderCollapse:"collapse",
        background:"white",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}
    >

      <thead style={{background:"#f5f7fb"}}>

        <tr>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Description</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Employee</th>
          <th style={thStyle}>Due Date</th>
          <th style={thStyle}>Action</th>
        </tr>

      </thead>

      <tbody>

        {tasks.map(task=>(

          <tr
            key={task.id}
            style={{
              background:isOverdue(task.dueDate,task.status?.statusName)
                ? "#ffe6e6"
                : "white"
            }}
          >

            <td style={tdStyle}>{task.title}</td>

            <td style={tdStyle}>{task.description}</td>

            <td style={tdStyle}>
              <span style={getStatusStyle(task.status?.statusName)}>
                {task.status?.statusName}
              </span>
            </td>

            <td style={tdStyle}>{task.employee?.name}</td>

            <td style={tdStyle}>
              {new Date(task.dueDate).toLocaleDateString()}
            </td>

            <td style={tdStyle}>

              <select
                value={task.status?.statusName}
                onChange={(e)=>onUpdateStatus(task.id,e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={()=>onDelete(task.id)}
                style={{
                  background:"red",
                  color:"white",
                  border:"none",
                  padding:"6px 10px",
                  marginLeft:"10px"
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

const thStyle={
  padding:"12px",
  borderBottom:"1px solid #ddd",
  textAlign:"center"
};

const tdStyle={
  padding:"10px",
  borderBottom:"1px solid #eee",
  textAlign:"center"
};

export default TaskTable;