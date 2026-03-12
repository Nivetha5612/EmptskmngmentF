function StatusBadge({ status }) {

  const colors = {
    Pending: "orange",
    "In Progress": "blue",
    Completed: "green"
  };

  return (
    <span style={{
      background: colors[status],
      color: "white",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px"
    }}>
      {status}
    </span>
  );
}

export default StatusBadge;