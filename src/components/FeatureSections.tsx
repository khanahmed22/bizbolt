'use client'
import { Sparkles, Globe, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
export const FeatureSection = () => {
  const features = [
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "Name Generator",
      description:
        "Create memorable business names with our AI-powered generator",
      link: "/nameGen",
    },
    {
      icon: <PenTool className="h-4 w-4" />,
      title: "Logo Generator",
      description: "Design stunning logos that represent your brand identity",
      link: "/logoGen",
    },
    {
      icon: <Globe className="h-4 w-4" />,
      title: "Domain Checker",
      description: "Check domain availability for your business name",
      link: "/checkDomain",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="p-4 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="backdrop-blur-lg bg-white/70 dark:bg-black/50 rounded-2xl p-5 shadow-xl border border-neutral-200 dark:border-neutral-800"
          >
            <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-3">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              {feature.description}
            </p>
            <Link href={feature.link}>
              <Button
                variant="ghost"
                className="p-0 h-auto text-xs text-neutral-900 dark:text-white hover:bg-transparent hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                <span className="text-sm font-bold cursor-pointer">Try it now</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="ml-1 inline-block"
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
