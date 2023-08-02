import axios from "../axios";

export const apiGetPosts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/post/getAll`, {
        withCredentials: true
      }
    );
    if (response.err == 0) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log("🚀 ~ getProperties ~ error:", error);
  }
};

export const apiGetPostBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${slug}`, {
        withCredentials: true
      }
    );
    if (response.err === 0) {
      return response.data;
    }
    return {};
  } catch (error) {
    console.log("🚀 ~ apiGetPostBySlug ~ error:", error);
    return {};
  }
};

export const apiCreatePost = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      data
    );
    if (response.status === 201) {
      return response.data;
    }
    return {};
  } catch (error) {
    console.log("🚀 ~ apiCreatePost ~ error:", error);
    return {};
  }
};
