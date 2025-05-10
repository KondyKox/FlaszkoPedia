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
    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { message: "Ups! Coś się nie udało", success: false };
  }
};
