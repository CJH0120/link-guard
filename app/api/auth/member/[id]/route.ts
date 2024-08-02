import { Member } from "@/interface/api"
import { executeQuery } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const url = new URL(request.url)
	const id = url.pathname.split("/").pop()

	try {
		const [member] = await executeQuery<Member.info>(
			`
			SELECT  *
			FROM member
			WHERE google_id = ?
			`,
			[id]
		)

		if (!member) {
			return NextResponse.json({ error: "User not found." }, { status: 404 })
		} else {
			const data = await executeQuery<{ google_id: string }>(
				`
				SELECT lc.*
				FROM link_collection lc
				WHERE lc.member_id = ?
				`,
				[member.id]
			)

			return NextResponse.json({ member, data })
		}
	} catch (error) {
		console.error("Error fetching users:", error)
		return NextResponse.json({ error: "서버 오류" }, { status: 500 })
	}
}

export async function POST(request: Request) {
	const url = new URL(request.url)
	const id = url.pathname.split("/").pop()
	revalidatePath(`/${id}`)
	return NextResponse.json({ status: "updated" })
}
