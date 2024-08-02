"use client"

import Modal from "@/components/modal"
import classNames from "classnames/bind"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import style from "./memberEdit.module.scss"
import Button from "@/components/button"
const cx = classNames.bind(style)
const MemberEdit = ({ id }: { id: string }) => {
	const router = useRouter()
	const [nickname, setNickname] = useState<string>("")
	useEffect(() => {
		const handleFetch = async () => {
			try {
				const response: { id: string } = await fetch("/api/auth/verify").then(
					(res) => res.json()
				)
				if (response.id === id) {
				} else {
					router.push("/notFound")
				}
			} catch (error) {
				console.error("Fetch error:", error)
			}
		}
		handleFetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Modal className={cx("modal-content")}>
			<div className={cx("modal-section")}>
				<div className={cx("section-wrap")}>
					<h2 className={cx("h2")}>사용하실 활동명 입력해주세요</h2>
					<p>상시 변경 가능합니다 (최대10글자)</p>
				</div>
				<input
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					maxLength={10}
					className={cx("input")}
					type="text"
					placeholder="닉네임"
				/>
			</div>
			<Button className={cx("button")}>확인</Button>
		</Modal>
	)
}

export default MemberEdit
