import { redirect } from "next/navigation"

const GOOGLE_REDIRECT_URI = "http://localhost:3000/api/auth/login/redirect"

export function GET() {
	const clientId = process.env.GOOGLE_CLIENT_ID
	const redirectUri = GOOGLE_REDIRECT_URI
	let url = "https://accounts.google.com/o/oauth2/v2/auth"
	url += `?client_id=${clientId}`
	url += `&redirect_uri=${redirectUri}`
	url += "&response_type=code"
	url += "&scope=email profile"
	redirect(url)
}
