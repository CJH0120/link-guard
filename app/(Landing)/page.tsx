"use client"
import { useEffect } from "react"
import styles from "./page.module.scss"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
	const { data: session, status } = useSession()
	console.log(session)
	const handleSignIn = () => {
		signIn("google")
	}

	const handleSignOut = () => {
		signOut()
	}
	useEffect(() => {
		if (session?.user) {
			return
		}
	}, [session?.user])
	return (
		<main className={styles.main}>
			<div>
				Test
				{status !== "loading" &&
					(!session?.user ? (
						<p onClick={handleSignIn}>로그인</p>
					) : (
						<p onClick={handleSignOut}>로그아웃</p>
					))}
			</div>
		</main>
	)
}
