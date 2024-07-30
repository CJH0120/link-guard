import { isMember } from "@/utils/auth/member"
import { signUp } from "@/utils/auth/siginup"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},

	callbacks: {
		async signIn({ user }) {
			if (!user.email) return false
			try {
				const memberExists = await isMember(user)
				if (!memberExists) {
					await signUp(user)
				}
				return true
			} catch (error) {
				console.error("Error during sign-in process:", error)
				return false
			}
		},
	},
	pages: {
		signIn: "/login",
	},
	cookies: {
		sessionToken: {
			name: "link-guard",
			options: {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: false,
			},
		},
	},
})

export { handler as GET, handler as POST }
