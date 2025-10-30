  'use client'
  import Link from "next/link";
  import { useState } from "react";
  import Image from "next/image";

  export default function Header() {
    const navLinks = [
      {href: "/#home", label: "home"},
      {href: "/#portfolio", label: "portfolio"},
      {href: "/#skill", label: "skills"},
      {href: "/#experience", label: "experience"},
      {href: "/#map", label: "maps"},
      {href: "/#blog", label: "blog"},
      {href: "/#contact", label: "contact"},
    ]
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handlenav = ()=>{setMobileMenuOpen(!mobileMenuOpen)}

  return (
    <header className="sticky top-0 z-2 bg-background">
      <div className="flex justify-between items-center py-[12px] px-[24px]">
        {/* logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={100} height={0} className="object-contain" priority/><span className="-ml-[25px] text-[40px]">evin<span className="text-accent">.</span></span>
        </Link>

        {/* desktop nav */}
          <nav className="hidden md:flex gap-2 justify-center items-center scroll-smooth">
            {navLinks.map((link, index) => (
                  <Link key={index} className="" href={link.href}>
                      {link.label}
                  </Link>
                  ))}
          </nav>
      

        {/* mobile menu button */}
        <button className="md:hidden cursor-pointer" onClick={handlenav}>
          <div className={`${mobileMenuOpen ? 'translate-y-[7px] rotate-45 scale-[.9]' : ''} h-[2px] w-[26px] bg-accent  transition-all duration-300`}></div>
          <div className={`${mobileMenuOpen ? 'opacity-0' : ''} h-[2px] w-[26px] bg-accent my-[5px] transition-all duration-300`}></div>
          <div className={`${mobileMenuOpen ? 'translate-y-[-7px] -rotate-45 scale-[.9]' : ''} h-[2px] w-[26px] bg-accent  transition-all duration-300`}></div>
        </button>


        {/* mobile nav */}
        
          <nav className={`${mobileMenuOpen ? "fixed z-2 flex flex-col gap-[24px] top-[72px] left-0 w-full h-screen py-[32px] px-[24px] transition-all duration-300 ease-out bg-white" : "fixed flex flex-col gap-[24px] top-[72px] -left-[100%] h-screen py-[32px] px-[24px] transition-all duration-500 ease-in-out"}`}>
            {navLinks.map((link, index) => (
                  <Link key={index} className="relative left-[12px] text-[24px] transition-all duration-300" href={link.href} onClick={()=>setMobileMenuOpen(false)}>
                      {link.label}
                  </Link>
                  ))}
          </nav>
      </div>
    </header>
  )
  }