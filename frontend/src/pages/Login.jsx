import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      login(
        res.data.user,
        res.data.token
      );

      navigate("/dashboard");
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >
      <h2>Login</h2>

      <input
        className="input"
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password:
              e.target.value,
          })
        }
      />

      <button
        className="btn"
        style={{
          marginTop: "15px",
        }}
      >
        Login
      </button>
    </form>
  );
}

export default Login;