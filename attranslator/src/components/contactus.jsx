import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Us",
      content: "contact@ATtranslator.ai",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Available Monday to Friday, 9 AM to 6 PM EST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "Come visit our office in the heart of Silicon Valley"
    }
  ];

  const faqs = [
    {
      question: "How accurate are the translations?",
      answer:
        "Our AI-powered translator achieves high accuracy for common phrases and sentences. For complex texts, we recommend human review."
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we prioritize your privacy. We don't store your translations permanently and use secure encryption for all data transmission."
    },
    {
      question: "Can I use this for commercial purposes?",
      answer:
        "Yes, ATtranslator can be used for both personal and commercial translation needs. Contact us for enterprise solutions."
    },
    {
      question: "Do you support other languages?",
      answer:
        "Currently, we specialize in Hindi to English translation. We're working on adding more language pairs in the future."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about ATtranslator? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white shadow-xl border-0">
              <h2 className="text-2xl text-gray-900 mb-6">Send us a Message</h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3 className="text-xl text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">{info.icon}</div>
                    <div>
                      <h4 className="text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-blue-600 mb-1">{info.content}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
              <h3 className="text-lg text-gray-900 mb-4">Quick Contact</h3>
              <p className="text-gray-600 text-sm mb-4">
                For immediate assistance, you can reach us directly at:
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:contact@ATtranslator.ai"
                  className="block text-blue-600 hover:text-blue-700 transition-colors"
                >
                  contact@ATtranslator.ai
                </a>
                <a
                  href="tel:+15551234567"
                  className="block text-blue-600 hover:text-blue-700 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
            <h2 className="text-2xl mb-4">Ready to Start Translating?</h2>
            <p className="text-blue-100 mb-6">
              Try our Hindi to English translator now and experience the power of AI-driven translation.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3">
              <a href="/translator">Try ATtranslator Now</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
