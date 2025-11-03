// import { SarvamAIClient } from "sarvamai";


// export async function SarvamSpeach(longtext:string): Promise<Uint8Array>  {
// const client = new SarvamAIClient({
// apiSubscriptionKey: "sk_15yvqboy_AAFgnXeEbS0qIr1KDAs8Awn8",
// });

// const socket = await client.textToSpeechStreaming.connect({
// model: "bulbul:v2",
// });
// const audioChunks: Buffer[] = [];
// // let chunkCount = 0;
// // const outputStream = fs.createWriteStream("output.mp3");

// // let closeTimeout: NodeJS.Timeout | null = null;

// socket.on("open", () => {
// console.log("Connection opened");

//     socket.configureConnection({
//       type: "config",
//       data: {
//         speaker: "anushka",
//         target_language_code: "en-IN",
//       },
//     });

//     console.log("Configuration sent");


//     socket.convert(longtext);
//     console.log("Text sent for conversion");


//     closeTimeout = setTimeout(() => {
//       console.log("Forcing socket close after timeout");
//       socket.close();
//     }, 10000);

// });

// socket.on("message", (message) => {
// if (message.type === "audio") {
// chunkCount++;
// const audioBuffer = Buffer.from(message.data.audio, "base64");
// outputStream.write(audioBuffer);
// console.log(`Received and wrote chunk ${chunkCount}`);
// } else {
// console.log("Received message:", message);
// }
// });

// socket.on("close", (event) => {
// console.log("Connection closed:", event);
// if (closeTimeout) clearTimeout(closeTimeout);
// outputStream.end(() => {
// console.log(`All ${chunkCount} chunks saved to output.mp3`);
// });
// });

// socket.on("error", (error) => {
// console.error("Error occurred:", error);
// if (closeTimeout) clearTimeout(closeTimeout);
// outputStream.end();
// });

// await socket.waitForOpen();
// console.log("WebSocket is ready");
// }


// lib/sarvamSpeech.ts
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
