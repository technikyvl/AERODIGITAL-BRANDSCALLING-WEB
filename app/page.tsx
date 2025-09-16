"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("animate-on-scroll")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground">Studio</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#values" className="text-muted-foreground hover:text-foreground transition-colors">
                Values
              </a>
              <a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors">
                Clients
              </a>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in-up">
              Organize & Launch
              <br />
              Campaigns Effortlessly
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up animate-delay-200 max-w-3xl mx-auto">
              MailMaster Pro Empowers Your Business To Streamline Email Management And Execute Impactful Marketing
              Campaigns With Ease
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animate-delay-300">
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 py-4 text-lg transition-all-smooth"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-lg border-border hover:bg-muted transition-all-smooth bg-transparent"
              >
                Upgrade Now
              </Button>
            </div>

            <div className="flex justify-center animate-fade-in-up animate-delay-400">
              <div className="bg-card border border-border rounded-3xl p-12 shadow-2xl max-w-2xl">
                <p className="text-lg text-muted-foreground font-medium">
                  Join thousands transforming their
                  <br />
                  email strategy today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-on-scroll">What we do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll animate-delay-100">
              We offer a comprehensive range of services to help your business thrive in the digital world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-200">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">UI/UX Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating intuitive and beautiful user experiences that engage your audience and drive conversions.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building robust, scalable applications using the latest technologies and best practices.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-400">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Branding</h3>
              <p className="text-muted-foreground leading-relaxed">
                Developing strong brand identities that resonate with your target audience and stand out in the market.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section - 2x2 Grid */}
      <section id="values" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-on-scroll">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll animate-delay-100">
              The principles that guide everything we do and shape our interactions with clients and projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Featured Value - Orange Background */}
            <Card className="p-12 bg-primary text-primary-foreground hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-200">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Quality First</h3>
              <p className="text-primary-foreground/90 leading-relaxed text-lg">
                We never compromise on quality. Every project receives our full attention to detail and commitment to
                excellence.
              </p>
            </Card>

            <Card className="p-12 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-4">Collaboration</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We work closely with our clients as partners, ensuring transparent communication throughout every
                project.
              </p>
            </Card>

            <Card className="p-12 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-400">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We stay ahead of trends and technologies to deliver cutting-edge solutions that give you a competitive
                edge.
              </p>
            </Card>

            <Card className="p-12 bg-card border-border hover:shadow-lg transition-all-smooth animate-on-scroll animate-delay-500">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-4">Reliability</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                You can count on us to deliver on time, within budget, and exceed your expectations every single time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section id="clients" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center animate-on-scroll animate-delay-200">
              <div className="text-2xl font-bold text-foreground">Springfield</div>
            </div>
            <div className="flex items-center justify-center animate-on-scroll animate-delay-300">
              <div className="text-2xl font-bold text-foreground">Swiss</div>
            </div>
            <div className="flex items-center justify-center animate-on-scroll animate-delay-400">
              <div className="text-2xl font-bold text-foreground">Monaco</div>
            </div>
            <div className="flex items-center justify-center animate-on-scroll animate-delay-500">
              <div className="text-2xl font-bold text-foreground">Hamilton</div>
            </div>
            <div className="flex items-center justify-center animate-on-scroll animate-delay-600">
              <div className="text-2xl font-bold text-foreground">Delaware</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-foreground mb-4 md:mb-0">Studio</div>
            <div className="flex space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
