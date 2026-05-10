function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px"
          }}
        >
          <h3>Total Patients</h3>
          <p>20</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px"
          }}
        >
          <h3>Total Doctors</h3>
          <p>5</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
