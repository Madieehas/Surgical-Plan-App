import { useEffect, useState } from "react";
import API from "../services/api";

function Patients() {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  // FETCH PATIENTS
  const fetchPatients = async () => {

    try {

      setLoading(true);

      const response = await API.get("/patients");

      setPatients(response.data);

      setLoading(false);

    } catch (err) {

      setError("Failed to fetch patients");

      setLoading(false);
    }
  };

  // ADD OR UPDATE PATIENT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await API.put(`/patients/${editingId}`, {
          name,
          age
        });

        setEditingId(null);

      } else {

        await API.post("/patients", {
          name,
          age
        });
      }

      setName("");
      setAge("");

      fetchPatients();

    } catch (err) {

      alert("Operation failed");
    }
  };

  // DELETE PATIENT
  const deletePatient = async (id) => {

    try {

      await API.delete(`/patients/${id}`);

      fetchPatients();

    } catch (err) {

      alert("Delete failed");
    }
  };

  // EDIT PATIENT
  const editPatient = (patient) => {

    setEditingId(patient.id);

    setName(patient.name);

    setAge(patient.age);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // SEARCH FILTER
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      <h1>Patients Page</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px"
        }}
      />

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">

          {editingId ? "Update Patient" : "Add Patient"}

        </button>

      </form>

      {/* LOADING */}

      {loading && <p>Loading...</p>}

      {/* ERROR */}

      {error && <p>{error}</p>}

      {/* PATIENT DATA */}

      {filteredPatients.map((patient) => (

        <div
          key={patient.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px"
          }}
        >

          <h3>{patient.name}</h3>

          <p>Age: {patient.age}</p>

          <button
            onClick={() => editPatient(patient)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => deletePatient(patient.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Patients;