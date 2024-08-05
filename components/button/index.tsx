"use client"

import classNames from "classnames/bind"
import { ButtonHTMLAttributes } from "react"
import style from "./button.module.scss"

const cx = classNames.bind(style)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
	return (
		<button className={cx("button-rest", className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
