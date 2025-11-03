'use client'
import React, { useState, useEffect,useRef } from 'react';

export default function useSpeechRecognation(){
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);

    const speech = useRef(null)

    useEffect(()=>{
        const Speechrecognition = (window).SpeechRecognition || (window).webkitSpeechRecognition;

        if (!Speechrecognition) {
          setError("Speech Recognition API not supported in this browser.");
          return;
        }
        speech.current = new Speechrecognition()
        speech.current.continuous = true
        speech.current.interimResults = false
        speech.current.lang = "hi-IN"

        speech.current.onstart = () => setIsListening(true);
        speech.current.onend = () => {
          setIsListening(false);
          // Auto-restart if user didn't manually stop
          if (speech.current._keepListening) {
            speech.current.start();
          }
        };
        // speech.current.onend = () => setIsListening(false);
        speech.current.onerror = (event) => setError(event.error);

        speech.current.onresult = (event) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            finalTranscript += event.results[i][0].transcript;
          }
          setTranscript((prev) => (prev + " " + finalTranscript).trim());
        };

        return () => {
          speech.current?.stop();
        };
    },[])

    const StartListning = ()=>{
        if(speech.current &&  !isListening){
            setTranscript("")
            speech.current.start()
        }
    }

    const stopListening = () => {
      if (speech.current && isListening) {
        speech.current.stop();
        // console.log(transcript)
      }
    };

    const resetTranscript = () => setTranscript("");

    return {
    transcript,
    isListening,
    error,
    StartListning,
    stopListening,
    resetTranscript,
  };
    
}

