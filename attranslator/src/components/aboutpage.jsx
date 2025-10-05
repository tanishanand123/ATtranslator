import React from 'react';
import { Heart, Code, Globe, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ImageWithFallback';


export default function AboutPage() {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "AI/ML Engineer",
      description: "Specializes in natural language processing and translation algorithms.",
      avatar: "PS"
    },
    {
      name: "Raj Patel",
      role: "Frontend Developer",
      description: "Creates intuitive and responsive user interfaces with modern web technologies.",
      avatar: "RP"
    },
    {
      name: "Anita Singh",
      role: "Product Designer",
      description: "Designs user-centered experiences that make translation accessible to everyone.",
      avatar: "AS"
    },
    {
      name: "Arjun Kumar",
      role: "Backend Engineer",
      description: "Builds scalable infrastructure for real-time translation services.",
      avatar: "AK"
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "AI/ML" },
    { name: "HuggingFace", category: "AI Models" },
    { name: "Web Speech API", category: "Voice" },
    { name: "Google Translate", category: "Translation" }
  ];

  const features = [
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Bridging Language Gaps",
      description: "Making communication seamless between Hindi and English speakers worldwide."
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Real-Time Processing",
      description: "Instant translations powered by advanced AI models and optimized infrastructure."
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: "User-Centered Design",
      description: "Built with accessibility and ease of use at the forefront of every decision."
    },
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      title: "Cutting-Edge Technology",
      description: "Leveraging the latest in web technologies and machine learning capabilities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">About ATtranslator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about breaking down language barriers and making communication 
            accessible to everyone through innovative AI-powered translation technology.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 md:p-12 mb-16 bg-white shadow-xl border-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ATtranslator was born from the vision of creating a world where language is never 
                a barrier to understanding. Our Hindi to English translator helps millions of 
                people communicate effectively, whether they're learning a new language, 
                conducting business, or simply connecting with others.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that technology should be intuitive, accessible, and powerful. 
                That's why we've built ATtranslator with cutting-edge AI models while 
                maintaining a simple, user-friendly interface that anyone can use.
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Diverse team working with technology"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-gray-900 text-center mb-12">Why Choose ATtranslator?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <Card className="p-8 md:p-12 mb-16 bg-white shadow-xl border-0">
          <h2 className="text-3xl text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto group-hover:scale-105 transition-transform duration-300">
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Technologies Section */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Powered By</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            We use cutting-edge technologies and platforms to deliver fast, accurate, 
            and reliable translation services.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default"
              >
                {tech.name}
                <span className="ml-2 text-xs text-gray-500">({tech.category})</span>
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl text-gray-900 mb-4">Want to Learn More?</h2>
          <p className="text-gray-600 mb-6">
            Get in touch with our team or try our translator today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/translator"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-full text-blue-600 bg-transparent hover:bg-blue-50 transition-colors"
            >
              Try Translator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
