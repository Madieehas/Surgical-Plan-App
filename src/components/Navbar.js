import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "#1976d2",
        padding: "15px",
        display: "flex",
        gap: "20px"
      }}
    >

      <Link to="/" style={{ color: "white" }}>
        Login
      </Link>

      <Link to="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link to="/patients" style={{ color: "white" }}>
        Patients
      </Link>

      <Link to="/doctors" style={{ color: "white" }}>
        Doctors
      </Link>

      <Link to="/appointments" style={{ color: "white" }}>
        Appointments
      </Link>

    </div>
  );
}

export default Navbar;