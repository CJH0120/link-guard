"use client"
import classNames from "classnames/bind"
import style from "./joinPopup.module.scss"
import { useEffect, useState } from "react"
import Link from "next/link"
import Button from "../button"
import IconClose from "../icons/ic-close"
const cx = classNames.bind(style)
const JoinPopup = () => {
	const [isMember, setIsMember] = useState(true)
	useEffect(() => {
		const handleFetch = async () => {
			try {
				const response = await fetch("/api/auth/verify").then((res) =>
					res.json()
				)
				setIsMember(response.status === 200)
			} catch (error) {
				setIsMember(false)
				console.error("Fetch error:", error)
			}
		}
		handleFetch()
	}, [])
	return isMember ? null : (
		<div className={cx("join-popup")}>
			<div className={cx("button-wrap")}>
				<Button
					className={cx("close-button")}
					onClick={() => setIsMember(true)}
				>
					<IconClose className={cx("icon")} />
				</Button>
			</div>

			<Link className={cx("join")} href="/api/auth/login">
				<div className={cx("join-content")}>로그인/회원가입</div>
			</Link>
		</div>
	)
}
export default JoinPopup
