import Head from "next/head";
import React from "react";

const SEO = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default SEO;
