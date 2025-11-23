import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      avatar?: string | null
      role?: string
    }
  }

  interface User {
    id: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
    name?: string
    email?: string
    avatar?: string | null
  }
}

