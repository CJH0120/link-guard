import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const users = await executeQuery<{ google_id: string }>(
			"SELECT google_id FROM member"
		)
		console.log("Users:", users)
		return NextResponse.json(users)
	} catch (error) {
		console.error("Error fetching users:", error)
		return NextResponse.json({ error: "서버 오류" }, { status: 500 })
	}
}
