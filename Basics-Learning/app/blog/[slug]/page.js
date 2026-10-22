import React from "react";

//? configuring Dynamic Routes & using route params
const page = ({params}) => {
  return (
    <main>
      <h1>Welcome to the Blog Page</h1>
      <p>Slug: {params.slug}</p>
    </main>
  );
};

export default page;
