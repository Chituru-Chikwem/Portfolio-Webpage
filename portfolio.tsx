// Please rename this file from `portfolio.html` to `portfolio.tsx` and place it in your Next.js `app` or `pages` directory.
// The following is valid React/Next.js code, not HTML. Remove any `<html>`, `<body>`, or similar tags if present.
// No changes to the code block itself are needed here, just ensure the file is `.tsx` and not `.html`.

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  Mail,
  Phone,
  Linkedin,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  MapPin,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Project {
  id: string
  title: string
  company: string
  category: string
  image: string
  description: string
  metrics: { value: string; label: string }[]
  tags: string[]
  details: {
    challenge: string
    solution: string
    results: string[]
    timeline: string
    location: string
    testimonial?: string
    testimonialAuthor?: string
  }
}

const projects: Project[] = [
  {
    id: "techstart",
    title: "TechStart Solutions",
    company: "B2B SaaS • Series A",
    category: "Strategy & Sales",
    image: "/images/techstart-office.png",
    description:
      "Transformed a promising tech startup's go-to-market strategy, implementing systematic sales processes and strategic partnerships that resulted in £350K+ in closed deals within 12 months.",
    metrics: [
      { value: "350K+", label: "Revenue Generated" },
      { value: "40%", label: "Conversion Rate Increase" },
    ],
    tags: ["Sales Operations", "Strategic Planning", "Process Optimization"],
    details: {
      challenge:
        "TechStart Solutions had a great product but struggled with inconsistent sales processes and low conversion rates. They needed a systematic approach to scale their B2B sales operations.",
      solution:
        "I developed a comprehensive sales operations framework including lead qualification processes, CRM optimization, sales team training, and strategic partnership development. We implemented data-driven decision making and created scalable systems for sustainable growth.",
      results: [
        "Generated £350K+ in new revenue within 12 months",
        "Increased conversion rates by 40%",
        "Established 8 strategic partnerships",
        "Reduced sales cycle time by 25%",
        "Built a scalable sales operations framework",
      ],
      timeline: "12 months",
      location: "London, UK",
      testimonial:
        "Sarah's strategic guidance helped us close £350K+ in B2B sales within our first year. Her approach to building genuine relationships transformed how we think about growth.",
      testimonialAuthor: "James Davidson, Founder",
    },
  },
  {
    id: "greentech",
    title: "GreenTech Innovations",
    company: "CleanTech • Seed Stage",
    category: "Strategy",
    image: "/images/greentech-solar.png",
    description:
      "Developed comprehensive business strategy and operational framework for a climate-tech startup, establishing market positioning, funding strategy, and scalable systems for sustainable growth.",
    metrics: [
      { value: "£2M", label: "Seed Funding Raised" },
      { value: "3x", label: "Team Growth" },
    ],
    tags: ["Business Strategy", "Funding Strategy", "Market Positioning"],
    details: {
      challenge:
        "GreenTech Innovations had innovative clean energy technology but lacked clear market positioning and a viable path to funding. They needed strategic direction to scale their impact.",
      solution:
        "I created a comprehensive business strategy including market analysis, competitive positioning, funding roadmap, and operational framework. We developed investor materials and established key industry partnerships.",
      results: [
        "Successfully raised £2M in seed funding",
        "Grew team from 5 to 15 employees",
        "Established partnerships with 3 major energy companies",
        "Achieved product-market fit validation",
        "Created 5-year strategic roadmap",
      ],
      timeline: "8 months",
      location: "Edinburgh, UK",
    },
  },
  {
    id: "jci",
    title: "JCI Regional Chapter",
    company: "Non-Profit • Community Building",
    category: "Community",
    image: "/images/jci-community.png",
    description:
      "Led the strategic launch of a new JCI chapter, developing community engagement frameworks, operational systems, and leadership development programs that exceeded membership targets by 150%.",
    metrics: [
      { value: "200+", label: "Active Members" },
      { value: "150%", label: "Target Exceeded" },
    ],
    tags: ["Community Building", "Event Management", "Leadership Development"],
    details: {
      challenge:
        "The region needed a new JCI chapter to serve young professionals, but launching required building community from scratch and establishing sustainable operational systems.",
      solution:
        "I developed a comprehensive launch strategy including community outreach, event programming, leadership development frameworks, and sustainable operational systems. We focused on creating genuine value for members.",
      results: [
        "Launched chapter with 200+ active members",
        "Exceeded membership targets by 150%",
        "Organized 24 professional development events",
        "Established 5 community partnerships",
        "Created sustainable leadership pipeline",
      ],
      timeline: "18 months",
      location: "Manchester, UK",
      testimonial:
        "The JCI chapter launch exceeded all expectations. Sarah's community-building expertise and operational systems made what seemed impossible feel effortless.",
      testimonialAuthor: "Maria Rodriguez, Regional Director",
    },
  },
  {
    id: "medflow",
    title: "MedFlow Systems",
    company: "HealthTech • Series B",
    category: "Operations",
    image: "/images/healthtech-medical.png",
    description:
      "Restructured operations and growth systems for a rapidly scaling healthtech company, implementing data-driven processes that improved efficiency by 60% while maintaining quality standards.",
    metrics: [
      { value: "60%", label: "Efficiency Improvement" },
      { value: "25%", label: "Cost Reduction" },
    ],
    tags: ["Operations", "Process Optimization", "Data Analytics"],
    details: {
      challenge:
        "MedFlow Systems was scaling rapidly but their operations couldn't keep pace. They needed systematic process improvements without compromising their high-quality healthcare standards.",
      solution:
        "I conducted comprehensive operational audit and implemented data-driven process improvements, automated workflows, and quality management systems. We focused on scalable solutions that maintained healthcare compliance.",
      results: [
        "Improved operational efficiency by 60%",
        "Reduced operational costs by 25%",
        "Maintained 99.9% quality compliance",
        "Automated 15 key processes",
        "Reduced processing time by 45%",
      ],
      timeline: "10 months",
      location: "Birmingham, UK",
    },
  },
  {
    id: "learnforward",
    title: "LearnForward",
    company: "EdTech • Pre-Series A",
    category: "Growth",
    image: "/images/edtech-learning.png",
    description:
      "Designed and implemented growth strategy for an innovative EdTech platform, establishing partnerships with educational institutions and creating scalable customer acquisition systems.",
    metrics: [
      { value: "500%", label: "User Growth" },
      { value: "15", label: "Institution Partnerships" },
    ],
    tags: ["Growth Strategy", "Partnership Development", "User Acquisition"],
    details: {
      challenge:
        "LearnForward had an innovative learning platform but struggled with user acquisition and institutional adoption. They needed a systematic approach to scale their user base.",
      solution:
        "I developed a multi-channel growth strategy focusing on institutional partnerships, content marketing, and user referral systems. We created scalable acquisition funnels and partnership frameworks.",
      results: [
        "Achieved 500% user growth in 14 months",
        "Established partnerships with 15 institutions",
        "Reduced customer acquisition cost by 35%",
        "Increased user retention by 45%",
        "Built scalable growth infrastructure",
      ],
      timeline: "14 months",
      location: "Bristol, UK",
    },
  },
]

