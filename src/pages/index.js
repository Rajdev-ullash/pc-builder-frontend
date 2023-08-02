import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";

const index = () => {
  return (
    <div>
      <h3 className="bg-red-500">Hi i am index page</h3>
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
