import NextAuth from "next-auth"
import authConfig from "~/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req

  if (nextUrl.pathname.startsWith("/api/auth")) {
    return
  }

  const isLoggedIn = !!req.auth

  if (!isLoggedIn && nextUrl.pathname !== "/auth/signin") {
    return Response.redirect(new URL("/auth/signin", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
