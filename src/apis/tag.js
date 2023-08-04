import axios from "@/axios";

export const apiGetAllTags = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/post/getAllTags`,
    );
    if (response.err === 0) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
