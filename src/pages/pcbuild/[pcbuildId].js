import RootLayout from "@/components/Layouts/RootLayout";
import { pcBuildRequest } from "@/redux/features/pcBuild/pcBuildSlice";
import { Button, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
const pcBuildDetails = ({ data }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const add = (data) => {
    dispatch(pcBuildRequest(data));
    //back to previous route with next route
    router.back();
  };
  return (
    <div className="container mx-auto p-4">
      {data?.data.map((item, index) => (
        <Card key={index} className="mx-10 mb-5">
          <div className="flex flex-col md:flex-row items-center justify-center px-40">
            <div className="img-holder mb-4 md:mb-0 md:mr-4">
              <Link href="">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={228}
                  height={228}
                />
              </Link>
            </div>
            <div className="product-info flex-grow">
              <div className="product-content-block">
                <h4 className="product-name text-blue-500 hover:underline mb-2 md:mb-4">
                  <Link href={`/product/${item?._id}`} className="">
                    {item?.name}
                  </Link>
                </h4>
                <div className="short-description">
                  <ul className="list-disc pl-6">
                    {item?.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="product-price-block">
              <div className="product-price">
                <span className="price text-base">৳ {item.price}</span>
              </div>
              <div className="product-add-cart mt-2">
                <Button
                  type="primary"
                  onClick={() => add(item)}
                  className="btn btn-primary btn-cart"
                >
                  <span>Add</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default pcBuildDetails;

pcBuildDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `http://localhost:5000/api/categories/${params.pcbuildId}`
  );
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      data: data,
    },
  };
};
