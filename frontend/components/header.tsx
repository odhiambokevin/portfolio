'use client'

import Link from 'next/link'
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: "/#portfolio", label: "portfolio", id: "portfolio" },
  { href: "/#skills", label: "skills", id: "skills" },
  { href: "/#experience", label: "experience", id: "experience" },
  { href: "/#projects", label: "projects", id: "projects" },
  { href: "/#blogs", label: "blog", id: "blogs" },
  { href: "/#contact", label: "contact", id: "contact" },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const next = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }, [])
  const toggle = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next) }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}><span>{dark ? <Sun size={15} /> : <Moon size={15} />}</span><small>{dark ? 'light' : 'dark'}</small></button>
}

export function Header() {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const [activeSection, setActiveSection] = useState(pathname.startsWith('/blogs') ? 'blogs' : '')

    useEffect(() => {
    if (pathname.startsWith('/blogs')) {
      setActiveSection('blogs')
      return
    }
    const sections = navLinks.map(({ id }) => document.querySelector(`#${id}`)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) setActiveSection(visible.target.id)
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0, .2, .5, .8] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  const navigationHref = (href: string) => href
  const isActive = (id: string) => pathname.startsWith('/blogs') ? id === 'blogs' : activeSection === id
  const handleNavigation = (id: string) => {
    setActiveSection(id)
    closeMenu()
  }

  const closeMenu = () => {
    setMenuClosing(true)
    window.setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, 240)
  }
  

  return (
  <header className="site-header">
    <Link className="brand" href="/#top" aria-label="website home"><span className='text-5xl'>kevin<span className="accent">.</span></span></Link>
    <nav className="nav-links" aria-label="Primary navigation">{navLinks.map((link, index) => <Link className={isActive(link.id) ? 'active' : ''} href={navigationHref(link.href)} onClick={() => handleNavigation(link.id)} key={index} >{link.label}</Link>)}</nav>
    <div className="header-actions"><ThemeToggle /><button className="menu-trigger" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={menuOpen ? closeMenu : () => setMenuOpen(true)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
    {(menuOpen || menuClosing) && <><button className={`menu-backdrop ${menuClosing ? 'is-closing' : ''}`} type="button" aria-label="Close navigation menu" onClick={closeMenu} /><aside className={`mobile-drawer ${menuClosing ? 'is-closing' : ''}`} aria-label="Mobile navigation"><div className="drawer-heading"><span>navigate</span></div><nav>{navLinks.map((link, index) => <a href={link.href} key={index} onClick={closeMenu}>{link.label}<ArrowUpRight size={16} /></a>)}</nav></aside></>}
  </header>
  )
}

export { ThemeToggle }
