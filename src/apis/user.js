import axios from "../axios";

export const apiLoginWithGoogle = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/google`
    );
  } catch (error) {}
};

export const apiLoginWithEmail = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `https://lemon-code-page.onrender.com/api/auth/login`,
      {
        email,
        password,
      }
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
