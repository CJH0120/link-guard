import { Link, Member } from "@/interface/api"
import classNames from "classnames/bind"
import style from "./page.module.scss"
import { notFound } from "next/navigation"
import Button from "@/components/button"
import { IconMenu } from "@/components/icons/ic-menu"
import UrlBox from "@/components/urlBox"
import Modal from "@/components/modal"
import { cookies } from "next/headers"
import MemberEdit from "./memberEdit"
import { useMemo } from "react"

export const dynamic = "force-dynamic"
export const revalidate = 0
type MemberProps = { member: Member.info; data: Link.info[] }
const isMember = async (google_id: string): Promise<MemberProps> => {
	try {
		const response = await fetch(
			`${process.env.BASE_URL}/api/auth/member/${google_id}`
		)
		if (!response.ok) {
			throw new Error("Network response was not ok")
		}
		const result: MemberProps = await response.json()
		return result
	} catch (error) {
		console.error("Error fetching member status:", error)
		return notFound()
	}
}

const cx = classNames.bind(style)
const UserPage = async ({ params }: { params: { user: string } }) => {
	const userId = params.user
	const { member, data } = await isMember(userId)
	if (!member.nickname) {
		return <MemberEdit id={userId} />
	}

	return (
		<div className={cx("user_page")}>
			<div className={cx("page-container")}>
				<div className={cx("header_wrap")}>
					<div />
					<h1 className={cx("member")}>
						Link Guard
						{/* {member?.google_id} */}
					</h1>
					<Button className={cx("button-wrap")}>
						<IconMenu className={cx("icon")} />
					</Button>
				</div>

				<div className={cx("content-container")}>
					{data?.map((v) => (
						<UrlBox {...v} key={v.id} />
					))}
				</div>
			</div>
		</div>
	)
}

export default UserPage
