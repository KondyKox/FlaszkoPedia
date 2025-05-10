export const updateUser = async (newEmail: string, newPassword: string) => {
  try {
    const res = await fetch("/api/user/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { message: "Ups! Coś się nie udało", success: false };
  }
};

export const checkPassword = async (password: string) => {
  try {
    const res = await fetch("/api/user/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Failed to check password:", error);
    return { message: "Ups! Coś poszło nie tak.", success: false };
  }
};
