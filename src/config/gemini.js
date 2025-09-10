import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyDS9TcszSU8O64pWRaDFB9Z28U5UnT-xUE");

export async function generateResponse(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    console.log("Full Gemini response:", result); 
    console.log("Generated text:", result.response.text()); 

    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong!";
  }
}
