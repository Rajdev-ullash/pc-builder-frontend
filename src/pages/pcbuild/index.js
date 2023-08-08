import RootLayout from "@/components/Layouts/RootLayout";
import React, { useState } from "react";
import { Card, Button, Form, Input, Select, Divider } from "antd";
import Link from "next/link";

const { Option } = Select;
const index = ({ data }) => {
  // Add other state variables for other PC components

  const handleSubmit = (values) => {
    // Handle form submission and PC configuration here
  };
  return (
    <div className="px-[350px] pt-10 pb-5">
      <div className="bg-white">
        <h3 className="text-center pb-3 pt-3">hello</h3>
        {data?.data.map((item, index) => (
          <div key={index}>
            <Card className="w-full mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Use item's properties for rendering */}
                <h3 className="text-lg md:text-xl">{item?.name}</h3>
                <Link href={`/pcbuild/${item?._id}`} passHref>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                    Choose
                  </button>
                </Link>
              </div>
            </Card>
            {/* {index < data.data.length - 1 && <Divider />}{" "} */}
            {/* Add Divider except for the last card */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/api/categories");
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
