
import { SarvamAIClient } from "sarvamai";

export async function SarvamSpeach(longtext) {
  const client = new SarvamAIClient({
    apiSubscriptionKey: "API KEY",
  });

  const socket = await client.textToSpeechStreaming.connect({
    model: "bulbul:v2",
  });

  const audioChunks = [];

  return new Promise((resolve, reject) => {
    socket.on("open", () => {
      console.log("🔊 WebSocket opened");

      socket.configureConnection({
        type: "config",
        output_audio_codec:"mp3",
        
        data: {
          speaker: "anushka",
          target_language_code: "en-IN",
        },
      });
      console.log(longtext)
      socket.convert(longtext);
    });

    socket.on("message", (message) => {
      if (message.type === "audio") {
        const audioBuffer = Buffer.from(message.data.audio, "base64");
        audioChunks.push(audioBuffer);
      }
    });

    socket.on("close", () => {
      console.log("✅ Connection closed");
      const finalBuffer = Buffer.concat(audioChunks);
      resolve(new Uint8Array(finalBuffer));
    });

    socket.on("error", (err) => {
      console.error("❌ WebSocket error:", err);
      reject(err);
    });
  });
}
