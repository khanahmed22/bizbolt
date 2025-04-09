"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, X, Sparkles, Zap, Globe, PenTool, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function PricingPage() {

  const router = useRouter()
  const [annual, setAnnual] = useState(true)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-20">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            Select the perfect plan to power your business with our suite of AI-powered tools
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 inline-flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                annual
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              Annual <span className="text-green-500 font-medium">Save 20%</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Free Tier */}
          <motion.div
            variants={fadeIn}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg mr-3">
                  <Zap className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Free</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">$0</span>
                <span className="text-neutral-500 dark:text-neutral-400 ml-1">/month</span>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Perfect for trying out our tools</p>
              </div>

              <Button className="cursor-pointer w-full mb-6" onClick={()=>router.push('/sign-up')}>Get Started</Button>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white">INCLUDES:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">5 domain availability checks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">5 business name generations</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">5 logo generations</span>
                  </div>
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500 dark:text-neutral-500">No download of high-res logos</span>
                  </div>
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500 dark:text-neutral-500">No WHOIS data access</span>
                  </div>
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500 dark:text-neutral-500">No bulk operations</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Starter Tier */}
          <motion.div
            variants={fadeIn}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-400"></div>
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg mr-3">
                  <Briefcase className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Starter</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                  ${annual ? "9.99" : "12.99"}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 ml-1">/month</span>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Great for small businesses and startups</p>
              </div>

              <Button className="cursor-pointer w-full mb-6 bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                Start 7-Day Free Trial
              </Button>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white">INCLUDES:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">50 domain availability checks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">50 business name generations</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">50 logo generations</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Download high-res logos</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Basic WHOIS data access</span>
                  </div>
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500 dark:text-neutral-500">No bulk operations</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            variants={fadeIn}
            className="relative bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-600 to-neutral-800 dark:from-neutral-400 dark:to-neutral-200"></div>
            <div className="absolute -top-6 -right-6">
              <div className="bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12">
                MOST POPULAR
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg mr-3">
                  <Sparkles className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Pro</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                  ${annual ? "19.99" : "24.99"}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 ml-1">/month</span>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">For power users and growing businesses</p>
              </div>

              <Button className="cursor-pointer w-full mb-6 bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                Start 7-Day Free Trial
              </Button>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white">INCLUDES:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      <strong>Unlimited</strong> domain availability checks
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      <strong>Unlimited</strong> business name generations
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      <strong>Unlimited</strong> logo generations
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      Download high-res logos in multiple formats
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Complete WHOIS data access</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Bulk operations (up to 100 at once)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Priority support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            Everything You Need to Launch Your Business
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg inline-block mb-4">
                <Globe className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">Domain Checker</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Instantly check domain availability across multiple TLDs and get detailed WHOIS information.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg inline-block mb-4">
                <PenTool className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">Logo Generator</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Create professional, custom logos for your business with our AI-powered design engine.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg inline-block mb-4">
                <Briefcase className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">Name Generator</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Discover the perfect business name with our AI-powered name generator that creates memorable brand
                names.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                Can I upgrade or downgrade my plan at any time?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately, and your
                billing will be prorated accordingly.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                Do you offer refunds if I&apos;m not satisfied?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                We offer a 7-day money-back guarantee for all paid plans. If you&apos;re not satisfied with our service, you
                can request a full refund within 7 days of your purchase.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                What happens when I reach my usage limit?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                When you reach your usage limit, you&apos;ll be prompted to upgrade to a higher tier to continue using the
                service. Your existing data and settings will remain intact.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that use our tools to launch and grow their brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="cursor-pointer bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900"
            >
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="cursor-pointer">
              View Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
