import posts from "../../../data/posts.json";

export default function handler(req, res) {
  res.status(200).json(posts);
}
