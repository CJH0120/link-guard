import { decode } from "next-auth/jwt"

const secret = process.env.NEXT_AUTH_SECRET

export const decodeToken = async (cookie: string) => {
	console.log("decodeToken", cookie)
	try {
		const payload = await decode({
			token: cookie,
			secret: secret ?? "",
		})
		console.log(payload)
		return payload
	} catch (err) {
		console.error("Token decoding error:", err)
		return null
	}
}
