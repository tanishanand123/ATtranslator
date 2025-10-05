import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, MessageSquare, Volume2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './ImageWithFallback';


export function HomePage() {
  const features = [
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: "Voice Input Support",
      description: "Speak Hindi naturally and get instant translations."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Real-Time Translation",
      description: "Fast and accurate results powered by AI."
    },
    {
      icon: <Volume2 className="h-8 w-8 text-blue-600" />,
      title: "Text-to-Speech Output",
      description: "Listen to translated English with natural voice."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                Translate Hindi to English
                <span className="text-blue-600 block">Instantly</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Type or speak in Hindi — get instant, accurate English translations 
                powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/translator">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 group transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Translating
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1673515335152-f2589ba8bb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBzcGVha2luZyUyMGRpZmZlcmVudCUyMGxhbmd1YWdlcyUyMHRyYW5zbGF0aW9ufGVufDF8fHx8MTc1OTU5NzYyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="People communicating across languages"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg z-20 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">हैलो</span>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-800">Hello</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg z-20 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">धन्यवाद</span>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-800">Thank you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Powerful Translation Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless communication with our advanced Hindi to English translation tools.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50 group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-white mb-6">
            Ready to Start Translating?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust LinguaLive for accurate Hindi to English translations.
          </p>
          <Link to="/translator">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              Try ATtranslator Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