const testimonials = [
  {
    quote:
      "Sarah's strategic guidance helped us close £350K+ in B2B sales within our first year. Her approach to building genuine relationships transformed how we think about growth.",
    author: "James Davidson",
    role: "Founder, TechStart Solutions",
    initials: "JD",
  },
  {
    quote:
      "The JCI chapter launch exceeded all expectations. Sarah's community-building expertise and operational systems made what seemed impossible feel effortless.",
    author: "Maria Rodriguez",
    role: "Regional Director, JCI",
    initials: "MR",
  },
  {
    quote:
      "Working with Sarah was transformational. She helped us raise £2M in funding and scale our team 3x while maintaining our mission-driven culture.",
    author: "Dr. Emily Chen",
    role: "CEO, GreenTech Innovations",
    initials: "EC",
  },
  {
    quote:
      "Sarah's operational expertise saved us months of trial and error. The 60% efficiency improvement she delivered was beyond our expectations.",
    author: "Michael Thompson",
    role: "COO, MedFlow Systems",
    initials: "MT",
  },
  {
    quote:
      "The growth strategy Sarah developed helped us achieve 500% user growth. Her partnership approach opened doors we didn't even know existed.",
    author: "Sarah Williams",
    role: "Founder, LearnForward",
    initials: "SW",
  },
  {
    quote:
      "Sarah doesn't just provide strategy - she becomes a true partner in your success. Her human-centered approach makes all the difference.",
    author: "David Kumar",
    role: "CEO, InnovateTech",
    initials: "DK",
  },
]

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 2; i++) {
      visible.push(testimonials[(currentTestimonial + i) % testimonials.length])
    }
    return visible
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-stone-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-stone-800">Chituru Chikwem</div>
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className="text-stone-600 hover:text-amber-600 transition-colors">
                About
              </Link>
              <Link href="#services" className="text-stone-600 hover:text-amber-600 transition-colors">
                Services
              </Link>
              <Link href="#portfolio" className="text-stone-600 hover:text-amber-600 transition-colors">
                Portfolio
              </Link>
              <Link href="#testimonials" className="text-stone-600 hover:text-amber-600 transition-colors">
                Success Stories
              </Link>
              <Link href="#contact" className="text-stone-600 hover:text-amber-600 transition-colors">
                Contact
              </Link>
            </div>
            <Link
              href="https://www.linkedin.com/in/chituru-chikwem/"
              className="text-stone-600 hover:text-amber-600 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 leading-tight">
              Helping startup founders scale — with <span className="text-amber-600">clarity, strategy,</span> and human
              connection.
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-8 font-light">
              Business Strategy | Operations | Growth Systems
            </p>
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-stone-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                  Building bridges between vision and execution
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  With 6+ years in business development, project management, and community-building, I partner with
                  startup founders and purposeful organizations to transform ambitious visions into scalable realities.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  My approach is values-led and globally informed, drawing from experience across diverse markets and
                  cultures. I believe that sustainable growth happens when strategy meets human connection — and that's
                  where the magic happens.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-stone-700">6+ Years Experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-stone-700">Global Perspective</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-stone-700">Values-Led Approach</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl transform rotate-6"></div>
                  <Image
                    src="/images/chituru-portrait.png"
                    alt="Chituru Chikwem - Strategic Business Consultant"
                    width={400}
                    height={500}
                    className="relative rounded-2xl shadow-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">How I Help You Scale</h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Three core areas where I partner with founders to create sustainable, human-centered growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                    <Target className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl text-stone-800">Strategic Business Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-stone-600 text-base leading-relaxed">
                    From vision to roadmap — I help you clarify your strategy, identify growth opportunities, and build
                    frameworks that scale with your ambitions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                    <TrendingUp className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl text-stone-800">Growth & Sales Ops</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-stone-600 text-base leading-relaxed">
                    Streamline your revenue engine with proven systems, process optimization, and sales operations that
                    convert prospects into lasting partnerships.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl text-stone-800">Startup Systems & Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-stone-600 text-base leading-relaxed">
                    Build the operational backbone and community connections that support sustainable growth while
                    maintaining your startup's unique culture.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Portfolio</h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                A showcase of strategic partnerships and transformational outcomes across diverse industries and growth
                stages.
              </p>
            </div>

            {/* Portfolio Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button variant="outline" className="bg-amber-600 text-white border-amber-600">
                All Projects
              </Button>
              <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent">
                Strategy
              </Button>
              <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent">
                Operations
              </Button>
              <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent">
                Community
              </Button>
              <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent">
                Sales
              </Button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid gap-8 mb-16">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
                    <div className={`relative h-64 md:h-auto ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} project`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-stone-800 mb-2">{project.title}</h3>
                        <p className="text-amber-600 font-medium">{project.company}</p>
                      </div>
                      <p className="text-stone-600 mb-6 leading-relaxed">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <div className="text-2xl font-bold text-amber-600">{metric.value}</div>
                            <div className="text-sm text-stone-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="self-start border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                      >
                        View Case Study
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Portfolio Summary Stats */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Portfolio Impact</h3>
                <p className="text-stone-600">Measurable outcomes across diverse industries and growth stages</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">£5.2M+</div>
                  <div className="text-sm text-stone-600">Total Revenue Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                  <div className="text-sm text-stone-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
                  <div className="text-sm text-stone-600">Startups Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
                  <div className="text-sm text-stone-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                width={800}
                height={300}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-stone-800 mb-2">{selectedProject.title}</h2>
                <p className="text-amber-600 font-medium text-lg">{selectedProject.company}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <span className="text-stone-600">{selectedProject.details.timeline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <span className="text-stone-600">{selectedProject.details.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  <span className="text-stone-600">Strategic Partnership</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-amber-600 mb-1">{metric.value}</div>
                    <div className="text-stone-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3">The Challenge</h3>
                  <p className="text-stone-600 leading-relaxed">{selectedProject.details.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3">The Solution</h3>
                  <p className="text-stone-600 leading-relaxed">{selectedProject.details.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3">Key Results</h3>
                  <ul className="space-y-2">
                    {selectedProject.details.results.map((result, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-stone-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.details.testimonial && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                    <Quote className="h-8 w-8 text-amber-600 mb-4" />
                    <p className="text-stone-700 italic mb-4">"{selectedProject.details.testimonial}"</p>
                    <p className="text-stone-600 font-medium">— {selectedProject.details.testimonialAuthor}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials/Success Stories */}
      <section id="testimonials" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Success Stories</h2>
              <p className="text-xl text-stone-600">Real impact, real results, real partnerships.</p>
            </div>

            <div className="relative">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <Card key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-amber-600 mb-4" />
                      <p className="text-stone-700 text-lg mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                          <span className="text-amber-800 font-semibold">{testimonial.initials}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-800">{testimonial.author}</p>
                          <p className="text-stone-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-center space-x-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mb-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-amber-600" : "bg-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-8 text-stone-600">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">£350K+</div>
                  <div className="text-sm">B2B Sales Closed</div>
                </div>
                <div className="w-px h-12 bg-stone-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-sm">Businesses Supported</div>
                </div>
                <div className="w-px h-12 bg-stone-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">7+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Let's Start the Conversation</h2>
              <p className="text-xl text-stone-600">
                Ready to scale with clarity and human connection? I'd love to hear about your vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-amber-600" />
                      <span className="text-stone-600">chituruchikwem@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-amber-600" />
                      <span className="text-stone-600">+44 7XXX XXX XXX</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-amber-600" />
                      <Link
                        href="https://linkedin.com"
                        className="text-stone-600 hover:text-amber-600 transition-colors"
                      >
                        Connect on LinkedIn
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-stone-800 mb-2">Latest from LinkedIn</h4>
                  <p className="text-stone-600 text-sm mb-3">
                    "Just wrapped up an incredible strategy session with a climate-tech startup. The power of asking the
                    right questions never ceases to amaze me..."
                  </p>
                  <Link href="https://linkedin.com" className="text-amber-600 text-sm hover:underline">
                    Read more on LinkedIn →
                  </Link>
                </div>
              </div>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-stone-700">
                          Name
                        </Label>
                        <Input id="name" placeholder="Your name" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-stone-700">
                          Email
                        </Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-stone-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your vision and how I can help..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white flex-1">
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50 flex-1 bg-transparent"
                      >
                        Book a Call Instead
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">chituru chikwem</h3>
              <p className="text-stone-300">Strategic Business Partner & Operations Consultant</p>
            </div>
            <div className="flex justify-center space-x-6 mb-8">
              <Link href="https://linkedin.com" className="text-stone-300 hover:text-amber-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:chituruchikwem@gmail.com"
                className="text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
            <div className="border-t border-stone-700 pt-8">
              <p className="text-stone-400 text-sm">
                © {new Date().getFullYear()} Chituru Chikwem. Building bridges between vision and execution.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
