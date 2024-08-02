"use client"

import { createPortal } from "react-dom"
import style from "./modal.module.scss"
import classNames from "classnames/bind"
import { useEffect, useState } from "react"
const Modal = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	const cx = classNames.bind(style)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	useEffect(() => {
		if (document.body) {
			setIsLoading(true)
		}
	}, [])

	if (!isLoading) return null
	return createPortal(
		<div className={cx("modal-wrap")}>
			<div className={cx("modal", className)}>{children}</div>
		</div>,
		document.body
	)
}

export default Modal
