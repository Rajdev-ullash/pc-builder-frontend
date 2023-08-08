import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useGetCategoriesQuery } from "@/redux/api/api";

const RootLayout = ({ children }) => {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col min-h-screen bg-[#16161a]">
      <Navbar data={data?.data} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
