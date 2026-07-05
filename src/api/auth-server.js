import axios from "axios";
import { cookies } from "next/headers";

const authServerClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value ?? null;

    if (!token) {
      return { user: null, success: false };
    }

    const response = await authServerClient.get("/user/get", {
      headers: {
        Authorization: token,
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