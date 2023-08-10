import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-blue-900 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        {" "}
        {/* Changed: Added justify-center */}
        <div className="md:w-1/2 text-center mb-8 md:mb-0">
          {" "}
          {/* Added: text-center */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Build Your Dream PC
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Create a custom PC that fits your needs and preferences.
          </p>
          <Link
            href="/build"
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold py-2 px-6 rounded-full text-lg transition duration-300"
          >
            {/* Changed: Wrapped Link component */}
            Start Building
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="mx-auto">
            <Image
              src="https://www.cloud.ryanscomputers.com/cdn/sliders/Microsoft-Surface-Laptop-Studio-Intel-Core-i5-Slider_1691297362.webp"
              alt="PC Builder"
              width={750}
              height={450}
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
