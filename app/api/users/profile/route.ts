import { getDb } from "@/lib/mongodb"
import { NextRequest } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    
    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    let user
    try {
      user = await usersCollection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { name: 1, email: 1, avatar: 1, role: 1 } }
      )
    } catch (idError) {
      // If ObjectId conversion fails, try finding by email or other identifier
      user = await usersCollection.findOne(
        { email: userId },
        { projection: { name: 1, email: 1, avatar: 1, role: 1 } }
      )
    }

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({
      id: user._id.toString(),
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || null,
      role: user.role || "user",
    })
  } catch (error: any) {
    console.error("Error fetching user profile:", error)
    return Response.json(
      { error: error.message || "An error occurred while fetching user profile" },
      { status: 500 }
    )
  }
}

