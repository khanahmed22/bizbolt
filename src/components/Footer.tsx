"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Name Generator", href: "/nameGen" },
        { name: "Logo Generator", href: "/logoGen" },
        { name: "Domain Checker", href: "/checkDomain" },
        { name: "Brand Kit", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Github size={16} />, href: "#", label: "GitHub" },
    { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
    { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
    { icon: <Mail size={16} />, href: "#", label: "Email" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          <motion.div variants={itemVariants} className="col-span-2">
            <Link href="/" className="inline-block mb-3">
              <h2 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400">
                BrandCraft
              </h2>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              All-in-one platform for creating and managing your brand identity. Generate names, design logos, and check
              domain availability.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-3">
              <h3 className="text-xs font-medium text-neutral-900 dark:text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-xs"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-neutral-500 dark:text-neutral-500 text-xs">
            © {currentYear} BrandCraft. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="h-0.5 bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-500 rounded-full mb-3 md:hidden"
            />
            <p className="text-neutral-500 dark:text-neutral-500 text-xs">
              Designed with ♥ for creators and entrepreneurs
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
