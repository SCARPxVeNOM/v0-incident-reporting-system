import { hash } from "bcryptjs"

const users: any[] = []

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password_hash: hashedPassword,
      role: "user",
      created_at: new Date(),
    }

    users.push(newUser)

    return Response.json(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      { status: 201 },
    )
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
