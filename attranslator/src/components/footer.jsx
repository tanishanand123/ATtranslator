import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/translator', label: 'Translator' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      href: 'https://github.com', 
      label: 'GitHub' 
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: 'https://linkedin.com', 
      label: 'LinkedIn' 
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:contact@lingualive.ai', 
      label: 'Email' 
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl text-gray-900">ATtranslator</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Breaking down language barriers with AI-powered Hindi to English translation. 
              Making communication accessible to everyone, everywhere.
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} ATtranslator | Made with AI and Love 💙
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-gray-600"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Contact us directly:
              </p>
              <a
                href="mailto:contact@ATtranslator.ai"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                contact@ATtranslator.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Cookie Policy</a>
            </div>
            <div className="text-sm text-gray-500">
              Built with React and TailwindCSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
