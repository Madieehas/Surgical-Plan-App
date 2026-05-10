import { useState } from "react";

function Patients() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleBook = () => {
    if (!doctor || !date) {
      alert("Please select doctor and date");
      return;
    }

    const newAppointment = {
      doctor,
      date,
    };

    setAppointments([...appointments, newAppointment]);

    setDoctor("");
    setDate("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Patient Dashboard</h2>
        <p>Book Appointment</p>

        <input
          placeholder="Doctor Name"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleBook} style={styles.button}>
          Book Appointment
        </button>

        {/* APPOINTMENT LIST */}
        <h3 style={{ marginTop: 20 }}>My Appointments</h3>

        {appointments.length === 0 && (
          <p style={{ fontSize: 12 }}>No appointments yet</p>
        )}

        {appointments.map((a, index) => (
          <div key={index} style={styles.listItem}>
            <b>Doctor:</b> {a.doctor}
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
  input: {
    display: "block",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#0f766e",
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

export default Patients;