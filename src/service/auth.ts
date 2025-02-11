import { API_BASE_URL } from "../../types";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");

    return data; // { message: "Login successful", user: { id, name, role, email } }
  } catch (error) {
    return { error: (error as Error).message };
  }
}
