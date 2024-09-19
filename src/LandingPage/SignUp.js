import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        return;
      }
      // Redirect ke halaman lain, misalnya ke halaman dashboard
      navigate("/courses");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="shadow-submit dark:shadow-submit-dark rounded-lg items-center justify-center bg-black py-4 text-base font-medium text-white duration-300 hover:bg-gray-600"
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
