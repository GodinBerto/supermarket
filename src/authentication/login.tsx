"use client"; // Ensure it's a client component if using Next.js 13+

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    const response = await loginUser(email, password);

    if (response.error) {
      setError(response.error);
    } else {
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user in localStorage
      router("/dashboard"); // Redirect to dashboard
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-white p-4 rounded-md shadow-lg shadow-blue-200 w-[400px]">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
            Login
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end w-full gap-3 mt-10">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md col-span-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
