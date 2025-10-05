import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';


export function TranslatorPage() {
  const [hindiText, setHindiText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const speechSynthesis = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'hi-IN'; // Hindi language

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setHindiText(transcript);
        setIsListening(false);
        toast.success('Voice input captured successfully!');
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
        toast.error('Error capturing voice input. Please try again.');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    speechSynthesis.current = window.speechSynthesis;
  }, []);

  // Mock translation function
  const translateText = async (text) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const translations = {
      'नमस्ते': 'Hello',
      'धन्यवाद': 'Thank you',
      'आप कैसे हैं': 'How are you',
      'मेरा नाम': 'My name is',
      'क्या हाल है': "What's up",
      'खुश रहिए': 'Stay happy',
      'शुभ प्रभात': 'Good morning',
      'शुभ रात्रि': 'Good night',
      'मुझे खुशी है': 'I am happy',
      'यह अच्छा है': 'This is good'
    };

    for (const [hindi, english] of Object.entries(translations)) {
      if (text.toLowerCase().includes(hindi.toLowerCase())) {
        return english;
      }
    }

    return `[Translated from Hindi] ${text}`;
  };

  const handleTranslate = async () => {
    if (!hindiText.trim()) {
      toast.error('Please enter some Hindi text to translate.');
      return;
    }

    setIsTranslating(true);
    try {
      const translation = await translateText(hindiText);
      setEnglishText(translation);
      toast.success('Translation completed!');
    } catch {
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
      toast.info('Listening... Please speak in Hindi.');
    }
  };

  const handleSpeakEnglish = () => {
    if (!englishText.trim()) {
      toast.error('No English text to speak.');
      return;
    }

    if (speechSynthesis.current) {
      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.current.speak(utterance);
      toast.success('Speaking English translation...');
    } else {
      toast.error('Text-to-speech is not supported in your browser.');
    }
  };

  const handleCopy = async () => {
    if (!englishText.trim()) {
      toast.error('No text to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(englishText);
      setIsCopied(true);
      toast.success('Translation copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy text.');
    }
  };

  const handleClear = () => {
    setHindiText('');
    setEnglishText('');
    toast.info('Cleared all text.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Hindi → English Translator
          </h1>
          <p className="text-lg text-gray-600">
            Type or speak in Hindi to get instant English translations
          </p>
        </div>

        {/* Main Translator Card */}
        <Card className="p-6 md:p-8 shadow-xl bg-white/95 backdrop-blur-sm border-0">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Hindi Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-900">Enter Hindi Text</label>
                <Button
                  onClick={handleVoiceInput}
                  variant={isListening ? "destructive" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                  {isListening ? 'Stop' : 'Voice'}
                </Button>
              </div>
              <Textarea
                value={hindiText}
                onChange={(e) => setHindiText(e.target.value)}
                placeholder="यहाँ हिंदी में टाइप करें..."
                className="min-h-[200px] text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
                dir="auto"
              />
              <p className="text-sm text-gray-500">
                💡 You can type or click the voice button to speak
              </p>
            </div>

            {/* English Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-900">English Translation</label>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSpeakEnglish}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    disabled={!englishText.trim()}
                  >
                    <Volume2 className="h-4 w-4" />
                    Speak
                  </Button>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    disabled={!englishText.trim()}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
              <Textarea
                value={englishText}
                readOnly
                placeholder="English translation will appear here..."
                className="min-h-[200px] text-lg bg-gray-50 border-gray-200 rounded-xl resize-none"
              />
              {isTranslating && (
                <div className="flex items-center justify-center text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Translating...
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button
              onClick={handleTranslate}
              disabled={!hindiText.trim() || isTranslating}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Translating...
                </>
              ) : (
                'Translate'
              )}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-3"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Clear All
            </Button>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg text-blue-900 mb-4">💡 Quick Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Voice Input:</strong> Click the microphone button and speak clearly in Hindi.
            </div>
            <div>
              <strong>Text Input:</strong> Type directly in the Hindi text box using any keyboard.
            </div>
            <div>
              <strong>Audio Output:</strong> Click "Speak" to hear the English translation.
            </div>
            <div>
              <strong>Copy Text:</strong> Use the copy button to save translations to clipboard.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
