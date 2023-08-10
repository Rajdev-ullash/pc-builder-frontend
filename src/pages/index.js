import RootLayout from "@/components/Layouts/RootLayout";

import React from "react";
import Product from "./product";
import HeroSection from "@/components/HeroSection";

const index = ({ data }) => {
  return (
    <div>
      <HeroSection />
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
