function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  return (
    <div style={{
      padding: "15px",
      background: "#0f766e",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ fontWeight: "bold" }}>
        Surgical Plan System
      </div>

      <div style={{ display: "flex", gap: "15px" }}>

        {role === "doctor" && (
          <>
            <span>Doctor Dashboard</span>
            <span>Availability</span>
            <span>Appointments</span>
          </>
        )}

        {role === "patient" && (
          <>
            <span>Patient Dashboard</span>
            <span>Book Appointment</span>
          </>
        )}

        {!role && <span>Login</span>}

      </div>
    </div>
  );
}

export default Navbar;
