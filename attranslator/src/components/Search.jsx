import transcriptComponent from "@/components/transcriptComponent";
import { Button } from "@/components/ui/button";
import useSpeechRecognation from "@/hooks/usespeech";
// import { SarvamSpeach } from "@/lib/sarvam";
import React, { useState } from "react";
import {
  Mic,
  Square,
  RefreshCcw,
  Send,
  Volume2,
  Loader2,
  Globe,
  Youtube,
} from "lucide-react";

const MemoizedTranscriptView = React.memo(
  transcriptComponent,
  (prev, next) => prev.transcript === next.transcript
);

export default function Search() {
  const {
    StartListning,
    error,
    isListening,
    resetTranscript,
    stopListening,
    transcript,
  } = useSpeechRecognation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function playAudioWithPermission(audioArray) {
    const userConsent = confirm("Allow this page to play generated audio?");
    if (!userConsent) return alert("Audio playback cancelled.");
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = audioArray.slice().buffer.slice(0);
    try {
      const decoded = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = decoded;
      source.connect(audioContext.destination);
      source.start(0);
    } catch (err) {
      console.error("Error decoding audio:", err);
    }
  }

  const senddata = async () => {
    if (!transcript.trim()) return alert("Transcript is empty!");
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: transcript }),
      });
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const result = await res.json();
      setData(result.data);
      if (result?.data?.final_result) {
        // const audioArray = await SarvamSpeach(result.data.final_result);
        // await playAudioWithPermission(audioArray);
      }
    } catch (err) {
      console.error("Error sending data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 text-gray-900">
      {/* 💎 Soft gradient background with subtle noise */}
      <div className="absolute inset-0 -z-10 bg-[url('/noise.svg')] opacity-10"></div>

      {/* 🧠 Header */}
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-sky-600 bg-clip-text text-transparent">
          Smart Voice Assistant
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Speak • Understand • Explore — powered by AI ✨
        </p>
      </header>

      {/* 🎛️ Control Buttons */}
      <section className="flex flex-wrap justify-center gap-4 mb-12">
        <Button
          onClick={StartListning}
          disabled={isListening}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl shadow-sm transition-all"
        >
          <Mic className="w-5 h-5" />
          {isListening ? "Listening..." : "Start"}
        </Button>

        <Button
          onClick={stopListening}
          disabled={!isListening}
          className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white px-6 py-2 rounded-xl shadow-sm transition-all"
        >
          <Square className="w-5 h-5" />
          Stop
        </Button>

        <Button
          onClick={resetTranscript}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow-sm transition-all"
        >
          <RefreshCcw className="w-5 h-5" />
          Reset
        </Button>

        <Button
          onClick={senddata}
          disabled={loading || isListening}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl shadow-sm transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send
            </>
          )}
        </Button>
      </section>

      {/* 🧩 Main Layout */}
      <main className="grid lg:grid-cols-3 gap-8 px-6 pb-10 max-w-7xl mx-auto">
        {/* Transcript */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-indigo-600">
            <Mic className="w-5 h-5" /> Transcript
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[400px] text-gray-700">
            <MemoizedTranscriptView transcript={transcript} />
          </div>
        </div>

        {/* Final Result */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-emerald-600">
            <Volume2 className="w-5 h-5" /> AI Response
          </h2>
          <div className="text-gray-700 leading-relaxed overflow-y-auto max-h-[400px]">
            {data?.final_result ? (
              <p>{data.final_result}</p>
            ) : (
              <p className="italic text-gray-400">
                Your AI response will appear here...
              </p>
            )}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
          {data?.web_link?.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-md font-semibold mb-2 text-sky-600">
                <Globe className="w-5 h-5" /> Web Links
              </h3>
              <ul className="space-y-3">
                {data.web_link.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-sky-50 p-3 rounded-xl border border-sky-100 hover:border-sky-300 transition-all"
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      {item.title || "Untitled"}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{item.snippet}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data?.youtube_link?.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-md font-semibold mb-2 text-red-500">
                <Youtube className="w-5 h-5" /> YouTube Links
              </h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {data.youtube_link.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-500 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Voice Assistant — Built with ❤️ by Gourav
      </footer>
    </div>
  );
}
