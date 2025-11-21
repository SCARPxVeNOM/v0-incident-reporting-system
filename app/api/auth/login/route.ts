import { compare } from "bcryptjs"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ email })
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user signed up with Google OAuth (no password)
    if (!user.password_hash) {
      return Response.json(
        { error: "This account was created with Google. Please sign in with Google." },
        { status: 401 }
      )
    }

    const isValid = await compare(password, user.password_hash)
    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return Response.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    
    // Provide more user-friendly error messages
    if (error.message?.includes("SSL") || error.message?.includes("TLS")) {
      return Response.json(
        { error: "Database connection error. Please check your network connection and try again." },
        { status: 503 }
      )
    }
    
    return Response.json(
      { error: error.message || "An error occurred during login" },
      { status: 500 }
    )
  }
}
