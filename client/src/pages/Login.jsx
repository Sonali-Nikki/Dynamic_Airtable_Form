import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginWithAirtable, completeAirtableLogin } from "../api/api";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // If user came back from Airtable OAuth
    const code = searchParams.get("code");
    if (code) {
      completeAirtableLogin(code)
        .then((res) => {
          login(res.user, res.token); // Save to AuthContext
          navigate("/"); // Redirect to home/dashboard
        })
        .catch((err) => {
          console.error("Login failed:", err);
          alert("Login failed. Please try again.");
        });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="login-page" style={styles.container}>
      <h1>Connect to Airtable</h1>
      <button style={styles.button} onClick={loginWithAirtable}>
        Login with Airtable
      </button>
    </div>
  );
};

// Simple inline styles (replace with Tailwind/your CSS later)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "20px",
    background: "#f4f4f4",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#2d7ff9",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
