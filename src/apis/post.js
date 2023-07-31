import axios from "axios";

export const apiGetPosts = async () => {
  try {
    const response = await axios.get(
      `/api/posts`
    );
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log("🚀 ~ getProperties ~ error:", error);
  }
};

export const apiGetPostBySlug = async (slug) => {
  try {
    const response = await axios.get(`/api/posts/${slug}`);
    if (response.status === 200) {
      return response.data;
    }
    return {};
  } catch (error) {
    console.log("🚀 ~ apiGetPostBySlug ~ error:", error);
    return {};
  }
};
