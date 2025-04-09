"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Search, Loader2, Lock, Sparkles } from "lucide-react"

export default function DomainChecker() {
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState<number>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("domainCheckCount")
      // If there's a saved count, use it; otherwise start with 5
      return savedCount !== null ? Number.parseInt(savedCount, 10) : 5
    }
    // Default to 5 for server-side rendering
    return 5
  })
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false)

  // Save count to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("domainCheckCount", count.toString())
    }
  }, [count])

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!domain) {
      setError("Please enter a domain name")
      return
    }

    if (count === 0) {
      setShowUpgradeModal(true)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Decrement the count before making the API call
      setCount((c) => c - 1)

      const response = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`)

      if (!response.ok) {
        throw new Error("Failed to check domain availability")
      }

      const data = await response.json()
      setResult(data)
    } catch (err:unknown | any) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
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
  const title = "Domain Availability Checker"

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="relative z-10 container max-w-2xl mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
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
            className="text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto"
          >
            Check if your desired domain name is available for registration
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-lg bg-white/70 dark:bg-black/50 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-800"
        >
          <motion.form variants={itemVariants} onSubmit={checkDomain} className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="domain" className="text-sm font-medium block text-neutral-800 dark:text-neutral-200">
                Enter a domain name:
              </label>
              <div className="relative">
                <Input
                  name="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  id="domain"
                  placeholder="e.g., example.com, mydomain.io, brandname.co"
                  className="w-full bg-white/90 dark:bg-black/60 border-neutral-300 dark:border-neutral-700 h-12 px-4 rounded-xl focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: domain ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-400 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <Button
                  type="submit"
                  className="cursor-pointer relative w-full h-12 rounded-xl font-medium text-base text-neutral-800 dark:text-white bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 border border-neutral-300 dark:border-neutral-700"
                  disabled={loading || !domain.trim()}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </span>
                  ) : count === 0 ? (
                    <span className="flex items-center justify-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Check More
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Search className="mr-2 h-4 w-4" />
                      Check Domain Availability
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
                  You have <span className="font-semibold">{count}</span> free {count === 1 ? "check" : "checks"}{" "}
                  remaining
                </span>
              ) : (
                <span className="text-neutral-400 dark:text-neutral-500">No checks remaining</span>
              )}
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-5 rounded-xl bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
            >
              <div className="flex items-start">
                <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              <div
                className={`p-5 rounded-xl border ${
                  result.DomainInfo?.domainAvailability === "AVAILABLE"
                    ? "bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                    : "bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                }`}
              >
                <div className="flex items-start">
                  {result.DomainInfo?.domainAvailability === "AVAILABLE" ? (
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium text-lg">{result.DomainInfo?.domainName}</h3>
                    <p className="mt-1">
                      {result.DomainInfo?.domainAvailability === "AVAILABLE"
                        ? "This domain is available for registration!"
                        : "This domain is already registered."}
                    </p>
                  </div>
                </div>
              </div>

              {result.DomainInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                >
                  <h2 className="font-medium mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 text-xs mr-2"
                    >
                      ℹ
                    </motion.span>
                    Domain Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.DomainInfo).map(([key, value]: [string, any], index) => {
                      // Skip rendering if value is null or empty
                      if (value === null || value === "") return null

                      // Format dates
                      let displayValue = value
                      if (key === "creationDate" || key === "expirationDate") {
                        displayValue = new Date(value).toLocaleDateString()
                      }

                      // Format key for display
                      const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

                      return (
                        <motion.div
                          key={key}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                          className="py-1"
                        >
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">{formattedKey}:</div>
                          <div className="font-medium text-neutral-800 dark:text-neutral-200">{displayValue}</div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-500"
          >
            Powered by WhoisXMLAPI Domain Availability API
          </motion.div>
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
                    Unlimited domain checks, WHOIS data, and more
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full md:w-auto bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900"
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
                Unlock unlimited domain checks and premium features
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Unlimited domain availability checks</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Complete WHOIS data access</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Domain monitoring and alerts</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-700 dark:text-neutral-300">Bulk domain checking (up to 100 at once)</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                Upgrade for $7.99/month
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowUpgradeModal(false)}>
                Maybe Later
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
