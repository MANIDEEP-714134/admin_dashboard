import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>PMS Admin</h2>

      <p>
        <Link style={{ color: "white" }} to="/">
          Dashboard
        </Link>
      </p>

      <p>
        <Link style={{ color: "white" }} to="/devices">
          Devices
        </Link>
      </p>

      <p>
        <Link style={{ color: "white" }} to="/guardians">
          Guardians
        </Link>
      </p>

      <p>
        <Link style={{ color: "white" }} to="/alerts">
          Alerts
        </Link>
      </p>
    </div>
  );
}

export default Sidebar;