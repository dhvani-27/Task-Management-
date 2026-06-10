import { useState, useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./app/dashboard/page";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return showRegister ? (
    <Register onSwitch={() => setShowRegister(false)} />
  ) : (
    <>
      <Login onLoginSuccess={handleLoginSuccess} />
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
