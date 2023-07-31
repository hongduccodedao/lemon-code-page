import posts from "../../../../data/posts.json";

export default function handler(req, res) {
  const { slug } = req.query;
  const post = posts.find((post) => post.slug === slug);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post with slug: ${slug} not found.` });
  }
}
