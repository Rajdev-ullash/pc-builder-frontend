import RootLayout from "@/components/Layouts/RootLayout";

import React from "react";
import Product from "./product";

const index = ({ data }) => {
  return (
    <div>
      <h3 className="bg-red-500">Hi i am index page</h3>
      <Product data={data} />
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const data = await fetch("http://localhost:5000/api/products");
  const res = await data.json();
  console.log(res);

  return {
    props: {
      data: res,
    },
  };
};
