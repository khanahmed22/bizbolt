"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Name Generator", path: "/nameGen" },
    { name: "Logo Generator", path: "/logoGen" },
    { name: "Domain Checker", path: "/checkDomain" },
    { name: "Pricing", path: "/pricing" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg shadow-sm" : "py-3 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-x-2 text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400"
            >
              <Image src='/bizbolt.svg' width={35} height={35} alt="Logo"/> BizBolt 
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="relative px-3 py-2 rounded-lg">
                  <span
                    className={`relative z-10 text-sm ${
                      pathname === item.path
                        ? "font-medium text-neutral-900 dark:text-white"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  {pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <div className="pl-2 flex gap-x-2 items-center">
              
              <ModeToggle/>
              <SignedOut>
              <Button
                onClick={()=>router.push('/sign-in')}
                variant="outline"
                className="cursor-pointer h-8 px-3 text-sm rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white"
              >
                Sign In
              </Button>
              </SignedOut>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden p-2 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileTap={{ x: 10 }}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    pathname === item.path
                      ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            <Button
              onClick={()=>router.push('/sign-in')}
              variant="outline"
              className="mt-2 w-full justify-center text-sm h-8 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white"
            >
              
              Sign In
            </Button>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  )
}
