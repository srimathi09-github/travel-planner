import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post(
      "/auth/register",
      form
    );

    console.log("REGISTER SUCCESS");
    console.log(res.data);

    login(
      res.data.user,
      res.data.token
    );

    navigate("/dashboard");

  } catch (err) {
    console.log("REGISTER ERROR");
    console.log(err);
    console.log(err.response);

    alert(
      err.response?.data?.message ||
      err.message ||
      "Registration Failed"
    );
  }
};

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;