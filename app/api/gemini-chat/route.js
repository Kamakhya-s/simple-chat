import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
});

export async function POST(req) {
  try {
    const { prompt, temperature = 0.7 } = await req.json();

    // Basic system instruction (optional, you can remove if not needed)
    const systemContext = `
      You are a helpful AI assistant.
      - Be clear, concise, and conversational.
      - Use simple explanations with examples where useful.
      - Avoid robotic or overly formal tone.
    `;

    // Send to Gemini
    const result = await model.generateContent(
      `${systemContext}\nUser: ${prompt}`,
      { temperature }
    );

    const text = await result.response.text();
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Error generating Gemini AI response:", err);
    return NextResponse.json({
      text: "⚠️ Sorry, something went wrong. Please try again!",
    });
  }
}