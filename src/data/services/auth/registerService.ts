export const registerService = async (credentials: any) => {
  const url = new URL(
    "/api/auth/register",
    process.env.NEXT_PUBLIC_BACKEND_URL
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
