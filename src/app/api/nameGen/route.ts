import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: Request) {
  // The useCompletion hook sends the prompt as { prompt: string }
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== "string") {
    return new Response("Missing or invalid prompt", { status: 400 })
  }

  try {
    const result = await streamText({
      model: google("gemini-1.5-flash-latest"),
      prompt: `Generate 5 creative business name suggestions similar to or inspired by: "${prompt}". 
               Format the response as a numbered list with a brief explanation for each suggestion with no formatting.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error generating completion:", error)
    return new Response("Error generating completion", { status: 500 })
  }
}

