import axios from "axios";
import { cookies } from "next/headers";

const serverClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,   // ← absolute URL zaroori hai
});

const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value ?? null;

    if (!token) {
      return { user: null, success: false };
    }

    const response = await serverClient.get("/user/get", {
      headers: {
        Authorization: token,   // ← ye aapka original tha, sahi hai
      },
    });

    if (!response.data.success) {
      return { user: null, success: false };
    }

    return response.data;

  } catch (error) {
    console.log("GET ME ERROR:", error.response?.data || error.message);
    return { user: null, success: false };
  }
};

export { getMe };