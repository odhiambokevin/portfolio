import Link from "next/link";
import {FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex bottom-2 mb-2 w-full justify-center items-center px-6 gap-[30px] h-[20px] text-gray-400 text-[15px]">
    
      <Link href="#" className="relative group hover:text-slate-600"><FaFacebook />
        <span className="absolute -top-[6px] left-0 w-full h-[2px] bg-pink-900 scale-x-0 group-hover:scale-x-100 origin-center transition-all duration-100 ease-in "></span>
      </Link>

      <Link href="#" target="_blank" className="relative group hover:text-slate-600"><FaInstagram />
        <span className="absolute -top-[6px] left-0 w-full h-[2px] bg-pink-900 scale-x-0 group-hover:scale-x-100 origin-center transition-all duration-100 ease-in "></span>
      </Link>

      <Link href="#" className="relative group hover:text-slate-600"><FaTwitter />
        <span className="absolute -top-[6px] left-0 w-full h-[2px] bg-pink-900 scale-x-0 group-hover:scale-x-100 origin-center transition-all duration-100 ease-in "></span>
      </Link>
    </div>
  )
}