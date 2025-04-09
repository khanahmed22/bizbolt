"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCompletion } from "@ai-sdk/react"
import { useState, useEffect } from "react"
import { Copy, CheckCircle, Sparkles, Lock } from "lucide-react"
import { toast } from "sonner"

export default function NameGen() {
  const [userInput, setUserInput] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [count, setCount] = useState<number>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("nameGenCount")
      // If there's a saved count, use it; otherwise start with 5
      return savedCount !== null ? Number.parseInt(savedCount, 10) : 5
    }
    // Default to 5 for server-side rendering
    return 5
  })
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/nameGen",
  })

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem("nameGenCount", count.toString())
    }
  }, [count])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (count === 0) {
      setShowUpgradeModal(true)
      return
    }

    setCount((c) => c - 1)

    if (userInput.trim()) {
      await complete(userInput)
      setCopiedIndex(null) // Reset copied state when generating new names
    }
  }

  const handleCopy = (text: string, index: number) => {
    // Extract just the name part if the line contains additional text
    const nameMatch = text.match(/^(\d+\.\s*)?([^:]+?)(\s*-\s*.+)?$/)
    const nameToCopy = nameMatch ? nameMatch[2].trim() : text.trim()

    navigator.clipboard
      .writeText(nameToCopy)
      .then(() => {
        setCopiedIndex(index)

        // Use Sonner toast
        toast.success("Copied to clipboard", {
          description: `"${nameToCopy}" has been copied to your clipboard.`,
          duration: 2000,
        })

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedIndex(null)
        }, 2000)
      })
      .catch((err) => {
        toast.error("Failed to copy", {
          description: "Could not copy text to clipboard.",
        })
        console.error("Copy failed: ", err)
      })
  }

  // Animation variants for staggered animations
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

  // Animate title text letter by letter
  const title = "Business Name Generator"

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="relative z-10 container max-w-xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="inline-block text-transparent bg-clip-text 
                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                        dark:from-white dark:to-white/80"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto"
          >
            Transform your business concept into a memorable brand name with our AI-powered generator
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-lg bg-white/70 dark:bg-black/50 rounded-xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-800"
        >
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="input" className="text-sm font-medium block text-neutral-800 dark:text-neutral-200">
                Enter a business concept or industry:
              </label>
              <div className="relative">
                <Input
                  name="prompt"
                  value={userInput}
                  onChange={handleChange}
                  id="input"
                  placeholder="e.g., Tech consulting, Organic bakery, Fitness app"
                  className="w-full bg-white/90 dark:bg-black/60 border-neutral-300 dark:border-neutral-700 h-10 text-sm px-3 rounded-lg focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: userInput ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-400 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <Button
                  type="submit"
                  className="cursor-pointer relative w-full h-10 text-sm rounded-lg font-medium text-neutral-800 dark:text-white bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 border border-neutral-300 dark:border-neutral-700"
                  disabled={isLoading || !userInput.trim()}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-3 w-3 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </span>
                  ) : count === 0 ? (
                    <span className="flex items-center justify-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Generate More
                    </span>
                  ) : (
                    <span className="flex items-center justify-center cursor-pointer">
                      Generate Name Suggestions
                      <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
                        →
                      </motion.span>
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.form>

          {/* Usage counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 flex justify-center"
          >
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {count > 0 ? (
                <span>
                  You have <span className="font-semibold">{count}</span> free{" "}
                  {count === 1 ? "generation" : "generations"} remaining
                </span>
              ) : (
                <span className="text-neutral-400 dark:text-neutral-500">No generations remaining</span>
              )}
            </div>
          </motion.div>

          {completion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
            >
              <h2 className="text-sm font-medium mb-2 text-neutral-800 dark:text-neutral-200 flex items-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 text-sm mr-2"
                >
                  ✓
                </motion.span>
                Name Suggestions
              </h2>
              <motion.div
                className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {completion.split("\n").map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="py-1"
                  >
                    <div className="flex justify-between items-center group">
                      <div className="flex-1">{line}</div>
                      <button
                        onClick={() => handleCopy(line, index)}
                        className="cursor-pointer ml-2 p-1.5 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="cursor-pointer h-4 w-4 opacity-70 group-hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Upgrade Banner */}
        {count === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-md"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="mr-4 bg-white dark:bg-black p-2 rounded-full">
                  <Sparkles className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 dark:text-neutral-200">Upgrade to Pro</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Unlimited name generations, premium suggestions, and more
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowUpgradeModal(true)}
                className="cursor-pointer w-full md:w-auto bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900"
              >
                Upgrade Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-neutral-200 dark:border-neutral-800"
          >
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Upgrade to Pro</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Unlock unlimited name generations and premium features
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Unlimited name generations</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Premium AI-powered suggestions</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Domain availability checker</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Save and export your favorite names</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="cursor-pointer w-full bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                Upgrade for $9.99/month
              </Button>
              <Button variant="outline" className="w-full cursor-pointer"  onClick={() => setShowUpgradeModal(false)}>
                Maybe Later
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
