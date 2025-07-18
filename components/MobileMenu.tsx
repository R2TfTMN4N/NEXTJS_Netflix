import React from "react";
interface MobileMenuProps{
    visible?: boolean
}
export default function MobileMenu({visible}:MobileMenuProps)
    {
        if(!visible) return null
        return (
          <div className="bg-black flex w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-300">
            <div className="flex flex-col gap-4 ">
              <div className="px3 text-center text-white hover:underline">
                Home
              </div>
              <div className="px3 text-center text-white hover:underline">
                Series
              </div>
              <div className="px3 text-center text-white hover:underline">
                Films
              </div>
              <div className="px3 text-center text-white hover:underline">
                New & Popular
              </div>
              <div className="px3 text-center text-white hover:underline">
                My List
              </div>
              <div className="px3 text-center text-white hover:underline">
                Browse by Languages
              </div>
            </div>
          </div>
        );

    }