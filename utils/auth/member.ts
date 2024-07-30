import { User } from "next-auth"
import executeQuery from "../../lib/db"
interface Member {
	id: number
	name: string
	email: string
	// 필요에 따라 추가 필드
}

export const isMember = async ({ id: googleId, email, image, name }: User) => {
	try {
		const member = await executeQuery<Member>(
			"SELECT * FROM member WHERE google_id = ?",
			[googleId]
		)

		return member[0].id
	} catch (error) {
		console.error("Error fetching user data:", error)
		throw error
	}
}
