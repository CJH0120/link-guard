"use client"

import { useEffect } from "react"

const ErrorPage = () => {
	useEffect(() => {
		alert("error")
	}, [])
	return null
}
export default ErrorPage
