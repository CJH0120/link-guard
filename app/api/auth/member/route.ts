import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const url = new URL(request.url)
	console.log("@@@@@@@@@@@@@@")
	const id = url.pathname.split("/").pop()
	try {
		const users = await executeQuery<{ google_id: string }>(
			"SELECT google_id FROM member"
		)
		const exists = users.some((user) => user.google_id === id)
		return NextResponse.json({ id })
	} catch (error) {
		console.error("Error fetching users:", error)
		return NextResponse.json({ error: "서버 오류" }, { status: 500 })
	}
}
