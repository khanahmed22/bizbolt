"use client"

import { motion } from "framer-motion"
import { Zap, Target, Sparkles, Globe, Clock, Shield } from "lucide-react"

export default function WhyChooseBizBolt() {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast Results",
      description: "Generate dozens of creative name ideas in seconds with our AI-powered engine.",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Industry-Specific",
      description: "Get names tailored to your specific industry with contextual understanding.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Creative Excellence",
      description: "Our AI combines linguistics, psychology, and branding principles for memorable names.",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Domain Availability",
      description: "Instantly check if domains are available for your favorite name options.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Save Valuable Time",
      description: "Skip weeks of brainstorming and focus on building your business instead.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Brand Protection",
      description: "Get names that stand out and have potential for trademark protection.",
    },
  ]

  // Animation variants
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
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
            Why Choose BizBolt
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Our AI-powered platform delivers exceptional business name generation with features designed to give your
            brand the perfect start.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/80 dark:bg-black/50 rounded-xl p-6 shadow-lg border border-neutral-200/80 dark:border-neutral-800/80 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-neutral-800 dark:text-neutral-200">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-500 rounded-full blur opacity-30"></div>
            <span className="relative block px-4 py-2 bg-white dark:bg-black rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
              Join over 10,000+ businesses who found their brand identity with BizBolt
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
