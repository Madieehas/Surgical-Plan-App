import { useState } from "react";

function Doctors() {
  const [status, setStatus] = useState("Available");

  // fake demo appointments (for presentation)
  const [appointments] = useState([
    { patient: "Ali", date: "2026-05-12" },
    { patient: "Siti", date: "2026-05-13" },
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Doctor Dashboard</h2>

        <h3>Status</h3>

        <button
          onClick={() => setStatus("Available")}
          style={{
            ...styles.button,
            background: status === "Available" ? "green" : "#0f766e",
            marginRight: 10,
          }}
        >
          Available
        </button>

        <button
          onClick={() => setStatus("Busy")}
          style={{
            ...styles.button,
            background: status === "Busy" ? "red" : "#0f766e",
          }}
        >
          Busy
        </button>

        <p style={{ marginTop: 10 }}>
          Current Status: <b>{status}</b>
        </p>

        {/* APPOINTMENT LIST */}
        <h3>Appointments</h3>

        {appointments.map((a, index) => (
          <div key={index} style={styles.listItem}>
            <b>Patient:</b> {a.patient}
            <br />
            <b>Date:</b> {a.date}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: 380,
    padding: 20,
    borderRadius: 10,
    background: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  button: {
    padding: 10,
    color: "white",
    border: "none",
    borderRadius: 5,
  },
  listItem: {
    marginTop: 10,
    padding: 10,
    background: "#f0fdfa",
    borderRadius: 5,
  },
};

export default Doctors;