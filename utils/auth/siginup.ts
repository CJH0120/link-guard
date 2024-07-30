import executeQuery from "@/lib/db"
import { User } from "next-auth"

export const signUp = async ({ id, email, image, name }: User) => {
	try {
		await executeQuery(
			`INSERT INTO member
            (google_id, name, email)
            VALUES (?, ?, ?)`,
			[id, name, email]
		)
	} catch (error) {
		console.error("Error signing up:", error)
		throw error
	}
}
