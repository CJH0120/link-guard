"use client"
import { useEffect } from "react"
import styles from "./page.module.scss"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
	useEffect(() => {}, [])
	return (
		<main className={styles.main}>
			<div>Test</div>
		</main>
	)
}
