import Head from "next/head";
import React from "react";

const SEO = ({ title, description, image }) => {
  return (
    <Head>
      <title>{`${title} | Lemon Code🍋`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Lemon Code🍋`} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={`${title} | Lemon Code🍋`} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default SEO;
