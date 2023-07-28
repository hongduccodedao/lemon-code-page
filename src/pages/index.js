import { LayoutMain } from "@/components/layouts";
import { SEO } from "@/components/seo";

export default function Home() {
  return (
    <>
      <SEO title="Lemon Code" description="Lemon Code" />
      <main>
        <LayoutMain>
          <h1>Home</h1>
        </LayoutMain>
      </main>
    </>
  );
}
