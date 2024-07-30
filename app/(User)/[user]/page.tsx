import { notFound, redirect } from "next/navigation"
import { cookies } from "next/headers"
import executeQuery from "@/lib/db"
import { decodeToken } from "@/utils/auth/decode"
import { decode } from "next-auth/jwt"

enum Status {
	OWNER,
	VISITOR,
}
const getAuthUser = async (id: string): Promise<Status> => {
	const cookie = cookies().get("link-guard")

	if (!cookie) {
		return Status.VISITOR
	}

	try {
		const decoded = await decode({
			token: cookie?.value,
			secret: process.env.NEXTAUTH_SECRET || "",
		})

		return Status.OWNER
		// 	const data = await executeQuery(
		// 		"select * from member where google_id= ? AND email = ?",
		// 		[id, decoded?.email]
		// 	)

		// 	if (!data.length) return notFound()

		// 	return { data: "test" }
	} catch (error) {
		redirect("/auth/signin")
	}
}

const User = async ({ params }: { params: { user: string } }) => {
	const value = await getAuthUser(params.user)

	return (
		<div>
			{params.user} || {value}
		</div>
	)
}
export default User
