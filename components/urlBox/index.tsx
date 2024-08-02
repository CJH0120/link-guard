"use client"
/* eslint-disable @next/next/no-img-element */
import classNames from "classnames/bind"
import styles from "./urlBox.module.scss"
import { Link as LinkProps } from "@/interface/api"
import Link from "next/link"
import Image from "next/image"
import Button from "../button"
import IconSetting from "../icons/ic-setting"

const cx = classNames.bind(styles)
const UrlBox = ({ ...props }: LinkProps.info) => {
	return (
		<Link className={cx("url-box-wrap")} href={props.link} target="_blank">
			<div className={cx("url-box")}>
				<div className={cx("url-title-wrap")}>
					<h2 className={cx("url-title")}>{props.link_name}</h2>
				</div>
				<Button
					className={cx("url-button")}
					onClick={(e) => {
						e.preventDefault()
					}}
				>
					<IconSetting style={{ fontSize: "1rem" }} />
				</Button>
			</div>
		</Link>
	)
}
export default UrlBox
