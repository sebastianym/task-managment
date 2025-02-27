export const loginService = async (credentials: any) => {
  const url = new URL("/api/auth/login", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
