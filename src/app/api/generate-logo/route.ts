export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt } = await req.json()
    console.log("Received Prompt:", prompt)

    const response = await fetch("https://api.imagepig.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.IMAGEPIG_API_KEY as string,
      },
      body: JSON.stringify({ prompt: `generate a logo of cartoon ${prompt} in a circle` }),
    })

    if (!response.ok) {
      const errorText = await response.text() 
      console.error("API Error:", errorText)
      return new Response(JSON.stringify({ error: `API Error: ${response.status} - ${errorText}` }), { status: 500 })
    }

    const json = await response.json()
    return new Response(JSON.stringify({ image: `data:image/jpeg;base64,${json.image_data}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: unknown) {
    console.error("Server Error:", error)

   
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
}
