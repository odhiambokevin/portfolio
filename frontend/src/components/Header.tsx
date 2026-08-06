'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const navLinks = [
    { href: "/#home", label: "home", id: "home" },
    { href: "/#portfolio", label: "portfolio", id: "portfolio" },
    { href: "/#skill", label: "skills", id: "skill" },
    { href: "/#experience", label: "experience", id: "experience" },
    { href: "/#projects", label: "projects", id: "projects" },
    { href: "/#blog", label: "blog", id: "blog" },
    { href: "/#contact", label: "contact", id: "contact" },
  ]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handlenav = () => { setMobileMenuOpen(!mobileMenuOpen) }
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map(link => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top of the viewport among those currently intersecting
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // trigger when a section is within this band of the viewport,
        // roughly accounting for the sticky header height
        rootMargin: "-72px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
                  <Link
                    key={index}
                    className={`${activeId === link.id ? 'text-accent' : ''} hover:text-accent transition-colors duration-200`}
                    href={link.href}
                  >
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
        
          <nav className={`${mobileMenuOpen ? "fixed z-2 flex flex-col gap-[24px] top-[72px] left-0 w-full h-screen py-[32px] px-[24px] transition-all duration-300 ease-out bg-background" : "fixed flex flex-col gap-[24px] top-[72px] -left-[100%] h-screen py-[32px] px-[24px] transition-all duration-500 ease-in-out"}`}>
            {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    className={`relative left-[12px] text-[24px] transition-all duration-300 ${activeId === link.id ? 'text-accent' : ''}`}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                      {link.label}
                  </Link>
                  ))}
          </nav>
      </div>
    </header>
  )
  }