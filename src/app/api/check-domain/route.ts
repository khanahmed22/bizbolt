import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 })
  }

  const apiKey = process.env.WHOISXML_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
  }

  try {
    const url = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}&credits=DA`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking domain availability:", error)
    return NextResponse.json({ error: "Failed to check domain availability" }, { status: 500 })
  }
}

