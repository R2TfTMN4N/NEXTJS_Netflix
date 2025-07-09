import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import useBillboard from "@/hooks/useBillboard";
import PlayButton from "./PlayButton";
const BillBoard = () => {
    const {data} = useBillboard();
    return (
      <div className="relative h-[56.25vw] w-full bg-cover bg-no-repeat bg-center">
        <video
          src={data?.videoUrl}
          poster={data?.thumbnailUrl}
          autoPlay
          muted
          loop
          className="h-[56.25vw] w-full object-cover brightness-[60%]"
        />

        <div className="absolute top-[50%] left-0 ml-10 md:ml-16">
          <p className="text-white text-2xl md:text-4xl font-bold">
            {data?.title}
          </p>
          <p className="text-white text-sm md:text-lg mt-2 w-[90%] md:w-[50%]">
            {data?.description}
          </p>
          <div className="flex flex-row items-center mt-3 gap-3 md:gap-5 md:mt-4">
              <PlayButton movieId={data?.id}/>          
            <button className="bg-white text-white bg-opacity-30
            rounded-md py-1 md:py-2 px-2 md:px-4
            w-auto text-xs lg:text-lg font-semibold
            flex flex-row transition items-center hover:bg-opacity-20">
              <IoMdInformationCircleOutline className="mr-1" />
              More Info
            </button>
          </div>
        </div>
      </div>
    );
}
export default BillBoard;