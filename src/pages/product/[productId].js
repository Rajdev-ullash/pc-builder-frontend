import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";
import { Row, Col, Image } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const ProductDetails = ({ product }) => {
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-auto"
            />
          </div>
          <div>
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">
                {product?.name}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                {product?.category?.name}
              </p>
              <p className="text-sm mb-2 text-white">
                {product?.status ? "In Stock" : "Out of stock"}
              </p>
              <p className="text-2xl font-bold mb-4 text-white">
                ${product?.price}
              </p>

              <Tabs defaultActiveKey="description">
                <TabPane tab="Description" key="description">
                  <p className="text-sm mb-4 text-white">
                    {product?.description}
                  </p>
                </TabPane>
                <TabPane tab="Key Features" key="features">
                  <ul className="list-disc ml-6 text-white">
                    {product?.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabPane>
                <TabPane tab="Reviews" key="reviews">
                  <div className="mb-4">
                    <p className="text-lg font-bold mb-2 text-white">
                      Individual Rating: {product?.individualRating} Stars
                    </p>
                    <p className="text-lg font-bold mb-2 text-white">
                      Average Rating: {product?.averageRating} Stars
                    </p>
                    {product?.reviews.map((review, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm text-white">{review}</p>
                      </div>
                    ))}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  const paths = products?.data.map((product) => ({
    params: { productId: product._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { productId } = params;

  const res = await fetch(`http://localhost:5000/api/products/${productId}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
