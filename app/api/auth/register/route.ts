import { hash } from "bcryptjs"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      // Check if user exists with Google OAuth
      if (existingUser.provider === "google") {
        return Response.json(
          { error: "This email is already registered with Google. Please sign in with Google." },
          { status: 400 }
        )
      }
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = {
      name,
      email,
      password_hash: hashedPassword,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await usersCollection.insertOne(newUser)

    return Response.json(
      {
        id: result.insertedId.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    
    // Provide more user-friendly error messages
    if (error.message?.includes("SSL") || error.message?.includes("TLS")) {
      return Response.json(
        { error: "Database connection error. Please check your network connection and try again." },
        { status: 503 }
      )
    }
    
    return Response.json(
      { error: error.message || "An error occurred during registration" },
      { status: 500 }
    )
  }
}
