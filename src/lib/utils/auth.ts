export const registerUser = async (email: string, password: string) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Registration failed:", errorData);
      return data.message;
    }

    console.log("Registration successful:", data.message);
    return data.message;
  } catch (error) {
    console.error("Registration error:", error);
    return "Ups! Coś się nie udało";
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login failed:", errorData);
      return data.message;
    }

    console.log("Login successful:", data.message);
    return data.message;
  } catch (error) {
    console.error("Login error:", error);
    return "Ups! Coś się nie udało";
  }
};
