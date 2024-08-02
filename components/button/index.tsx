"use client"

import classNames from "classnames/bind"
import { ButtonHTMLAttributes } from "react"
import style from "./button.module.scss"
const cx = classNames.bind(style)
const Button = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={cx("button-rest", rest.className)}
			onClick={rest.onClick}
		>
			{rest.children}
		</button>
	)
}
export default Button
