"use client"

import { useEffect } from "react"

const ErrorPage = () => {
	useEffect(() => {
		console.error("ErrorPage")
	}, [])
	return null
}
export default ErrorPage
