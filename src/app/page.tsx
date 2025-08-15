import Link from 'next/link'
import { MessageCircle, Users, Shield, Zap, Heart, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-foreground">KPNG</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/home" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            The First{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Solution
            </span>
            <br />
            for Parents
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop drowning in overwhelming information. Get personalized, expert parenting advice instantly, 
            without the unnecessary worry that comes with traditional Google searches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/home" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Parents Choose KPNG
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've solved the biggest challenges parents face when seeking advice and support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Eliminate Information Overload
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No more scrolling through endless articles. Get direct, actionable answers to your specific parenting questions in seconds.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                End Unnecessary Worry
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stop second-guessing yourself. Our AI provides evidence-based advice that reduces anxiety and builds confidence.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Build a Strong Community
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with other parents, share experiences, and find support in a community that understands your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How KPNG Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, fast, and effective parenting support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ask Your Question</h3>
              <p className="text-muted-foreground">
                Type any parenting question, from sleep training to feeding schedules
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get Instant AI Advice</h3>
              <p className="text-muted-foreground">
                Receive personalized, expert-level guidance in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Connect & Share</h3>
              <p className="text-muted-foreground">
                Join discussions and learn from other parents' experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Parenting Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of parents who've found confidence, clarity, and community with KPNG
          </p>
          <Link 
            href="/home" 
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold">KPNG</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 KPNG. Empowering parents with AI-driven guidance.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 