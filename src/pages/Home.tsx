import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation without GSAP (can be replaced with GSAP if installed)
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 px-4 overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-sm font-medium glow-primary">
                <Sparkles className="w-4 h-4 text-primary" />
                Trusted by 1000+ Users 
              </span>
            </div>

            <h1 className="text-5xl md:text-xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Discover Tools
              </span>
              <br />
              That Transform Work
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The ultimate directory for finding, rating, and sharing the best
              AI and productivity tools. Join our community and supercharge your
              workflow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/tools">
                <Button
                  size="lg"
                  className=" glow-primary h-14 px-10 text-lg group"
                >
                  Explore Tools
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </Link>
              <Link to="https://vijayaragunathan.netlify.app/" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg border-2"
                >
                  Join Community
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>100+ Tools Listed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>1K+ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Free Forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 animate-on-scroll">
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                100+
              </div>
              <p className="text-muted-foreground">Tools Listed</p>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-muted-foreground">Reviews Written</p>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                4.8
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tool Market
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover and share the best tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Curated Collection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access hundreds of carefully vetted AI and productivity tools,
                all in one place. Save time and find exactly what you need.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center glow-accent">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real User Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Make informed decisions with authentic ratings and reviews from
                real users who've tested the tools.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center glow-accent">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Always Updated</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay ahead with the latest tools and updates. Our community
                constantly adds new discoveries.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every tool is verified and checked for quality, security, and
                reliability before being listed.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Active Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join thousands of professionals sharing insights, tips, and
                recommendations daily.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift animate-on-scroll">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert Picks</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover top-rated tools handpicked by industry experts and
                power users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved By{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl animate-on-scroll">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Tool Kit has completely transformed how I discover new
                productivity tools. The reviews are incredibly helpful!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div>
                  <p className="font-semibold">Kamalesh</p>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl animate-on-scroll">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "As a developer, finding the right AI tools is crucial. This
                platform makes it so easy to compare and choose."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary" />
                <div>
                  <p className="font-semibold">Swetha</p>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl animate-on-scroll">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Love how active the community is. I've discovered so many
                hidden gems that boosted my workflow significantly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent" />
                <div>
                  <p className="font-semibold">Adithya</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-12 md:p-16 rounded-3xl text-center animate-on-scroll relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community today and discover the tools that will
                transform your work
              </p>
              <Link to="/tools">
                <Button
                  size="lg"
                  className="glow-primary h-14 px-12 text-lg group"
                >
                  Browse All Tools
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;