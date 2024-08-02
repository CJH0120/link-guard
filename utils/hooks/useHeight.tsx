"use client"

import { useEffect } from "react"

const useHeight = () => {
	useEffect(() => {
		const setFullHeight = () => {
			const height = window.innerHeight
			const mainLayout = document.querySelector(
				".main_layout"
			) as HTMLDivElement
			if (mainLayout) {
				mainLayout.style.minHeight = `${height}px`
			}
			// Ensure body also respects this height
			document.body.style.minHeight = `${height}px`
		}
		setFullHeight()
		window.addEventListener("resize", setFullHeight)
		// Initial call to set height
		return () => {
			window.removeEventListener("resize", setFullHeight)
		}
	}, [])

	return null
}

export default useHeight
