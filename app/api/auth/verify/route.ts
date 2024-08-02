import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { isMember } from "@/utils/auth/member"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET!
const BASE_URL = process.env.BASE_URL!
const JWT_EXPIRES_IN = "1h"
const JWT_REFRESH_EXPIRES_IN = "30d"

export async function GET(request: Request) {
	const url = new URL(request.url)

	const cookieStore = cookies()
	const headers = new Headers()
	try {
		const accessToken = cookieStore.get("access_token")?.value ?? ""
		const res_refreshToken = cookieStore.get("refresh_token")?.value ?? ""
		try {
			const { access_token } = jwt.verify(accessToken, JWT_SECRET) as any
			return NextResponse.json({ status: 200, id: access_token })
		} catch {
			try {
				const { refresh_token } = jwt.verify(
					res_refreshToken,
					JWT_SECRET
				) as any
				const member = await isMember({ google_id: refresh_token })
				if (!member) {
					return NextResponse.json([], { status: 401 })
				}

				const accessToken = jwt.sign(
					{ access_token: refresh_token },
					JWT_SECRET,
					{
						expiresIn: JWT_EXPIRES_IN,
					}
				)
				const refreshToken = jwt.sign(
					{ refresh_token: refresh_token },
					JWT_SECRET,
					{
						expiresIn: JWT_REFRESH_EXPIRES_IN,
					}
				)

				headers.append(
					"Set-Cookie",
					`access_token=${accessToken}; HttpOnly; Max-Age=3600; Path=/; ${
						process.env.NODE_ENV === "production" ? "Secure; " : ""
					}SameSite=Lax`
				)
				headers.append(
					"Set-Cookie",
					`refresh_token=${refreshToken}; HttpOnly; Max-Age=2592000; Path=/; ${
						process.env.NODE_ENV === "production" ? "Secure; " : ""
					}SameSite=Lax`
				)

				return NextResponse.json(
					{ email: member.name, name: member.name, id: member.google_id },
					{ headers }
				)
			} catch (error) {
				headers.append(
					"Set-Cookie",
					`access_token=; HttpOnly; Max-Age=0; Path=/; ${
						process.env.NODE_ENV === "production" ? "Secure; " : ""
					}SameSite=Lax`
				)
				headers.append(
					"Set-Cookie",
					`refresh_token=; HttpOnly; Max-Age=0; Path=/; ${
						process.env.NODE_ENV === "production" ? "Secure; " : ""
					}SameSite=Lax`
				)

				return NextResponse.json([], { status: 401, headers })
			}
		}
	} catch (error) {
		console.error("Unexpected Error:", error)
		return NextResponse.redirect(new URL("/login", BASE_URL), 301)
	}
}
