import { Chip } from "@mui/material";

function StatusChip({status}){

  const colors = {
    Pending: "warning",
    InProgress: "primary",
    Completed: "success"
  };

  return(
    <Chip
      label={status}
      color={colors[status] || "default"}
    />
  );
}

export default StatusChip;