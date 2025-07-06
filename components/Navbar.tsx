import Image from "next/image";
import NavbarItem from "./Navbaritem";
import { FaChevronDown } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";
import { useState,useCallback, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET=66;

export default function Navbar() {
    const [showMobileMenu,setShowMobileMenu]=useState(false)
    const toggleMobileMenu=useCallback(()=>{
        setShowMobileMenu((current)=> !current)
    },[])

    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const toggleAccountMenu = useCallback(() => {
      setShowAccountMenu((current) => !current);
    }, []);

    const [showBackGround,setShowBackground]=useState(false)
    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>=TOP_OFFSET)
            {
                setShowBackground(true)
            }
            else
            { setShowBackground(false)
            }
        }

    
    window.addEventListener('scroll',handleScroll);
     return () => {
        window.removeEventListener('scroll',handleScroll)

     }
     } ,[]);
  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition
       duration-500 ${showBackGround?'bg-zinc-900 bg-opacity-90':''}`}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={28}
          height={28}
          className="h-4 lg:h-7 w-auto"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <FaChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transtion">
            <IoSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transtion">
            <FaBell />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <FaChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
