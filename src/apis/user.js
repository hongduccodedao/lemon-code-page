import axios from "../axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const apiLoginWithGoogle = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      {
        withCredentials: true,
      },
    );
  } catch (error) {}
};

export const apiLoginWithEmail = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      },
    );
    if (response.err === 0) {
      return response;
    } else {
      return response.message;
    }
  } catch (error) {
    console.log("🚀 ~ apiLoginWithEmail ~ error:", error);
  }
};

export const apiGetCurrentUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/getCurrent`,
      {
        withCredentials: true,
      },
    );
    if (response.err === 0) {
      return response;
    } else {
      return {};
    }
  } catch (error) {
    console.log("🚀 ~ apiGetCurrentUser ~ error", error);
  }
};

export const apiRegister = async ({ email, password, firstName, lastName }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        email,
        password,
        firstName,
        lastName,
      },
    );
    if (response.err === 0) {
      return response;
    } else {
      return response.message;
    }
  } catch (error) {
    console.log("🚀 ~ apiRegister ~ error", error);
  }
};
