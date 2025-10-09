  'use client'
  import Link from "next/link";
  import { useState } from "react";
  import Image from "next/image";
  import { MdShoppingCart } from "react-icons/md";

  export default function Header() {
    const navLinks = [
      {href: "/#home", label: "home"},
      {href: "/#about", label: "about"},
      {href: "/#portfolio", label: "portfolio"},
      {href: "/#skills", label: "skills"},
      {href: "/#maps", label: "maps"},
      {href: "/#contact", label: "contact"},
    ]
    const [menuOpen, setMenuOpen] = useState(false);
    const handlenav = ()=>{setMenuOpen(!menuOpen)}


    return (
      <header className="fixed w-full top-0">
        <div className="flex justify-between items-center py-[12px] min-h-[74px] px-[24px]">
          {/* logo */}
          <Link href="/#home" className="shrink-0">
            <Image src="/images/logo.png" alt="Logo" width={66} height={0} className="object-contain" priority/>
          </Link>

          {/* desktop nav */}
            <nav className="hidden md:flex justify-center items-center">
              {navLinks.map((link, index) => (
                    <Link key={index} className="" href={link.href}>
                        {link.label}
                    </Link>
                    ))}
            </nav>
        

          {/* mobile menu button */}
          <button className="md:hidden cursor-pointer" onClick={handlenav}>
            <div className={`${menuOpen ? 'translate-y-[7px] rotate-45 scale-[.9]' : ''} h-[2px] w-[26px] bg-red-400  transition-all duration-300`}></div>
            <div className={`${menuOpen ? 'opacity-0' : ''} h-[2px] w-[26px] bg-red-400 my-[5px] transition-all duration-300`}></div>
            <div className={`${menuOpen ? 'translate-y-[-7px] -rotate-45 scale-[.9]' : ''} h-[2px] w-[26px] bg-red-400  transition-all duration-300`}></div>
          </button>


          {/* mobile nav */}
          
            <nav className={`${menuOpen ? "fixed flex flex-col gap-[24px] top-[74px] left-0 w-full h-screen py-[32px] px-[24px] transition-all duration-300 ease-out bg-white" : "fixed flex flex-col gap-[24px] top-[74px] -left-[100%] h-screen py-[32px] px-[24px] transition-all duration-500 ease-in-out"}`}>
              {navLinks.map((link, index) => (
                    <Link key={index} className="relative left-[12px] text-[24px] transition-all duration-300" href={link.href}>
                        {link.label}
                    </Link>
                    ))}
            </nav>
        </div>
      </header>
    )
  }