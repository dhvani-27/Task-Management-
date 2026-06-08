import { useState } from "react";
import Login from "./frontEnd/pages/login";
import Register from "./frontEnd/pages/register";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return showRegister ? (
    <Register onSwitch={() => setShowRegister(false)} />
  ) : (
    <>
      <Login />
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span>Don't have an account? </span>
        <button
          type="button"
          onClick={() => setShowRegister(true)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default App;
