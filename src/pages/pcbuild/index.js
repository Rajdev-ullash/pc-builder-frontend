import RootLayout from "@/components/Layouts/RootLayout";
import React, { useState } from "react";
import { Card, Button, Select, Divider, Modal, message } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { removeOnePcBuild } from "@/redux/features/pcBuild/pcBuildSlice";

const { Option } = Select;
const index = ({ data }) => {
  const info = useSelector((state) => state.pcBuild);
  const totalSum = info?.pcBuild?.reduce(
    (total, item) => total + item.price,
    0
  );
  // Add other state variables for other PC components
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    setConfirmLoading(true);

    // Close the modal by setting the visible state to false
    setOpen(false);
    setConfirmLoading(false);

    // Show a success message using the message object
    message.success({
      content: "Your Pc Build Successfully Complete",
      duration: 3,
      className: "mt-5",
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="px-[350px] pt-10 pb-5">
      <div className="bg-white">
        <h3 className="text-center pb-3 pt-3">Build Your Own PC</h3>
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
              {info?.pcBuild?.map(
                (infoItem, infoIndex) =>
                  // Check if infoItem.category matches item._id
                  infoItem?.category === item?._id && (
                    <div key={infoIndex}>
                      <Card className="w-full mx-auto mt-3">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                          <div className="img-holder mb-4 md:mb-0 md:mr-4">
                            <Link href="">
                              <Image
                                src={infoItem?.image}
                                alt={infoItem?.name}
                                width={50}
                                height={50}
                              />
                            </Link>
                          </div>

                          <div className="product-info flex-grow">
                            <div className="product-content-block">
                              <h4 className="product-name text-blue-500 hover:underline mb-2 md:mb-4">
                                <Link
                                  href={`/product/${infoItem?._id}`}
                                  className=""
                                >
                                  {infoItem?.name}
                                </Link>
                              </h4>
                            </div>
                            <div className="product-price-block">
                              <div className="product-price">
                                <span className="price text-base">
                                  ৳ {infoItem.price}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="product-add-cart mt-2">
                            <Button
                              type="primary"
                              onClick={() =>
                                dispatch(removeOnePcBuild(item?._id))
                              }
                              className="btn btn-danger btn-cart"
                            >
                              <span>Remove</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
              )}
            </Card>
          </div>
        ))}

        {info?.pcBuild?.length > 0 ? (
          <div className="flex justify-center mt-5">
            <Button
              type="primary"
              className="btn btn-primary btn-cart mb-2"
              onClick={showModal}
            >
              <span>Complete Build</span>
            </Button>
            <Modal
              title="Title"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {info?.pcBuild?.map((item, index) => (
                <div key={index}>
                  <div className="mx-1 mt-1">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="img-holder mb-4 md:mb-0 md:mr-4">
                        <Link href="">
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={40}
                            height={40}
                          />
                        </Link>
                      </div>

                      <div className="product-info flex-grow">
                        <div className="product-content-block">
                          <h4 className="product-name text-blue-500 hover:underline mb-1 md:mb-2">
                            <Link href={`/product/${item?._id}`} className="">
                              {item?.name}
                            </Link>
                          </h4>
                        </div>
                        <div className="product-price-block">
                          <div className="product-price">
                            <span className="price text-base">
                              ৳ {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}

              <div className="flex justify-end">
                <p className="text-base md:text-xl">Total: {totalSum}</p>
              </div>
            </Modal>
          </div>
        ) : (
          <div className="flex justify-center mt-5">
            <Button
              type="primary"
              className="btn btn-primary btn-cart mb-2"
              disabled
            >
              <span>Complete Build</span>
            </Button>
          </div>
        )}
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
