import { compare } from "bcryptjs"

const users: any[] = []

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 })
    }

    const user = users.find((u) => u.email === email)
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await compare(password, user.password_hash)
    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return Response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
