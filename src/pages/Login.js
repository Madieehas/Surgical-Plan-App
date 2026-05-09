function Login() {
  return (
    <div style={{ padding: "20px" }}>

      <h1>Login Page</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px"
        }}
      >

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;
