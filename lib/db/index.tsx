// lib/db.ts
import { createPool, Pool, RowDataPacket } from "mysql2/promise"

// MySQL 연결 풀 생성
const pool: Pool = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: 3306,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

// 쿼리 실행 함수
export const executeQuery = async <T,>(
	query: string,
	params: any[] = []
): Promise<T[]> => {
	const connection = await pool.getConnection()
	try {
		const [rows] = await connection.query<RowDataPacket[]>(query, params)
		return rows as unknown as T[]
	} catch (error) {
		console.error("쿼리 실행 오류:", error)
		throw error
	} finally {
		connection.release()
	}
}
